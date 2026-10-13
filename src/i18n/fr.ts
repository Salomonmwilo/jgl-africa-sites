/**
 * Textes d'interface en français (boutons, messages, libellés).
 * Une future version anglaise pourra s'appuyer sur un fichier en.ts de même structure.
 * Les contenus institutionnels, eux, se trouvent dans src/data/ et src/content/.
 */
export const t = {
  lienEvitement: 'Aller au contenu principal',
  menu: 'Menu',
  fermerMenu: 'Fermer le menu',
  navigationPrincipale: 'Navigation principale',
  filAriane: "Fil d'Ariane",
  accueil: 'Accueil',
  enSavoirPlus: 'En savoir plus',
  lireArticle: "Lire l'article",
  toutesActualites: 'Toutes les actualités',
  exempleDemo: 'Exemple de démonstration — à remplacer avant publication',
  illustration: 'Illustration',
  formulaire: {
    champObligatoire: 'obligatoire',
    legendeObligatoire: 'Les champs marqués d’un astérisque (*) sont obligatoires.',
    envoyer: 'Envoyer le message',
    envoiEnCours: 'Envoi en cours…',
    succes:
      'Merci, votre message a bien été transmis. Nous vous répondrons dans les meilleurs délais.',
    echec:
      "Le message n'a pas pu être envoyé. Vérifiez votre connexion et réessayez. Si le problème persiste, utilisez les autres moyens de contact indiqués sur cette page.",
    resumeErreurs: (n: number) =>
      n === 1
        ? 'Le formulaire contient 1 erreur. Corrigez-la avant de l’envoyer :'
        : `Le formulaire contient ${n} erreurs. Corrigez-les avant de l’envoyer :`,
    erreurs: {
      nom: 'Indiquez votre nom.',
      emailVide: 'Indiquez votre adresse e-mail.',
      emailInvalide: 'Indiquez une adresse e-mail valide, par exemple nom@exemple.org.',
      objet: "Indiquez l'objet de votre message.",
      message: 'Rédigez votre message.',
      messageCourt: 'Votre message doit contenir au moins 10 caractères.',
      consentement: 'Vous devez accepter le traitement de vos données pour envoyer ce message.',
    },
  },
} as const;
