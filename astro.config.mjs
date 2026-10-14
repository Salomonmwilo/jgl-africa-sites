// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Configuration Astro — site 100 % statique (aucun adaptateur nécessaire).
 *
 * URL du site :
 *  - SITE_URL : à définir (variable d'environnement Netlify) lorsque le domaine
 *    officiel sera confirmé, par exemple https://www.exemple.org
 *  - URL : variable fournie automatiquement par Netlify au moment du build
 *    (adresse principale du site, par exemple https://nom-du-site.netlify.app)
 *
 * Cette URL sert uniquement à produire des adresses absolues (sitemap, Open Graph).
 * Les balises canoniques, elles, ne sont générées que si `urlOfficielle` est
 * renseignée dans src/data/site-config.ts (voir le README).
 *
 * Sous-dossier (GitHub Pages) :
 *  - BASE_PATH : chemin de publication, par exemple /jgl-africa-sites
 *    (défini par le workflow .github/workflows/deploy.yml). Laisser vide sur Netlify.
 */
const site = process.env.SITE_URL || process.env.URL || undefined;
const base = (process.env.BASE_PATH || '').replace(/\/+$/, '');

/**
 * Les liens internes du site sont écrits sous la forme « /contact/ ».
 * Lorsque le site est publié dans un sous-dossier, cette intégration ajoute
 * le préfixe BASE_PATH aux adresses internes des fichiers générés
 * (HTML, sitemap, robots.txt), après le build.
 */
function prefixerSousDossier() {
  return {
    name: 'prefixer-sous-dossier',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (!base) return;
        const racine = fileURLToPath(dir);
        const origine = site ? new URL(site).origin : null;
        const echapper = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const dejaPrefixe = `${echapper(base.slice(1))}(?:/|$|[?#"'\\s,])`;
        // Attributs contenant un chemin interne : href="/…", src="/…", action="/…".
        const attribut = new RegExp(`(\\s(?:href|src|action|poster)=["'])/(?!/)(?!${dejaPrefixe})`, 'g');
        // Listes srcset : chaque entrée commence par « /chemin ».
        const srcset = /(\ssrcset=["'])([^"']*)(["'])/g;
        const entreeSrcset = new RegExp(`(^|,\\s*)/(?!/)(?!${dejaPrefixe})`, 'g');
        // Adresses absolues vers l'origine du site (Open Graph, sitemap, robots.txt).
        const absolue = origine ? new RegExp(`${echapper(origine)}/(?!${dejaPrefixe})`, 'g') : null;

        const parcourir = async (dossier) => {
          for (const entree of await readdir(dossier, { withFileTypes: true })) {
            const chemin = join(dossier, entree.name);
            if (entree.isDirectory()) {
              await parcourir(chemin);
              continue;
            }
            if (!/\.(html|xml|txt)$/.test(entree.name)) continue;
            let contenu = await readFile(chemin, 'utf8');
            const avant = contenu;
            if (entree.name.endsWith('.html')) {
              contenu = contenu
                .replace(attribut, `$1${base}/`)
                .replace(srcset, (_, debut, liste, fin) => debut + liste.replace(entreeSrcset, `$1${base}/`) + fin);
            }
            if (absolue) contenu = contenu.replace(absolue, `${origine}${base}/`);
            if (contenu !== avant) await writeFile(chemin, contenu);
          }
        };
        await parcourir(racine);
      },
    },
  };
}

export default defineConfig({
  site,
  base: base || undefined,
  // Les pages sont générées sous forme de dossiers : /contact/ → contact/index.html
  build: { format: 'directory' },
  // Pas de préchargement agressif : priorité aux connexions mobiles lentes.
  prefetch: false,
  // Pas de télémétrie, pas de scripts tiers.
  devToolbar: { enabled: false },
  integrations: [prefixerSousDossier()],
});
