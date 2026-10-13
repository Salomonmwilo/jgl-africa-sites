#!/usr/bin/env node
/**
 * Vérifie les rapports de contraste des combinaisons de couleurs utilisées sur le site
 * (WCAG 2.2 : 4,5:1 pour le texte courant, 3:1 pour les grands textes et les éléments
 * d'interface comme les contours de focus).
 *
 * Les couleurs sont lues dans src/styles/global.css (variables :root).
 * Usage : npm run verifier:contrastes
 */
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const vars = Object.fromEntries(
  [...css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]),
);

const c = (v) => vars[v] ?? v;

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function rapport(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// [description, texte, fond, seuil]
const combinaisons = [
  ['Texte principal sur blanc', 'encre', 'blanc', 4.5],
  ['Texte principal sur fond brume', 'encre', 'brume', 4.5],
  ['Texte secondaire sur blanc', 'encre-douce', 'blanc', 4.5],
  ['Texte secondaire sur fond brume', 'encre-douce', 'brume', 4.5],
  ['Texte secondaire sur fond vert clair', 'encre-douce', 'lac-clair', 4.5],
  ['Titres (bleu nuit) sur blanc', 'nuit', 'blanc', 4.5],
  ['Titres (bleu nuit) sur fond vert clair', 'nuit', 'lac-clair', 4.5],
  ['Liens sur blanc', 'nuit-700', 'blanc', 4.5],
  ['Liens sur fond brume', 'nuit-700', 'brume', 4.5],
  ['Texte vert-turquoise sur blanc', 'lac', 'blanc', 4.5],
  ['Texte vert-turquoise sur fond brume', 'lac', 'brume', 4.5],
  ['Texte vert-turquoise sur fond vert clair', 'lac', 'lac-clair', 4.5],
  ['Bouton principal : bleu nuit sur maïs', 'nuit', 'mais', 4.5],
  ['Bouton principal survolé : bleu nuit sur maïs foncé', 'nuit', 'mais-fonce', 4.5],
  ['Texte blanc sur bleu nuit', 'blanc', 'nuit', 4.5],
  ['Texte clair (#d5dfe9) sur bleu nuit', '#d5dfe9', 'nuit', 4.5],
  ['Titre de colonne maïs sur bleu nuit', 'mais', 'nuit', 4.5],
  ["Messages d'erreur sur blanc", 'alerte', 'blanc', 4.5],
  ["Messages d'erreur sur fond rosé (#fff7f6)", 'alerte', '#fff7f6', 4.5],
  ['Texte sur encadré avertissement (#fbf3df)', 'encre', '#fbf3df', 4.5],
  ['Bandeau démo (#6b4a06 sur #fbf3df)', '#6b4a06', '#fbf3df', 4.5],
  ['Texte blanc sur vert-turquoise (bandeau d\'appel)', 'blanc', 'lac', 4.5],
  ['Contour de focus (blanc) sur vert-turquoise', 'blanc', 'lac', 3],
  ['Contour de focus (bleu nuit) sur blanc', 'nuit', 'blanc', 3],
  ['Contour de focus (maïs) sur bleu nuit', 'mais', 'nuit', 3],
  ['Bordure des champs (#6b7684) sur blanc', '#6b7684', 'blanc', 3],
  // Textes posés sur photos voilées : couleur de fond calculée dans le pire cas (photo blanche ou noire).
  ['Texte blanc sur grande photo (voile 0,86, pire cas : photo blanche)', 'blanc', '#304861', 4.5],
  ['Texte blanc sur grande photo, bureau (voile 0,79 au bord du texte)', 'blanc', '#41576e', 4.5],
  ['Chapeau (#e3ebf2) sur grande photo (voile 0,79)', '#e3ebf2', '#41576e', 4.5],
  ['Lieu (blanc) sur grande photo (voile 0,86)', 'blanc', '#304861', 4.5],
  ["Tuile d'action turquoise (voile 0,93, photo blanche), texte blanc", 'blanc', '#2b7974', 3],
  ["Tuile d'action bleue (voile 0,94, photo blanche), texte blanc", 'blanc', '#2b5f7f', 3],
  ["Tuile d'action or (voile 0,95, photo noire), texte bleu nuit", 'nuit', '#d99e39', 3],
  ["Bandeau d'appel sur photo (voile 0,80), texte blanc", 'blanc', '#3e556c', 4.5],
  ["Bandeau d'appel sur photo (voile 0,80), texte (#ffffff) des boutons secondaires", 'blanc', '#3e556c', 4.5],
  ['Résumé des tuiles (#e3ebf2) sur turquoise', '#e3ebf2', 'lac', 4.5],
  ['Résumé des tuiles (#e3ebf2) sur bleu nuit', '#e3ebf2', 'nuit', 4.5],
  ['Texte turquoise sur fond vert clair (Observatoire)', 'lac', 'lac-clair', 4.5],
];

let echecs = 0;
console.log('Vérification des contrastes (WCAG 2.2 AA)\n');
for (const [desc, texte, fond, seuil] of combinaisons) {
  const r = rapport(c(texte), c(fond));
  const ok = r >= seuil;
  if (!ok) echecs++;
  console.log(`${ok ? 'OK    ' : 'ÉCHEC '} ${r.toFixed(2).padStart(5)}:1  (min ${seuil}:1)  ${desc}`);
}
console.log(`\n${combinaisons.length - echecs}/${combinaisons.length} combinaisons conformes.`);
process.exit(echecs ? 1 : 0);
