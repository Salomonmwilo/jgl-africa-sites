/**
 * Fichier robots.txt généré au build.
 * Il référence le sitemap lorsque l'adresse du site est connue.
 */
import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site-config';

export const GET: APIRoute = ({ site }) => {
  const base = siteConfig.urlOfficielle ?? site?.href ?? null;
  const lignes = ['User-agent: *', 'Allow: /', 'Disallow: /contact/merci/', 'Disallow: /newsletter/merci/'];
  if (base) lignes.push('', `Sitemap: ${new URL('/sitemap.xml', base).href}`);
  return new Response(lignes.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
