# Système de design — JGL Africa (proposition temporaire)

> Ce système de design est une **proposition de conception**. L'or et le bleu sont relevés sur le logo « Justicia Great Lakes » visible sur les photos de l'organisation, mais ce document ne constitue pas une charte graphique officielle. Si l'organisation dispose d'une charte, elle le remplace.

Les valeurs ci-dessous sont définies dans `src/styles/global.css` (section « Jetons de conception »). C'est la seule source de vérité : modifiez les variables CSS, pas les valeurs isolées dans les composants.

## Principes

1. **Sérieux institutionnel, chaleur humaine** : bleu profond pour la confiance, vert-turquoise du lac Kivu pour la paix, accent chaud réservé aux actions.
2. **Des photos vraies** : les visuels principaux sont des photos des activités de l'organisation, légendées uniquement avec des faits visibles. Les illustrations (collines, lac, courbes de niveau) restent pour Children in Need, la page 404 et les états vides.
3. **Sobriété** : pas de carrousel, pas d'animation automatique ; les voiles de couleur sur les photos servent la lisibilité du texte. Temps fort de l'accueil : la grande photo voilée et ses tuiles d'action.
4. **Légèreté** : polices système, illustrations SVG, aucune ressource tierce.
5. **Accessibilité d'abord** : contrastes vérifiés par script, focus visible, cibles ≥ 44 px.

## Couleurs

| Jeton | Valeur | Rôle |
|---|---|---|
| `--nuit` | `#0e2a47` | Couleur principale : titres, pied de page, contours de focus |
| `--nuit-700` | `#1d5577` | Bleu du logo (« GREAT LAKES ») : liens, accents |
| `--lac` | `#1b6f69` | Couleur secondaire : repères, bandeau d'appel, icônes |
| `--lac-clair` | `#dcedea` | Fonds d'encadrés |
| `--brume` | `#eef3f2` | Fonds des sections alternées |
| `--mais` | `#e4a63c` | Or du logo (« JUSTICIA ») : boutons d'action (texte bleu nuit), repères |
| `--encre` | `#17202b` | Texte courant |
| `--encre-douce` | `#4a5563` | Texte secondaire |
| `--trait` | `#cfdad8` | Bordures et séparateurs |
| `--alerte` | `#a3261b` | Erreurs |

Toutes les combinaisons utilisées sont contrôlées par `npm run verifier:contrastes` (26 combinaisons conformes au niveau AA).

## Typographie

