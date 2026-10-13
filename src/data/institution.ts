/**
 * CONTENUS INSTITUTIONNELS — textes de présentation de JGL Africa.
 * ----------------------------------------------------------------
 * Ces textes reprennent les éléments du cahier des charges (domaines
 * d'intervention, positionnement, valeurs) et, pour la mission, la vision et la
 * présentation, le kakémono officiel de l'organisation. Ils ne contiennent volontairement
 * aucun chiffre, aucune date ni aucun résultat : ces éléments devront être
 * fournis et validés par l'organisation.
 *
 * Le champ `valide` indique si l'organisation a officiellement adopté le texte.
 * Un texte dont `valide` vaut `false` n'est affiché qu'en mode relecture
 * (voir `afficherNotesEditoriales` dans site-config.ts), sauf mention contraire.
 */

export const accueil = {
  surtitre: 'Région des Grands Lacs africains',
  /** Formulation tirée de la mission officielle (kakémono). */
  titre: 'Former une nouvelle génération de défenseurs des droits humains et de bâtisseurs de paix',
  introduction:
    "Justicia Great Lakes Africa défend les droits humains et promeut la culture de la paix et la bonne gouvernance en République démocratique du Congo et dans la région des Grands Lacs, en formant une nouvelle génération de jeunes leaders.",
};

/**
 * SOURCE OFFICIELLE : kakémono « JGL AFRICA asbl » visible sur les photos d'activités
 * fournies le 13/10/2026 (rubriques « Notre vision », « Notre mission » et texte de présentation).
 * Textes repris fidèlement ; seul l'accord de « bâtisseurs » a été corrigé.
 * La rubrique « Nos principes » n'est que partiellement lisible : elle n'est pas reprise.
 */
export const mission = {
  titre: 'Notre mission',
  texte:
    'Susciter une nouvelle génération de leaders défenseurs des droits humains (human rights defenders) et bâtisseurs de la paix (peace builders) pour une région paisible et prospère.',
};

export const vision = {
  titre: 'Notre vision',
  texte:
    'Une région des Grands Lacs paisible et sans conflit, dans laquelle les droits humains sont garantis et respectés.',
  /** Texte figurant sur le kakémono officiel de l'organisation. */
  valide: true,
};

export const presentation = [
  "Justicia Great Lakes Africa (JGL Africa) est une organisation non gouvernementale de défense des droits humains et de promotion de la culture de la paix en République démocratique du Congo et dans la région des Grands Lacs africains.",
  "Elle se veut une organisation d'appui à la défense, à la vulgarisation et à la promotion des droits humains, ainsi qu'à l'initiation à la culture de la paix et à la bonne gouvernance.",
  "Basée à Bukavu, elle accorde une place centrale à la formation et à la participation des jeunes, appelés à devenir des acteurs à part entière de la paix et du changement dans leur communauté.",
];

export type Valeur = { titre: string; description: string; icone: IconeNom };
export type IconeNom =
  | 'balance'
  | 'colombe'
  | 'bouclier'
  | 'pilier'
  | 'livre'
  | 'mains'
  | 'megaphone'
  | 'boussole'
  | 'coeur';

export const valeurs: Valeur[] = [
  {
    titre: 'Justice et dignité humaine',
    description: "Le respect de la dignité de chaque personne guide l'ensemble de nos actions.",
    icone: 'balance',
  },
  {
    titre: 'Paix et cohésion sociale',
    description: 'Nous favorisons le dialogue, la compréhension mutuelle et la coexistence pacifique.',
    icone: 'colombe',
  },
  {
    titre: 'Responsabilité et intégrité',
    description: 'Nous agissons avec honnêteté, rigueur et sens des responsabilités.',
    icone: 'bouclier',
  },
  {
    titre: 'Bonne gouvernance et redevabilité',
    description: 'Nous défendons la transparence et l’obligation de rendre compte dans la gestion des affaires publiques.',
    icone: 'pilier',
  },
  {
    titre: 'Éducation et autonomisation des jeunes',
    description: 'Nous croyons au savoir comme levier pour permettre aux jeunes de prendre leur place.',
    icone: 'livre',
  },
  {
    titre: 'Engagement communautaire',
    description: 'Nous travaillons avec et pour les communautés, au plus près de leurs réalités.',
    icone: 'mains',
  },
];

export type Domaine = { titre: string; description: string; icone: IconeNom };

export const domaines: Domaine[] = [
  {
    titre: 'Droits humains',
    description: 'Promotion et défense des droits humains, connaissance des droits et des recours.',
    icone: 'bouclier',
  },
  {
    titre: 'Justice et accès à la justice',
    description: "Information juridique et sensibilisation pour rapprocher la justice des citoyens.",
    icone: 'balance',
  },
  {
    titre: 'Paix et cohésion sociale',
    description: 'Dialogue, prévention des tensions et renforcement du vivre-ensemble.',
    icone: 'colombe',
  },
  {
    titre: 'Bonne gouvernance',
    description: 'Leadership responsable, intégrité et participation citoyenne à la vie publique.',
    icone: 'pilier',
  },
  {
    titre: 'Éducation citoyenne',
    description: 'Sensibilisation des citoyens à leurs droits, à leurs devoirs et à la vie démocratique.',
    icone: 'megaphone',
  },
  {
    titre: 'Jeunesse et engagement',
    description: "Accompagnement des jeunes pour qu'ils participent à la paix et à la transformation de leur communauté.",
    icone: 'boussole',
  },
];

export const approche = [
  {
    titre: 'Sensibiliser',
    description: 'Faire connaître les droits humains, les principes de bonne gouvernance et les mécanismes de justice.',
  },
  {
    titre: 'Former',
    description: 'Renforcer les connaissances et les compétences, en particulier celles des jeunes.',
  },
  {
    titre: 'Accompagner',
    description: "Soutenir l'engagement citoyen et faciliter l'accès à l'information juridique.",
  },
  {
    titre: 'Dialoguer',
    description: "Créer des espaces d'échange favorables à la paix et à la cohésion sociale.",
  },
];
