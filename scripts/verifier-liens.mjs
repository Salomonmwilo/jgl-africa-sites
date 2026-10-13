#!/usr/bin/env node
/**
 * Vérification des liens internes et des images, sans dépendance externe.
 *
 *   npm run verifier:liens     → analyse le site généré (dossier dist/, après npm run build)
 *   npm run verifier:sources   → analyse les fichiers sources (avant le build)
 *
 * Le script signale les liens internes qui ne correspondent à aucune page,
 * les images absentes et les images sans attribut alt.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = fileURLToPath(new URL('..', import.meta.url));
const modeSources = process.argv.includes('--sources');

function fichiers(dossier, extensions) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) return fichiers(chemin, extensions);
    return extensions.some((x) => e.name.endsWith(x)) ? [chemin] : [];
  });
}

const problemes = [];
const signaler = (fichier, message) => problemes.push(`${relative(racine, fichier)} : ${message}`);

if (modeSources) {
  // 1. Routes connues : pages statiques + entrées des collections.
  const dossierPages = join(racine, 'src/pages');
  const routes = new Set(['/']);
  for (const f of fichiers(dossierPages, ['.astro', '.ts'])) {
    const rel = relative(dossierPages, f).replace(/\\/g, '/');
    if (rel.includes('[')) continue;
    if (rel.endsWith('.xml.ts') || rel.endsWith('.txt.ts')) {
      routes.add('/' + rel.replace(/\.ts$/, ''));
      continue;
    }
    const sansExt = rel.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
    routes.add(sansExt ? `/${sansExt}/` : '/');
  }
  const programmes = fichiers(join(racine, 'src/content/programmes'), ['.md'])
    .map((f) => f.split(/[\\/]/).pop())
    .filter((n) => !n.startsWith('_'))
    .map((n) => n.replace(/\.md$/, ''));
  programmes.forEach((p) => routes.add(`/programmes/${p}/`));
  fichiers(join(racine, 'src/content/actualites'), ['.md'])
    .map((f) => f.split(/[\\/]/).pop())
    .filter((n) => !n.startsWith('_'))
    .forEach((n) => routes.add(`/actualites/${n.replace(/\.md$/, '')}/`));

  // 2. Liens littéraux dans les sources.
  const sources = [
    ...fichiers(join(racine, 'src'), ['.astro', '.ts', '.md', '.json']),
  ];
  let nbLiens = 0;
  let nbImages = 0;
  for (const f of sources) {
    // Les lignes de commentaire (exemples de documentation) sont ignorées.
    const texte = readFileSync(f, 'utf8')
      .split('\n')
      .filter((l) => !/^\s*(\*|\/\/|#)/.test(l))
      .join('\n');
    for (const m of texte.matchAll(/(?:href|lienHref|href:)\s*[=:]\s*['"](\/[^'"#?]*)['"]/g)) {
      nbLiens++;
      const lien = m[1];
      if (lien.includes('.') && !routes.has(lien)) {
        if (!existsSync(join(racine, 'public', lien))) signaler(f, `fichier public introuvable : ${lien}`);
        continue;
      }
      if (!routes.has(lien)) signaler(f, `lien interne sans page correspondante : ${lien}`);
      if (!lien.endsWith('/') && !lien.includes('.')) signaler(f, `lien sans barre oblique finale : ${lien}`);
    }
    for (const m of texte.matchAll(/['"(](\/(?:images\/[^'")\s]+|favicon[^'")\s]*|apple-touch-icon\.png))['")]/g)) {
      nbImages++;
      if (!existsSync(join(racine, 'public', m[1]))) signaler(f, `fichier public introuvable : ${m[1]}`);
    }
  }
  console.log(`Routes connues : ${routes.size}`);
  console.log([...routes].sort().map((r) => `  ${r}`).join('\n'));
  console.log(`\nLiens internes analysés : ${nbLiens} ; ressources publiques analysées : ${nbImages}`);
} else {
  const dist = join(racine, 'dist');
  if (!existsSync(dist)) {
    console.error('Le dossier dist/ est absent : lancez d’abord « npm run build ».');
    process.exit(2);
  }
  const pages = fichiers(dist, ['.html']);
  let nbLiens = 0;
  const cible = (chemin) => {
    const p = join(dist, decodeURI(chemin));
    if (existsSync(p) && statSync(p).isFile()) return true;
    return existsSync(join(p, 'index.html'));
  };
  for (const f of pages) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/\s(?:href|src)="(\/[^"#?]*)/g)) {
      nbLiens++;
      if (!cible(m[1])) signaler(f, `cible introuvable : ${m[1]}`);
    }
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\salt=/.test(m[0])) signaler(f, `image sans attribut alt : ${m[0].slice(0, 80)}`);
    }
    if (!/<html[^>]+lang="fr"/.test(html)) signaler(f, 'attribut lang="fr" absent');
    if ((html.match(/<h1\b/g) ?? []).length !== 1) signaler(f, 'la page doit contenir exactement un titre h1');
    if (!/<title>[^<]+<\/title>/.test(html)) signaler(f, 'balise <title> absente');
    if (!/<meta name="description" content="[^"]+"/.test(html)) signaler(f, 'méta-description absente');
  }
  console.log(`Pages analysées : ${pages.length} ; liens et ressources : ${nbLiens}`);
}

if (problemes.length) {
  console.log(`\n${problemes.length} problème(s) :`);
  problemes.forEach((p) => console.log(`  - ${p}`));
  process.exit(1);
}
console.log('\nAucun problème détecté.');
