/**
 * Catégories des actualités et publications.
 * La clé (à gauche) est utilisée dans les fichiers Markdown (champ `categorie`)
 * et dans l'adresse des pages de catégorie : /actualites/categorie/<cle>/
 */
export const categories = {
  institutionnel: 'Actualités institutionnelles',
  'droits-humains': 'Droits humains',
  paix: 'Paix et cohésion sociale',
  jeunesse: 'Jeunesse et citoyenneté',
  gouvernance: 'Leadership et bonne gouvernance',
  observatoire: "Publications de l'Observatoire",
} as const;

export type CleCategorie = keyof typeof categories;

export const clesCategories = Object.keys(categories) as [CleCategorie, ...CleCategorie[]];
