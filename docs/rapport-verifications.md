# Rapport des vérifications — 13 octobre 2026

Ce document décrit les vérifications **réellement effectuées** pendant le développement, ainsi que leurs limites.

## Contexte

L'environnement de développement disposait de Node.js 22.22.0 et npm 10.9.4, mais **l'accès au registre npm était bloqué** par la politique réseau. Il a donc été impossible d'installer Astro et d'exécuter `npm run build`.

Pour contrôler malgré tout le travail, les gabarits `.astro` ont été convertis en JSX par un script temporaire et rendus en HTML statique. Ce rendu de contrôle **n'est pas le build Astro** : il ne reproduit ni le compilateur, ni l'isolation des styles (scoped CSS), ni la validation des contenus par schéma. Il a servi à vérifier la mise en page, la navigation et les comportements interactifs.

## Résultats

| Vérification | Outil | Résultat |
|---|---|---|
| Syntaxe TypeScript des fichiers `.ts`, `.mjs`, des en-têtes et scripts des fichiers `.astro` (37 blocs) | esbuild | 0 erreur |
| Syntaxe des gabarits `.astro` analysés comme JSX (23 fichiers) | esbuild | 0 erreur |
| Contrastes de couleurs (26 combinaisons) | `npm run verifier:contrastes` | 26/26 conformes |
| Liens internes et fichiers publics dans les sources (53 liens) | `npm run verifier:sources` | aucun problème |
| Rendu des 15 pages HTML (contrôle hors Astro) | script temporaire | 15/15 pages rendues |
| Liens, `alt`, `h1` unique, `<title>`, méta-description, `lang="fr"` sur les 15 pages rendues (491 liens et ressources) | `scripts/verifier-liens.mjs` | conformes ; seul `/sitemap.xml` manquait, normal hors Astro (endpoint non exécuté) |
| Débordement horizontal et cibles < 24 px, 14 pages × 4 largeurs (375, 768, 1 024, 1 440 px) | Chromium (Playwright) | aucun |
| Absence de notes internes, de la vision non validée, d'e-mails, de téléphones et de chiffres d'impact dans les pages publiées | recherche textuelle | aucune occurrence |

### Tests d'interaction (Chromium, Playwright) — 16/16 réussis

- Le premier appui sur Tab atteint le lien d'évitement, visible ; Entrée place le focus sur le contenu principal.
- Ordre de tabulation logique : lien d'évitement, accueil, menu, bouton « Soutenir nos actions », contenu.
- Bouton « Menu » masqué sur grand écran, visible sur mobile (zone de 105 × 44 px).
- Menu replié au chargement ; Entrée l'ouvre (`aria-expanded="true"`) ; Tab atteint le premier lien ; Échap le referme et rend le focus au bouton.
- Sans JavaScript : navigation entièrement visible, bouton masqué.
- Formulaire envoyé vide : résumé de 5 erreurs, focalisé, 5 champs `aria-invalid` ; les liens du résumé mènent au champ concerné.
- Erreurs ciblées pour un e-mail invalide et un message trop court.
- Envoi hors Netlify : le message d'échec est annoncé (`role="status"`).
- Indicateur de focus visible (contour plein de 3 px).
- Sur 40 tabulations, le focus n'est jamais entièrement masqué par l'en-tête fixe.

**Défaut corrigé grâce à ces tests** : la revalidation d'un champ à la perte du focus provoquait un décalage de la mise en page au moment du clic sur « Envoyer », et le clic n'était pas pris en compte. La revalidation se fait désormais pendant la saisie.

## Mise à jour du 13 octobre 2026 (16 h)

- Lien Facebook fourni par l'équipe ajouté (`site-config.ts`) : il apparaît dans le pied de page et sur la page Contact. La page Facebook elle-même n'a pas pu être consultée (accès refusé aux robots) : son contenu n'a donc pas été repris.
- Recommandations de l'outil UI/UX Pro Max appliquées ou écartées : voir `docs/systeme-de-design.md`. Le résumé d'erreurs du formulaire porte désormais `role="alert"` et `aria-labelledby`.
- Tests d'interaction relancés : 16/16 réussis.

## Mise à jour du 13 octobre 2026 (23 h) — photos et refonte visuelle

- 15 photos fournies par l'équipe intégrées (WebP 480/960/1 600 px, métadonnées supprimées, vérifié : aucune donnée EXIF dans les fichiers produits).
- Nouvelle page « En images » (16 pages au total).
- 98/98 images chargées sur 12 pages, à 390 et 1 280 px de large.
- Poids au premier affichage (avant défilement) : 8 à 103 Ko selon la page.
- Aucun débordement ni cible < 24 px : 15 pages × 4 largeurs.
- Tests d'interaction : 16/16 réussis. Contrastes : 26/26 conformes avec la palette alignée sur le logo.
- Liens : 565 liens et ressources analysés sur 16 pages ; seul `/sitemap.xml` manque (généré uniquement par Astro).
- Point d'attention pour le build : les classes passées au composant `Photo` sont ciblées avec `:global()` (isolation des styles d'Astro). Le rendu de contrôle hors Astro ne reproduit pas cette isolation : vérifier visuellement l'accueil après `npm run build`.

## Mise à jour du 13 octobre 2026 (23 h 45) — nouvelle page d'accueil

- Composition inspirée de la maquette de référence fournie (voir `systeme-de-design.md`).
- Contrastes : 38/38 conformes, dont 11 combinaisons de texte posé sur photo voilée, calculées dans le pire cas (photo entièrement blanche ou noire). Un échec détecté (mention « Bukavu » en or : 4,41:1) a été corrigé (texte blanc).
- Tests d'interaction : 16/16. Images : 110/110 chargées. Aucun débordement ni cible < 24 px (15 pages × 4 largeurs). Liens : aucun problème hors `/sitemap.xml`.

## Non vérifié (à faire après installation)

- `npm install`, `npm run build`, `npm run check` (TypeScript d'Astro).
- Génération réelle du sitemap et du robots.txt.
- Tests automatisés d'accessibilité avec axe, pa11y ou Lighthouse (outils non disponibles hors ligne).
- Lecteur d'écran (NVDA, VoiceOver, TalkBack).
- Envoi réel du formulaire sur Netlify et réception des notifications.
- Performance mesurée (Lighthouse en profil mobile lent).