- **Titres** : police à empattements du système (Charter, Cambria, Noto Serif ou Georgia selon l'appareil), graisse 700.
- **Texte** : police sans empattement du système (`system-ui`).
- **Échelle** fluide (rapport ≈ 1,25) : `--t-h1` 34 → 56 px, `--t-h2` 26 → 36 px, `--t-h3` 20 → 24 px, texte 17 px, petit texte 14 px.
- **Longueur de ligne** limitée à environ 42 rem (65 à 75 caractères).

## Espacements et mise en page

- Échelle d'espacement : 4, 8, 16, 24, 40, 64, 96 px (`--e-1` à `--e-7`).
- Largeur maximale du contenu : 72 rem ; gouttières adaptatives de 16 à 32 px.
- Points de rupture : 40 em (640 px), 44 em, 52 em, 56 em, 64 em (1 024 px, passage au menu complet).
- Texte aligné à gauche partout.

## Composants

| Composant | Fichier | Règles |
|---|---|---|
| Bouton principal | `.bouton--principal` | Fond maïs, texte bleu nuit, hauteur ≥ 46 px, transition 150 ms |
| Bouton secondaire | `.bouton--secondaire` | Contour bleu nuit (blanc sur fond sombre) |
| Carte de programme | `ProgrammeCard.astro` | Toute la carte est cliquable, un seul lien annoncé (le titre) |
| Carte d'article | `ArticleCard.astro` | Idem ; date affichée seulement si elle est réelle |
| État vide | `EtatVide.astro` | Message utile + action, jamais d'espace blanc |
| Note interne | `NoteEditoriale.astro` | Visible uniquement en relecture |
| Bandeau d'appel | `AppelAction.astro` | Fond vert-turquoise, distinct du pied de page |

## Contrôle croisé avec l'outil UI/UX Pro Max (13 octobre 2026)

L'outil fourni par l'équipe du projet (version 2.15.0) a été interrogé avec la requête « nonprofit human rights NGO justice peace institutional ». Ses recommandations ont été comparées au système existant :

| Recommandation de l'outil | Décision |
|---|---|
| Structure « Introduction + domaines + appel à l'action », appel en haut et en bas de page | Déjà en place |
| Bleu marine institutionnel (`#1E3A5F`), titres à empattements, fond clair | Cohérent avec la palette existante (`#0e2a47`) ; conservée |
| Accent chaud pour les appels à l'action, contraste ≥ 4,5:1 sur le libellé | Déjà en place (7,5:1) |
| Polices Google Fonts (Outfit, Work Sans) | **Non retenu** : requêtes externes et transfert de données à un tiers, au détriment des connexions lentes. Les polices système sont conservées. |
| Résumé d'erreurs : `role="alert"`, titre relié, focus après échec, erreurs en ligne conservées | Appliqué (ajout de `role="alert"` et `aria-labelledby`) |
| Focus non masqué par l'en-tête fixe (`scroll-padding-top`) | Déjà en place et testé |
| État actif dans la navigation | Déjà en place (`aria-current`) |
| États vides avec message et action | Déjà en place |
| Astro : `astro:assets` pour les images locales | Documenté pour les futures photos (README) ; les SVG restent dans `public/` |
| Astro : préchargement (`prefetch`) | **Non retenu** pour l'instant : économie de données sur les connexions mobiles lentes |
| Vérification aux largeurs 375, 768, 1 024 et 1 440 px | Effectuée (voir `rapport-verifications.md`) |
| Mode sombre | Non prévu dans le cahier des charges ; possible plus tard grâce aux variables CSS |

## Photographies (mise à jour du 13 octobre 2026)

| Règle | Application |
|---|---|
| Formats | WebP en 480, 960 et 1 600 px, `srcset` + `sizes` : le téléphone charge la petite version |
| Poids | 15 à 30 Ko (480 px), 100 à 190 Ko (1 600 px) ; premier affichage d'une page ≤ ~100 Ko d'images |
| Chargement | Différé (`loading="lazy"`) sauf la photo principale de la page |
| Recadrage | Ratio fixé par contexte (4:3 cartes et en-têtes, 3:2 galeries, 2:1 mosaïque) ; point d'intérêt réglé par photo (`position`) |
| Coins | `--rayon-grand` ; la photo de l'accueil déborde jusqu'au bord droit de l'écran sur grand écran, avec un liseré or |
| Texte | Jamais de texte posé sur une photo (lisibilité, contraste) |
| Légendes | Faits visibles uniquement ; crédit « Photos : JGL Africa » |

## Maquette de référence (13 octobre 2026, 23 h 35)

L'équipe a fourni une capture d'une maquette de site d'ONG publiée sur Dribbble (organisation « ERADD »). Son identité (nom, logo, couleurs vertes, textes, partenaires) n'a **pas** été reprise. Seuls des principes de composition, courants sur les sites d'ONG, ont été transposés à l'identité de JGL Africa :

| Principe de la maquette | Transposition sur le site de JGL Africa |
|---|---|
| Grande photo pleine largeur voilée de couleur, en-tête intégré | Photo de formation au CLAC, voile bleu nuit (contraste ≥ 7:1 vérifié dans le pire cas), en-tête bleu nuit sur la page d'accueil |
| Grand titre d'affiche | Titre en police à empattements, très grand et gras (pas de police condensée : aucune police libre légère n'était disponible sans requête externe) |
| Tuiles d'action à cheval sur la photo | Trois tuiles « Participer à nos formations », « Collaborer avec nous », « Soutenir nos actions », sur photos voilées (turquoise, bleu du logo, or) |
| Bloc « À propos » posé sur une photo | Photo de groupe + bloc bleu nuit « Qui sommes-nous ? » avec la vision officielle en citation |
| Tuiles d'interventions colorées | Tuiles de programmes : photo + bloc bleu nuit ou turquoise, filet or |
| Bandeau d'appel au don sur photo + bande de photos | Bandeau « Aidez-nous à former les bâtisseurs de paix de demain » sur photo voilée, suivi d'une bande de quatre photos menant à « En images » |
| Rangée de logos de partenaires | **Non reprise** : aucun partenaire n'est confirmé ; aucun logo ne sera affiché sans autorisation écrite |

Le filigrane des photos est écarté (agrandissement de 14 %) uniquement sur les usages décoratifs (fonds, tuiles, bande) ; les photos légendées restent entières.

## Référence Dribbble

La page de recherche Dribbble indiquée (« ONG site ») n'a pas pu être consultée : son contenu est chargé par JavaScript et n'est pas accessible aux outils de lecture utilisés. Aucune maquette n'a été reprise ; les choix ci-dessus s'appuient sur les conventions courantes des sites d'ONG (photo d'activité en ouverture, déclaration de vision mise en avant, programmes illustrés, galerie, appel à l'engagement).
