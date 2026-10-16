/**
 * CONFIGURATION INSTITUTIONNELLE CENTRALE — Justicia Great Lakes Africa
 * ---------------------------------------------------------------------
 * Ce fichier regroupe toutes les informations institutionnelles du site.
 *
 * RÈGLE FONDAMENTALE : une information non confirmée par JGL Africa reste à `null`.
 * Les composants n'affichent jamais un champ `null` : il n'apparaît tout simplement
 * pas sur le site public. Aucune valeur fictive ne doit être saisie ici.
 *
 * Pour compléter un champ, remplacez `null` par la valeur confirmée, entre guillemets.
 * Exemple : email: 'contact@domaine-officiel.org',
 */

export type ReseauSocial = {
  nom: string;
  url: string | null;
};

export const siteConfig = {
  /** Nom de travail du site (validé dans le cahier des charges). */
  nom: 'Justicia Great Lakes Africa',
  nomCourt: 'JGL Africa',

  /** Langue principale du site. */
  langue: 'fr',
  locale: 'fr_CD',

  /**
   * Domaine officiel définitif, sans barre oblique finale.
   * Tant qu'il vaut `null`, aucune balise canonique n'est générée.
   * Exemple : 'https://www.domaine-officiel.org'
   */
  urlOfficielle: null as string | null,

  /**
   * Logo officiel : chemin d'un fichier placé dans public/images/ (SVG ou PNG).
   * Tant qu'il vaut `null`, l'en-tête affiche le nom de l'organisation en texte.
   * Logo actuel : public/images/logo-jgl-africa.png (fond transparent).
   */
  logo: '/images/logo-jgl-africa.png' as string | null,

  /** Statut et identité juridique — à fournir par l'organisation. */
  juridique: {
    /** Mention « asbl » figurant sur le kakémono officiel de l'organisation. */
    formeJuridique: 'Association sans but lucratif (asbl)' as string | null,
    numeroEnregistrement: null as string | null,
    dateCreation: null as string | null,
    siegeSocial: null as string | null,
    representantLegal: null as string | null,
    directeurPublication: null as string | null,
  },

  /** Coordonnées publiques — à fournir par l'organisation. */
  coordonnees: {
    adresse: null as string | null,
    ville: null as string | null,
    pays: 'République démocratique du Congo',
    telephone: null as string | null,
    email: null as string | null,
    horaires: null as string | null,
  },

  /** Réseaux sociaux officiels de l'organisation (pas les comptes personnels). */
  reseauxSociaux: [
    // Lien fourni par l'équipe du projet le 13/10/2026 (lien de partage Facebook).
    // À remplacer, si possible, par l'adresse directe de la page (facebook.com/nom-de-la-page).
    { nom: 'Facebook', url: 'https://www.facebook.com/share/19x69TcAWf/' },
    { nom: 'X (Twitter)', url: null },
    { nom: 'LinkedIn', url: null },
    { nom: 'Instagram', url: null },
    { nom: 'YouTube', url: null },
  ] as ReseauSocial[],

  /**
   * Moyens de soutien financier — à fournir et valider par l'organisation.
   * Tant que tout est `null`, la page « Soutenir nos actions » propose uniquement
   * une prise de contact. Ne jamais indiquer de déductibilité fiscale sans avis juridique.
   */
  soutien: {
    virementBancaire: null as string | null,
    paiementMobile: null as string | null,
    lienDonEnLigne: null as string | null,
    mentionFiscale: null as string | null,
  },

  /** Protection des données personnelles — à fournir par l'organisation. */
  donneesPersonnelles: {
    /** Contact du délégué à la protection des données ou du responsable désigné. */
    contactProtectionDonnees: null as string | null,
    /** Durée de conservation des messages reçus, par exemple '12 mois'. */
    dureeConservation: null as string | null,
    /** Date de dernière mise à jour de la politique, au format AAAA-MM-JJ. */
    derniereMiseAJour: null as string | null,
  },

  /** Responsable de la protection de l'enfance (Children in Need). */
  protectionEnfance: {
    referent: null as string | null,
    politiqueAdoptee: false,
  },

  /** Hébergeur du site (information requise dans les mentions légales). */
  hebergeur: {
    nom: 'Netlify, Inc.',
    pays: 'États-Unis',
    /** Adresse postale : à recopier depuis les conditions d'utilisation de Netlify au moment du déploiement. */
    adresse: null as string | null,
    site: 'https://www.netlify.com',
  },

  /**
   * Formulaire de contact.
   * 'netlify' : Netlify Forms (détection à activer dans le tableau de bord).
   * Le formulaire ne fonctionne qu'une fois le site déployé sur Netlify.
   */
  formulaireContact: {
    fournisseur: 'netlify' as 'netlify',
    nomFormulaire: 'contact',
  },
} as const;

/** Vrai si une valeur est réellement renseignée. */
export function estRenseigne(valeur: string | null | undefined): valeur is string {
  return typeof valeur === 'string' && valeur.trim().length > 0;
}

/** Réseaux sociaux effectivement renseignés. */
export const reseauxActifs = siteConfig.reseauxSociaux.filter((r) => estRenseigne(r.url));

/** Vrai si au moins un moyen de soutien financier est confirmé. */
export const soutienFinancierConfirme = [
  siteConfig.soutien.virementBancaire,
  siteConfig.soutien.paiementMobile,
  siteConfig.soutien.lienDonEnLigne,
].some(estRenseigne);

/**
 * Notes éditoriales internes (« à valider ») :
 * visibles en développement local ou si PUBLIC_NOTES_EDITORIALES=true,
 * jamais sur le site public par défaut.
 */
export const afficherNotesEditoriales =
  import.meta.env.DEV || import.meta.env.PUBLIC_NOTES_EDITORIALES === 'true';
