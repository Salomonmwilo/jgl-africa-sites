/**
 * Navigation du site.
 * Pour ajouter un lien au menu principal, ajoutez une entrée à `navigationPrincipale`.
 * Les adresses se terminent toujours par une barre oblique (« / »).
 */

export type LienNavigation = { libelle: string; href: string };

export const navigationPrincipale: LienNavigation[] = [
  { libelle: 'Accueil', href: '/' },
  { libelle: 'À propos', href: '/a-propos/' },
  { libelle: 'Nos programmes', href: '/programmes/' },
  { libelle: 'Actualités', href: '/actualites/' },
  { libelle: 'Contact', href: '/contact/' },
];

/** Bouton mis en avant dans l'en-tête. */
export const appelEnTete: LienNavigation = { libelle: 'Soutenir nos actions', href: '/soutenir/' };

export const navigationLegale: LienNavigation[] = [
  { libelle: 'Politique de confidentialité', href: '/confidentialite/' },
  { libelle: 'Mentions légales', href: '/mentions-legales/' },
];
