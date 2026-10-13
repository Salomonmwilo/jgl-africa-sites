/**
 * REGISTRE DES PHOTOGRAPHIES — activités de JGL Africa
 * ----------------------------------------------------
 * Photos fournies par l'équipe du projet le 13 octobre 2026 (filigrane « Justicia Great Lakes »).
 * Fichiers optimisés dans public/images/photos/<id>-480|960|1600.webp
 * (script : scripts/optimiser-photos.py — les métadonnées GPS et appareil sont supprimées).
 *
 * Règles :
 *  - le texte alternatif (`alt`) décrit ce que montre l'image, sans nommer les personnes ;
 *  - la légende (`legende`) ne contient que des faits visibles sur la photo
 *    (lieu identifiable, kakémono, logo). Aucune date n'est indiquée : elle n'est pas confirmée ;
 *  - toutes ces photos montrent des personnes identifiables : l'organisation doit s'assurer
 *    de leur accord avant la mise en ligne (voir README) ;
 *  - aucune photo d'enfant n'est utilisée.
 *
 * Pour ajouter une photo : lancer le script d'optimisation, puis ajouter une entrée ci-dessous.
 */

export type Photo = {
  /** Dimensions de l'original (servent à calculer le ratio). */
  largeur: number;
  hauteur: number;
  alt: string;
  legende: string;
  /** Point d'intérêt pour les recadrages (CSS object-position). */
  position?: string;
};

export const creditPhotos = 'Photos : JGL Africa';

/** Largeurs générées par scripts/optimiser-photos.py */
export const largeursPhotos = [480, 960, 1600] as const;

export const photos = {
  'salle-de-formation': {
    largeur: 4928,
    hauteur: 3264,
    alt: "Un intervenant s'adresse aux participants assis de part et d'autre d'une salle, devant les kakémonos de JGL Africa et un écran de projection.",
    legende: "Session de l'Académie des droits humains au CLAC de Bukavu.",
    position: '50% 55%',
  },
  'prise-de-parole': {
    largeur: 2576,
    hauteur: 1706,
    alt: 'Un jeune homme en costume prend la parole au micro devant une table et les kakémonos de JGL Africa.',
    legende: "Prise de parole lors d'une activité de JGL Africa au CLAC de Bukavu.",
    position: '28% 50%',
  },
  'travaux-en-groupe': {
    largeur: 4928,
    hauteur: 3264,
    alt: "Des participants travaillent en groupe autour d'une table, devant un kakémono du programme Académie des droits humains.",
    legende: "Travaux en groupe lors d'une session de l'Académie des droits humains.",
    position: '55% 50%',
  },
  'restitution-travaux': {
    largeur: 4928,
    hauteur: 3264,
    alt: "Une participante présente au micro les conclusions d'un groupe de travail, inscrites sur une feuille de tableau de conférence.",
    legende: "Restitution d'un travail de groupe lors d'une formation de JGL Africa au CLAC de Bukavu.",
    position: '50% 45%',
  },
  'intervention-formation': {
    largeur: 4928,
    hauteur: 3264,
    alt: 'Une intervenante parle au micro face à des participants assis autour de tables.',
    legende: "Intervention lors d'une formation de JGL Africa au CLAC de Bukavu.",
    position: '50% 50%',
  },
  'photo-de-groupe': {
    largeur: 4928,
    hauteur: 3264,
    alt: 'Une trentaine de jeunes participants portant des badges posent pour une photo de groupe dans une salle.',
    legende: "Photo de groupe des participants à une formation de JGL Africa au CLAC de Bukavu.",
    position: '50% 60%',
  },
  'equipe-accueil': {
    largeur: 2576,
    hauteur: 1706,
    alt: 'Trois personnes portant un badge « JGL Africa – Youth for Human Rights and Peace » posent dans un couloir.',
    legende: "Lors d'une activité de JGL Africa au CLAC de Bukavu.",
    position: '50% 40%',
  },
  'proces-fictif-audience': {
    largeur: 2048,
    hauteur: 1365,
    alt: "Sur une scène, un participant en robe d'avocat plaide devant une table où siègent cinq autres participants en robe ; un drapeau de la RDC est en arrière-plan.",
    legende: 'Audience simulée lors d’un procès fictif organisé par JGL Africa.',
    position: '58% 50%',
  },
  'proces-fictif-plaidoirie': {
    largeur: 2048,
    hauteur: 1365,
    alt: "Un étudiant en robe d'avocat plaide au micro face à trois autres participants en robe assis à une table.",
    legende: 'Plaidoirie lors d’un procès fictif organisé par JGL Africa.',
    position: '40% 40%',
  },
  'proces-fictif-ouverture': {
    largeur: 2048,
    hauteur: 1365,
    alt: 'Sur scène, un jeune homme en costume parle au micro à côté de participants en robe tenant leurs dossiers.',
    legende: 'Ouverture d’un procès fictif organisé par JGL Africa.',
    position: '55% 50%',
  },
  'proces-fictif-groupe': {
    largeur: 2048,
    hauteur: 1365,
    alt: "Photo de groupe sur scène : participants en robe d'avocat et invités, devant un écran affichant le logo de Justicia Great Lakes.",
    legende: 'Photo de groupe à l’issue d’un procès fictif organisé par JGL Africa.',
    position: '50% 60%',
  },
  'participants-en-robe-groupe': {
    largeur: 2048,
    hauteur: 1365,
    alt: "Dix jeunes en robe d'avocat, dossiers en main, posent devant un bâtiment couvert d'affiches.",
    legende: 'Participants au procès fictif organisé par JGL Africa.',
    position: '50% 45%',
  },
  'participants-en-robe': {
    largeur: 2048,
    hauteur: 1365,
    alt: "Sept jeunes en robe d'avocat posent devant l'entrée d'un bâtiment.",
    legende: 'Participants au procès fictif organisé par JGL Africa.',
    position: '50% 40%',
  },
  'jeunes-participants': {
    largeur: 2048,
    hauteur: 1365,
    alt: 'Un groupe de jeunes en tenue de ville pose devant un bâtiment ; une participante porte un badge JGL Africa.',
    legende: "Jeunes participants à une activité de JGL Africa.",
    position: '50% 40%',
  },
  participantes: {
    largeur: 2048,
    hauteur: 1463,
    alt: "Trois jeunes femmes posent devant un bâtiment, d'autres participants à l'arrière-plan.",
    legende: "Participantes à une activité de JGL Africa.",
    position: '50% 35%',
  },
} satisfies Record<string, Photo>;

export type IdPhoto = keyof typeof photos;

/** Ordre d'affichage de la page « En images ». */
export const ordreGalerie: IdPhoto[] = [
  'salle-de-formation',
  'travaux-en-groupe',
  'restitution-travaux',
  'intervention-formation',
  'prise-de-parole',
  'photo-de-groupe',
  'proces-fictif-audience',
  'proces-fictif-plaidoirie',
  'proces-fictif-ouverture',
  'proces-fictif-groupe',
  'participants-en-robe-groupe',
  'participants-en-robe',
  'jeunes-participants',
  'participantes',
  'equipe-accueil',
];
