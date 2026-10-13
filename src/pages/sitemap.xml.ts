/**
 * Plan du site XML (sitemap), généré au moment du build, sans dépendance externe.
 * Les adresses absolues utilisent le domaine officiel s'il est renseigné
 * (site-config.ts → urlOfficielle), sinon l'adresse fournie par Netlify (variable URL).
 * Les pages de démonstration, la page 404 et la page de remerciement sont exclues.
 */
import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site-config';
import { articlesPublies, programmesTries } from '../lib/contenus';
import { categories, type CleCategorie } from '../data/categories';

const pagesFixes = [
  '/',
  '/a-propos/',
  '/programmes/',
  '/actualites/',
  '/en-images/',
  '/contact/',
  '/soutenir/',
  '/confidentialite/',
  '/mentions-legales/',
];

export const GET: APIRoute = async ({ site }) => {
  const base = siteConfig.urlOfficielle ?? site?.href ?? null;
  const programmes = await programmesTries();
  const articles = (await articlesPublies()).filter((a) => !a.data.demo);
  const categoriesActives = (Object.keys(categories) as CleCategorie[]).filter((c) =>
    articles.some((a) => a.data.categorie === c),
  );

  const chemins = [
    ...pagesFixes,
    ...programmes.map((p) => `/programmes/${p.id}/`),
    ...articles.map((a) => `/actualites/${a.id}/`),
    ...categoriesActives.map((c) => `/actualites/categorie/${c}/`),
  ];

  const lastmod = new Map(
    articles.filter((a) => a.data.date).map((a) => [`/actualites/${a.id}/`, a.data.date!.toISOString().slice(0, 10)]),
  );

  const urls = base
    ? chemins
        .map((chemin) => {
          const loc = new URL(chemin, base).href;
          const mod = lastmod.get(chemin);
          return `  <url><loc>${loc}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}</url>`;
        })
        .join('\n')
    : '  <!-- Adresse du site inconnue au moment du build : définissez urlOfficielle ou la variable SITE_URL. -->';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
