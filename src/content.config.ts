/**
 * Collections de contenu (programmes et actualités).
 * Chaque fichier Markdown de src/content/<collection>/ devient une entrée.
 * Les fichiers dont le nom commence par « _ » sont ignorés (modèles, notes).
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { clesCategories } from './data/categories';
import { photos, type IdPhoto } from './data/photos';

/** Identifiants des photos déclarées dans src/data/photos.ts */
const idPhoto = z.enum(Object.keys(photos) as [IdPhoto, ...IdPhoto[]]);

const programmes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/programmes' }),
  schema: z.object({
    /** Nom officiel du programme (à ne pas modifier sans validation). */
    titre: z.string(),
    /** Ordre d'affichage dans les listes. */
    ordre: z.number(),
    /** Phrase courte affichée sur les cartes (environ 160 caractères). */
    resume: z.string(),
    /** Description pour les moteurs de recherche. */
    description: z.string(),
    /** Illustration : chemin d'un fichier de public/images/. */
    illustration: z.string(),
    illustrationAlt: z.string(),
    /** Photo principale (identifiant de src/data/photos.ts). Si absente, l'illustration est utilisée. */
    photo: idPhoto.optional(),
    /** Photos supplémentaires affichées dans la page du programme. */
    galerie: z.array(idPhoto).default([]),
    /** Couleur dominante de la page. */
    teinte: z.enum(['bleu', 'turquoise', 'ocre']).default('bleu'),
    /** Vrai pour une rubrique ou initiative transversale (Observatoire). */
    rubrique: z.boolean().default(false),
    objectifs: z.array(z.string()).default([]),
    axes: z
      .array(z.object({ titre: z.string(), description: z.string() }))
      .default([]),
    /** Avertissement affiché en évidence (ex. Clinique juridique). */
    avertissement: z.string().optional(),
    engagement: z
      .object({
        titre: z.string(),
        texte: z.string(),
        lienLibelle: z.string(),
        lienHref: z.string(),
      })
      .optional(),
    /** Informations manquantes (notes internes, jamais affichées en production). */
    aCompleter: z.array(z.string()).default([]),
  }),
});

const actualites = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/actualites' }),
  schema: z.object({
    titre: z.string(),
    /** Extrait affiché sur les cartes et description pour les moteurs de recherche. */
    description: z.string(),
    /** Date réelle de publication (AAAA-MM-JJ). Laisser vide si inconnue. */
    date: z.coerce.date().optional(),
    categorie: z.enum(clesCategories),
    /** Programmes liés (nom du fichier sans « .md »), par exemple ['observatoire-jeunesse-paix']. */
    programmes: z.array(reference('programmes')).default([]),
    couverture: z
      .object({
        src: z.string(),
        alt: z.string(),
        credit: z.string().optional(),
      })
      .optional(),
    /** Article de démonstration : affiche un bandeau et n'est pas indexé. */
    demo: z.boolean().default(false),
    /** Brouillon : jamais publié. */
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { programmes, actualites };
