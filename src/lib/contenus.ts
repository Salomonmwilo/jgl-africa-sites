import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'actualites'>;
export type Programme = CollectionEntry<'programmes'>;

/** Articles publiables, triés du plus récent au plus ancien (articles non datés en dernier). */
export async function articlesPublies(): Promise<Article[]> {
  const tous = await getCollection('actualites', ({ data }) => !data.brouillon);
  return tous.sort((a, b) => {
    const da = a.data.date?.getTime() ?? 0;
    const db = b.data.date?.getTime() ?? 0;
    return db - da;
  });
}

/** Programmes triés selon leur ordre d'affichage. */
export async function programmesTries(): Promise<Programme[]> {
  const tous = await getCollection('programmes');
  return tous.sort((a, b) => a.data.ordre - b.data.ordre);
}

/** Articles rattachés à un programme donné. */
export async function articlesDuProgramme(idProgramme: string): Promise<Article[]> {
  const articles = await articlesPublies();
  return articles.filter((a) => a.data.programmes.some((p) => p.id === idProgramme));
}

const formatDate = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Date au format « 16 mai 2026 ». */
export function dateFr(date: Date): string {
  return formatDate.format(date);
}

/** Date au format ISO (AAAA-MM-JJ) pour l'attribut datetime. */
export function dateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}
