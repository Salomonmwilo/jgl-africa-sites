// @ts-check
import { defineConfig } from 'astro/config';

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
 */
const site = process.env.SITE_URL || process.env.URL || undefined;

export default defineConfig({
  site,
  // Les pages sont générées sous forme de dossiers : /contact/ → contact/index.html
  build: { format: 'directory' },
  // Pas de préchargement agressif : priorité aux connexions mobiles lentes.
  prefetch: false,
  // Pas de télémétrie, pas de scripts tiers.
  devToolbar: { enabled: false },
});
