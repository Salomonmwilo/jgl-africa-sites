# Site web de Justicia Great Lakes Africa (JGL Africa)

Site institutionnel multipage de Justicia Great Lakes Africa, organisation engagée pour les droits humains, la justice, la paix, la bonne gouvernance et l'engagement des jeunes dans la région des Grands Lacs africains.

- **Technologie** : [Astro](https://astro.build) en génération statique (HTML, CSS, JavaScript minimal).
- **Hébergement prévu** : Netlify (forfait gratuit), à partir d'un dépôt GitHub.
- **Langue** : français (`lang="fr"`), structure prête pour une future version anglaise.
- **Aucun serveur permanent, aucune base de données, aucune dépendance payante.**

> **État du projet (13 octobre 2026)** — Le code source est complet, mais le build Astro n'a **pas encore été exécuté** : l'accès au registre npm était bloqué dans l'environnement de développement. Avant toute mise en ligne, lancez `npm install` puis `npm run build` et corrigez les éventuelles erreurs signalées (voir « Limites connues »).

---

## Sommaire

1. [Pages du site](#1-pages-du-site)
2. [Structure des dossiers](#2-structure-des-dossiers)
3. [Prérequis et installation](#3-prérequis-et-installation)
4. [Gérer les contenus](#4-gérer-les-contenus)
5. [Identité visuelle](#5-identité-visuelle)
6. [Formulaire de contact (Netlify Forms)](#6-formulaire-de-contact-netlify-forms)
7. [Publication : GitHub puis Netlify](#7-publication--github-puis-netlify)
8. [Accessibilité et tests](#8-accessibilité-et-tests)
9. [Sécurité et données personnelles](#9-sécurité-et-données-personnelles)
10. [Informations à obtenir auprès de JGL Africa](#10-informations-à-obtenir-auprès-de-jgl-africa)
11. [Limites connues](#11-limites-connues)

---

## 1. Pages du site

| Page | Adresse | Fichier |
|---|---|---|
| Accueil | `/` | `src/pages/index.astro` |
| À propos | `/a-propos/` | `src/pages/a-propos.astro` |
| Nos programmes | `/programmes/` | `src/pages/programmes/index.astro` |
| Académie des droits humains | `/programmes/academie-droits-humains/` | `src/content/programmes/academie-droits-humains.md` |
| École du Leader et de la Bonne Gouvernance | `/programmes/ecole-leader-bonne-gouvernance/` | `src/content/programmes/ecole-leader-bonne-gouvernance.md` |
| Children in Need | `/programmes/children-in-need/` | `src/content/programmes/children-in-need.md` |
| Clinique juridique | `/programmes/clinique-juridique/` | `src/content/programmes/clinique-juridique.md` |
| Observatoire Jeunesse pour la Paix | `/programmes/observatoire-jeunesse-paix/` | `src/content/programmes/observatoire-jeunesse-paix.md` |
| Actualités et publications | `/actualites/` | `src/pages/actualites/index.astro` |
| Nos activités en images | `/en-images/` | `src/pages/en-images.astro` |
| Article | `/actualites/<nom>/` | `src/content/actualites/<nom>.md` |
| Catégorie d'articles | `/actualites/categorie/<clé>/` | générée seulement si la catégorie contient des articles |
| Contact | `/contact/` | `src/pages/contact/index.astro` |
| Confirmation d'envoi | `/contact/merci/` | `src/pages/contact/merci.astro` (non indexée) |
| Soutenir nos actions | `/soutenir/` | `src/pages/soutenir.astro` |
| Politique de confidentialité | `/confidentialite/` | `src/pages/confidentialite.astro` |
| Mentions légales | `/mentions-legales/` | `src/pages/mentions-legales.astro` |
| Page 404 | toute adresse inconnue | `src/pages/404.astro` |
| Plan du site XML | `/sitemap.xml` | `src/pages/sitemap.xml.ts` |
| robots.txt | `/robots.txt` | `src/pages/robots.txt.ts` |

La rubrique Actualités est **volontairement vide** au lancement : elle affiche un message d'attente plutôt que des articles fictifs.

## 2. Structure des dossiers

```
.
├── astro.config.mjs          Configuration Astro (site statique)
├── netlify.toml              Configuration Netlify (build, en-têtes de sécurité)
├── package.json              Dépendances et commandes
├── tsconfig.json
├── .nvmrc                    Version de Node.js (22)
├── .env.example              Variables d'environnement facultatives (aucun secret)
├── brouillons/               Textes en attente de validation — NON publiés
├── docs/                     Documentation complémentaire
├── public/                   Fichiers servis tels quels (favicon, images)
│   ├── images/photos/        Photos des activités (WebP optimisés)
│   └── images/illustrations/ Illustrations originales (SVG)
├── scripts/                  Outils de vérification et de génération
└── src/
    ├── components/           En-tête, pied de page, cartes, bandeaux…
    ├── content/
    │   ├── programmes/       Un fichier Markdown par programme
    │   └── actualites/       Un fichier Markdown par article
    ├── content.config.ts     Définition et validation des contenus
    ├── data/
    │   ├── site-config.ts    ★ Informations institutionnelles (coordonnées, statut…)
    │   ├── institution.ts    ★ Textes de présentation (mission, valeurs, domaines)
    │   ├── navigation.ts     Menus
    │   ├── categories.ts     Catégories des actualités
    │   ├── photos.ts         ★ Registre des photos (texte alternatif, légende, recadrage)
    │   └── credits-images.json  Registre des images et licences
    ├── i18n/fr.ts            Textes d'interface (boutons, messages d'erreur)
    ├── layouts/BaseLayout.astro  Mise en page commune et métadonnées SEO
    ├── lib/contenus.ts       Fonctions d'accès aux contenus
    ├── pages/                Pages du site
    └── styles/global.css     ★ Couleurs, polices et styles généraux
```

Les fichiers marqués ★ sont ceux que l'on modifie le plus souvent.

## 3. Prérequis et installation

- **Node.js 22.12 ou plus récent** (exigence d'Astro) et npm.
- Git, et un compte GitHub pour la publication.

```bash
# 1. Vérifier la dernière version stable d'Astro (facultatif mais recommandé)
npm view astro version

# 2. Installer les dépendances
npm install

# 3. Lancer le site en local (http://localhost:4321)
npm run dev

# 4. Générer le site de production dans dist/
npm run build

# 5. Prévisualiser le site généré
npm run preview
```

> La version d'Astro est déclarée `^7.0.0` dans `package.json`, d'après les informations publiques consultées pendant la recherche. Elle n'a pas pu être installée ni testée. Si `npm install` échoue, vérifiez la version disponible (`npm view astro version`), adaptez `package.json`, puis consultez le guide de mise à jour d'Astro. Après le premier `npm install` réussi, **versionnez le fichier `package-lock.json`** pour figer les versions.

**Choix techniques à connaître**

- Aucun adaptateur Netlify n'est installé : il est inutile pour un site entièrement statique.
- Le sitemap et le `robots.txt` sont générés par le projet lui-même (`src/pages/sitemap.xml.ts`), sans module externe : une dépendance de moins à maintenir.
- Les polices sont celles du système (aucune requête vers Google Fonts ou autre service) : chargement plus rapide sur les connexions lentes et aucune donnée transmise à un tiers.
- Les illustrations sont en SVG (quelques dizaines de kilo-octets, compressées par Netlify).

## 4. Gérer les contenus

### Mode relecture : voir les notes internes

Le site contient des **notes éditoriales internes** (encadrés rouges « Note interne — à compléter avant publication ») qui listent les informations manquantes. Elles sont :

- **visibles** avec `npm run dev` ;
- **invisibles** sur le site publié, sauf si la variable `PUBLIC_NOTES_EDITORIALES=true` est définie (utile pour un aperçu de relecture sur Netlify).

### 4.1 Modifier le texte de la page d'accueil

Ouvrez `src/data/institution.ts` :

- `accueil.titre` et `accueil.introduction` : titre principal et texte d'introduction ;
- `domaines` : les six domaines d'intervention affichés sur l'accueil et sur « À propos ».

Les textes des sections de l'accueil (Observatoire, appel à la collaboration) se trouvent dans `src/pages/index.astro`.

### 4.2 Modifier la présentation d'un programme

Ouvrez le fichier du programme dans `src/content/programmes/`. Il comporte deux parties :

- **l'en-tête** entre les lignes `---` : titre, résumé, objectifs, axes de travail, appel à l'engagement ;
- **le texte** sous l'en-tête : la présentation, en Markdown (paragraphes séparés par une ligne vide).

La liste `aCompleter` sert uniquement aux notes internes : elle n'apparaît jamais sur le site public.

> Les noms officiels des programmes ne doivent pas être modifiés sans validation de l'organisation.

### 4.3 Ajouter une actualité

1. Copiez `src/content/actualites/_modele-article.md`.
2. Renommez la copie **sans le `_` initial**, en minuscules, sans accents ni espaces : `2026-11-atelier-droits-humains.md`. Ce nom devient l'adresse : `/actualites/2026-11-atelier-droits-humains/`.
3. Complétez l'en-tête : titre, description, **date réelle** (ou supprimez la ligne), catégorie, programmes liés.
4. Rédigez le texte sous l'en-tête.
5. Passez `brouillon: false` pour publier.

Les catégories disponibles sont définies dans `src/data/categories.ts`.

Un **brouillon d'article** sur le concours interuniversitaire d'éloquence du 16 mai 2026 se trouve dans `brouillons/`. Il est volontairement hors du site : il repose sur deux articles de presse et doit être validé par JGL Africa (instructions dans le fichier).

### 4.4 Ajouter ou remplacer une photo

Les photos des activités sont déclarées dans **`src/data/photos.ts`** et stockées, optimisées, dans `public/images/photos/`.

1. Optimisez la photo (redimensionnement en trois tailles WebP et suppression des métadonnées GPS) :

   ```bash
   pip install pillow            # une seule fois
   python3 scripts/optimiser-photos.py ~/Images/atelier.jpg atelier-novembre
   ```

2. Ajoutez une entrée dans `src/data/photos.ts` avec les dimensions affichées par le script, un **texte alternatif** qui décrit l'image et une **légende** qui ne contient que des faits vérifiés.
3. Utilisez la photo :
   - dans une page : `<Photo id="atelier-novembre" legende sizes="100vw" />` ;
   - pour un programme : champ `photo:` (photo principale) ou `galerie:` dans son fichier Markdown ;
   - dans la page « En images » : liste `ordreGalerie` de `photos.ts`.

Ne versionnez pas les originaux (fichiers lourds) : seules les versions optimisées vont dans le dépôt.

**Personnes photographiées** : les photos actuelles montrent des personnes identifiables. L'organisation doit s'assurer de leur accord avant la mise en ligne publique et retirer toute photo sur simple demande (la page Mentions légales l'indique). **Aucune photo d'enfant** ne doit être publiée sans autorisation explicite et appropriée.

### 4.5 Remplacer une illustration

- **Illustration d'un programme** : déposez la nouvelle image dans `public/images/` puis modifiez `illustration` et `illustrationAlt` dans le fichier du programme.
- **Image de l'accueil** : modifiez le chemin dans `src/pages/index.astro` (section « Introduction »).
- **Image de couverture d'un article** : champ `couverture` de l'article.

Règles à respecter pour toute photographie :

1. Inscrire l'image dans `src/data/credits-images.json` (source, auteur, licence) **avant** de la publier.
2. Ne jamais présenter une photo d'illustration comme une photo d'activité de JGL Africa.
3. Obtenir l'accord des personnes reconnaissables. **Aucune photo d'enfant identifiable** (voir la page Children in Need).
4. Supprimer les métadonnées de localisation (GPS) des photos.
5. Réduire le poids : environ 1 600 px de large et moins de 200 Ko pour une photo en JPEG ou WebP.

**Photographies : passer par l'optimisation d'Astro.** Les illustrations actuelles sont des SVG placés dans `public/` (déjà légers). Pour une photographie, placez plutôt le fichier dans `src/assets/` et affichez-le avec le composant `<Image />` (ou `<Picture />`) d'`astro:assets` : Astro produit alors automatiquement des versions WebP/AVIF redimensionnées. Exemple :

```astro
---
import { Image } from 'astro:assets';
import photo from '../assets/atelier-2026.jpg';
---
<Image src={photo} alt="Description précise de la photo" widths={[480, 960, 1600]} sizes="(min-width: 64em) 50vw, 100vw" loading="lazy" />
```

Les illustrations actuelles sont des créations originales, générées par `scripts/generer-illustrations.py` (Python 3, sans dépendance).

### 4.6 Modifier les coordonnées et les informations institutionnelles

Tout se trouve dans **`src/data/site-config.ts`**. Remplacez `null` par la valeur confirmée, entre guillemets :

```ts
coordonnees: {
  adresse: 'Avenue …, Bukavu',
  telephone: '+243 …',
  email: 'contact@domaine-officiel.org',
  …
},
```

Un champ laissé à `null` **n'apparaît pas** sur le site : aucune coordonnée vide ou fictive n'est affichée. Il en va de même pour les réseaux sociaux, les moyens de soutien financier, le logo et les informations juridiques.

- **Logo officiel** : déposez le fichier dans `public/images/` et renseignez `logo: '/images/logo-jgl-africa.svg'`.
- **Domaine officiel** : renseignez `urlOfficielle` (sans `/` final). Les balises canoniques sont alors générées automatiquement.

### 4.7 Changer les couleurs et les polices

Dans `src/styles/global.css`, section « Jetons de conception » :

```css
--nuit: #0e2a47;   /* bleu profond */
--lac: #1b6f69;    /* vert-turquoise */
--mais: #e8b13a;   /* accent des boutons */
```

Après chaque changement, vérifiez les contrastes : `npm run verifier:contrastes`.

Les polices sont définies par `--police-titres` et `--police-texte`. Pour utiliser une police officielle, hébergez ses fichiers dans `public/fonts/` (format WOFF2) plutôt que de la charger depuis un service externe.

> L'or et le bleu de la palette ont été relevés sur le logo « Justicia Great Lakes » visible sur les photos. Ce n'est pas une charte graphique officielle : à remplacer si l'organisation en fournit une.

### 4.8 Ajouter une nouvelle page

1. Créez `src/pages/nom-de-la-page.astro` en vous inspirant de `soutenir.astro` :

   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   import PageHero from '../components/PageHero.astro';
   ---
   <BaseLayout titre="Titre de la page" description="Description unique de 150 caractères environ.">
     <PageHero titre="Titre de la page" chapeau="Phrase d'introduction." />
     <section class="section">
       <div class="conteneur texte-courant">
         <h2>Intertitre</h2>
         <p>Texte…</p>
       </div>
     </section>
   </BaseLayout>
   ```

2. La page est disponible à l'adresse `/nom-de-la-page/`.
3. Pour l'ajouter au menu : `src/data/navigation.ts`.
4. Pour l'ajouter au sitemap : liste `pagesFixes` de `src/pages/sitemap.xml.ts`.

### 4.9 Préparer une version anglaise

Les textes d'interface sont regroupés dans `src/i18n/fr.ts`. Le moment venu : créer `src/i18n/en.ts`, activer l'option `i18n` d'Astro, placer les pages anglaises sous `src/pages/en/` et ajouter les balises `hreflang`. Les traductions des textes institutionnels doivent être validées par l'organisation.

## 5. Identité visuelle

- **Couleurs** : bleu nuit (confiance), vert-turquoise du lac Kivu (paix), fonds clairs, accent « maïs » réservé aux boutons d'action.
- **Typographie** : titres en police à empattements (Charter, Cambria ou Georgia selon l'appareil), texte en police système sans empattement.
- **Signature visuelle** : collines cultivées en terrasses, lac et volcan, et motif de courbes de niveau, qui évoquent les paysages du Kivu sans représenter de personnes.

Le détail du système de design (jetons, règles, contrôle croisé avec l'outil UI/UX Pro Max) figure dans [`docs/systeme-de-design.md`](docs/systeme-de-design.md).

## 6. Formulaire de contact (Netlify Forms)

Le formulaire est prêt pour **Netlify Forms** (attribut `data-netlify`, champ `form-name`, champ piège anti-spam, envoi AJAX encodé en URL, repli sans JavaScript vers `/contact/merci/`).

**Il ne fonctionne qu'une fois le site déployé sur Netlify.** En local, l'envoi échoue et le visiteur voit un message d'erreur : c'est normal.

À faire dans le tableau de bord Netlify **avant** de considérer le formulaire comme opérationnel :

1. **Forms → Enable form detection** (activer la détection des formulaires), puis redéployer le site.
2. Vérifier que le formulaire « contact » apparaît dans la liste.
3. **Forms → Form notifications** : ajouter une notification par e-mail vers l'adresse officielle de l'organisation.
4. **Envoyer un message de test réel**, puis vérifier sa réception dans le tableau de bord et dans la boîte e-mail.
5. Consulter régulièrement le dossier « Spam » des formulaires.

Tant que les points 3 et 4 n'ont pas été vérifiés, **ne considérez pas que les messages sont reçus**.

Selon la documentation consultée en octobre 2026, les envois de formulaires sont gratuits sur les forfaits Netlify à crédits. Vérifiez les conditions en vigueur au moment du déploiement.

## 7. Publication : GitHub puis Netlify

### 7.1 Publier sur GitHub

```bash
git add .
git commit -m "Description de la modification"
git remote add origin https://github.com/<compte>/<depot>.git   # la première fois seulement
git push -u origin main
```

Ne versionnez jamais de mot de passe, de jeton ou de fichier `.env` (ils sont exclus par `.gitignore`).

### 7.2 Déployer sur Netlify

1. Sur Netlify : **Add new project → Import an existing project → GitHub**, puis choisir le dépôt.
2. Paramètres de build (déjà fournis par `netlify.toml`) :
   - commande : `npm run build`
   - dossier publié : `dist`
   - Node.js : 22
3. Lancer le déploiement, puis contrôler le site sur l'adresse `*.netlify.app` attribuée.
4. Configurer le formulaire (section 6).
5. Domaine personnalisé : **Domain management**, puis renseigner `urlOfficielle` dans `site-config.ts`.

### 7.3 Maîtriser le forfait gratuit

D'après la documentation Netlify consultée en octobre 2026 (à revérifier) : les comptes créés depuis septembre 2025 disposent de **300 crédits par mois** sur le forfait gratuit. Chaque **déploiement en production** consomme 15 crédits et chaque Go de bande passante 20 crédits. Si le quota est atteint, le site est **suspendu jusqu'au mois suivant**.

Bonnes pratiques :

- regrouper les modifications et publier en production environ une fois par semaine ;
- utiliser les **Deploy Previews** (aperçus gratuits) pour la relecture, via des branches ou des pull requests ;
- surveiller la consommation dans **Team settings → Usage**.

## 8. Accessibilité et tests

### Mesures mises en œuvre (objectif WCAG 2.2 niveau AA)

- HTML sémantique, un seul `h1` par page, hiérarchie de titres cohérente, `lang="fr"`.
- Lien d'évitement « Aller au contenu principal », premier élément accessible au clavier.
- Indicateur de focus visible (contour de 3 px) et `scroll-padding-top` pour que l'en-tête fixe ne masque pas l'élément focalisé (critère 2.4.11).
- Menu mobile au format « disclosure » : bouton avec `aria-expanded`, fermeture par Échap avec retour du focus, navigation entièrement visible sans JavaScript.
- Zones cliquables d'au moins 44 px de haut pour les boutons et liens de navigation (critère 2.5.8).
- Formulaire : libellés visibles, champs obligatoires indiqués en texte, messages d'erreur reliés aux champs (`aria-describedby`, `aria-invalid`), résumé des erreurs focalisé avec liens vers les champs, statut d'envoi annoncé (`role="status"`), aucune saisie effacée en cas d'erreur, pas de CAPTCHA.
- Contrastes vérifiés (26 combinaisons conformes, voir `npm run verifier:contrastes`).
- Respect de `prefers-reduced-motion`, aucun carrousel, aucune animation automatique.
- Textes alternatifs pour les images informatives, `alt=""` pour les images décoratives.

### Commandes de vérification

```bash
npm run verifier:contrastes   # contrastes de la palette (sans dépendance)
npm run verifier:sources      # liens internes et fichiers publics dans les sources
npm run build && npm run verifier:liens   # liens, alt, h1, titres et descriptions du site généré
npm run check                 # vérification TypeScript d'Astro (installe @astrojs/check à la demande)
```

Tests automatisés recommandés après le build (outils gratuits, non inclus dans les dépendances) :

```bash
npx astro preview --port 4321 &
npx pa11y-ci --sitemap http://localhost:4321/sitemap.xml   # avec le moteur axe, norme WCAG2AA
npx @axe-core/cli http://localhost:4321/ http://localhost:4321/contact/
npx @lhci/cli autorun --collect.staticDistDir=./dist
```

Les tests automatisés ne détectent qu'une partie des problèmes. **Ils ne suffisent pas à établir la conformité WCAG.** Prévoir aussi un parcours manuel au clavier et avec un lecteur d'écran (NVDA sous Windows, VoiceOver sur iPhone ou TalkBack sur Android).

Le détail des vérifications effectuées pendant le développement figure dans [`docs/rapport-verifications.md`](docs/rapport-verifications.md).

## 9. Sécurité et données personnelles

- Site statique : pas de base de données ni de compte administrateur exposé. Cela réduit la surface d'attaque, **sans tout protéger** : le compte GitHub, le compte Netlify et la boîte e-mail recevant les messages doivent être sécurisés (mots de passe forts et uniques, double authentification).
- En-têtes de sécurité définis dans `netlify.toml` (politique de sécurité du contenu, protection contre l'intégration dans un cadre, etc.).
- Aucun script, police, outil de statistiques ou contenu tiers : aucun cookie déposé.
- Le formulaire ne collecte que le nécessaire et avertit clairement de ne pas transmettre d'informations sensibles. **Il n'est pas adapté au signalement de violations des droits humains ni aux demandes d'aide juridique individuelles** : si l'organisation souhaite recevoir ce type d'informations, il faudra un circuit dédié et sécurisé.
- Les messages sont stockés par Netlify, aux États-Unis. **Avant la mise en ligne, faites vérifier par un juriste** la conformité de ce transfert hors de la RDC au droit applicable (Code du numérique de 2023, désignation éventuelle d'un délégué à la protection des données).
- La politique de confidentialité et les mentions légales sont des **modèles à valider**.

## 10. Informations à obtenir auprès de JGL Africa

**Indispensables avant la mise en ligne publique**

- [ ] Numéro d'enregistrement, adresse du siège, représentant légal, directeur ou directrice de la publication (la forme « asbl » et la ville de Bukavu figurent sur le kakémono)
- [ ] Adresse e-mail institutionnelle (pour recevoir les messages du formulaire)
- [ ] Validation des textes de présentation, de la mission et des pages programmes
- [ ] Validation de la politique de confidentialité et des mentions légales (avec avis juridique)
- [ ] Contact pour les questions de protection des données et durée de conservation des messages

**Souhaitables**

- [ ] Logo officiel en fichier vectoriel (SVG ou PDF) : il apparaît sur les photos mais n'a pas été fourni en fichier
- [ ] Accord des personnes visibles sur les photos ; nom du photographe à créditer, le cas échéant
- [ ] Nom officiel des programmes : le kakémono indique « Académie des droits humains **et de la paix** » (le site utilise « Académie des droits humains »)
- [ ] Programmes figurant sur le kakémono mais absents du site (« Programme de préparation à l'intégration… », un programme « …humanitaire ») : à confirmer
- [ ] Rubriques « Nos principes » et « Notre devise » du kakémono (partiellement lisibles sur les photos)
- [ ] Adresse physique, téléphone, horaires
- [ ] Adresse directe de la page Facebook (le lien de partage fourni est utilisé en attendant) et autres comptes officiels éventuels
- [ ] Domaine officiel
- [ ] Confirmer la vision, la mission et la présentation reprises du kakémono (seul l'accord de « bâtisseurs » a été corrigé)
- [ ] Équipe et gouvernance (avec l'accord des personnes)
- [ ] Historique : date de création et faits vérifiés
- [ ] Pour chaque programme : activités réalisées, modalités de participation, calendrier
- [ ] Clinique juridique : services réellement proposés et domaines couverts
- [ ] Children in Need : activités documentées, référent protection de l'enfance, politique de protection adoptée le cas échéant
- [ ] Moyens de soutien financier validés (ou confirmation que seule la prise de contact est proposée)
- [ ] Photographies propres à l'organisation, avec autorisations des personnes visibles
- [ ] Partenaires autorisant la mention de leur nom et de leur logo
- [ ] Validation du brouillon sur le concours d'éloquence (`brouillons/`)

## 11. Limites connues

- **Le build Astro n'a pas été exécuté** pendant le développement (registre npm inaccessible). Le code a été contrôlé autrement : analyse syntaxique de tous les fichiers, rendu de contrôle des 15 pages hors Astro, tests du clavier, du menu mobile et du formulaire dans Chromium. Une erreur propre au compilateur Astro reste possible : **le premier `npm run build` est une étape obligatoire.**
- La version exacte d'Astro n'a pas pu être vérifiée (voir section 3).
- L'envoi réel du formulaire n'a pas été testé (il nécessite un déploiement Netlify).
- Les photos des pages École du Leader, Clinique juridique et Observatoire montrent des activités de JGL Africa dont le rattachement à ces programmes n'est pas confirmé (leurs légendes restent factuelles).
- La page Children in Need conserve une illustration : aucune photo d'enfant n'est utilisée.
- La rubrique Actualités est vide au lancement.
- Les en-têtes de sécurité autorisent les scripts et styles en ligne (`'unsafe-inline'`), nécessaires au fonctionnement d'Astro ; une politique plus stricte demanderait des empreintes (hash) des scripts.
