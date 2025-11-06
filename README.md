# Windmill Components

Ce dépôt regroupe plusieurs librairies React publiées sous le scope `@jeremiemeunier`. Chaque dossier correspond à un package indépendant contenant son propre code et sa documentation.

## Packages disponibles

| Package | Description rapide |
| ------- | ------------------ |
| **core** | Composants de base et utilitaires (ex. `Loader`). |
| **carousel** | Composant de carrousel pour faire défiler du contenu. |
| **cursor** | Curseur personnalisé qui met en évidence les liens. |
| **drawer** | Panneau latéral coulissant. |
| **editorparser** | Parser pour afficher le contenu d'un éditeur au format JSON. |
| **form** | Large collection d’éléments de formulaire : `Input`, `Select`, `Checkbox`, `DatePicker`, etc. |
| **x-form** | Fork FormData de form - composants de formulaire optimisés pour l'extraction automatique de FormData. |
| **hooks** | Hooks React réutilisables comme `useRefresh` et `useSeo`. |
| **modal** | Système de modales complet avec de nombreux sous-composants. |
| **navigation** | Provider et hook pour gérer l’état de navigation. |
| **theme** | Gestion des thèmes avec contexte et composants de sélection. |
| **toast** | Bibliothèque de notifications toast. |

Chaque package possède un fichier `README.md` décrivant en détail son installation et son utilisation. Vous pouvez ainsi intégrer uniquement les composants dont vous avez besoin.

## Documentation par package

- [`core`](core/README.md) : composants transverses (loader, helpers).
- [`carousel`](carousel/README.md) : carrousel React paginé.
- [`cursor`](cursor/README.md) : curseur personnalisé pour mettre en avant les liens.
- [`drawer`](drawer/README.md) : panneau latéral animé.
- [`editorparser`](editorparser/README.md) : rendu d’un contenu JSON structuré.
- [`form`](form/README.md) : ensemble complet de champs de formulaires.
- [`x-form`](x-form/README.md) : composants de formulaire FormData-focused.
- [`hooks`](hooks/README.md) : hooks React partagés (`useRefresh`, `useSeo`, …).
- [`modal`](modal/README.md) : système de modales modulaire.
- [`navigation`](navigation/README.md) : provider et composants de pagination.
- [`theme`](theme/README.md) : gestion de thèmes et sélecteurs associés.
- [`toast`](toast/README.md) : notifications toast configurables.

## Installation générale

Ajoutez un fichier `.npmrc` à la racine de votre projet pour récupérer les packages depuis le registre GitHub :

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Installez ensuite les packages souhaités, par exemple :

```bash
npm install @jeremiemeunier/core @jeremiemeunier/form
```

## Développement

### Scripts communs

Tous les packages partagent la même structure de scripts npm :

| Script            | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `npm run lint`    | Analyse le code avec ESLint.                                                |
| `npm run build`   | Compile le package avec **tsup** et génère les fichiers dans `dist/`.       |
| `npm run pub`     | Exécute le build puis publie la version courante sur GitHub Packages.       |
| `npm run pubbeta` | (Uniquement dans `form`) publie une version marquée `beta` après le build.   |

> ℹ️ Le package `@jeremiemeunier/toast` expose le script `npm run tsup` pour la compilation ; son comportement est équivalent à `npm run build`.

Les scripts doivent être lancés dans le dossier du package concerné.

### Installer les dépendances

Chaque dossier de package contient son propre `package.json`. Vous pouvez donc cloner ce dépôt puis, dans le répertoire du package à modifier, lancer :

```bash
npm install
```

Le dépôt ne contient pas de workspace monorepo : les dépendances sont isolées dans chaque package.

### Construire un package

Chaque package est construit avec **tsup** pour générer les fichiers distribuables dans le dossier `dist`.

```bash
npm run build
```

Le build produit à la fois les fichiers JavaScript et les définitions TypeScript.

### Tests

Aucun package ne fournit encore de suite de tests automatisés. Lorsque des tests seront ajoutés, ils suivront la convention `npm test`.

### Publication

Pour publier une nouvelle version d’un package :

1. Mettez à jour la version dans `package.json`.
2. Générez les artefacts (`npm run build`).
3. Publiez avec `npm run pub` (ou `npm run pubbeta` pour publier une préversion du package `form`). Assurez‑vous d’être authentifié sur le registre GitHub Packages (`npm login --registry=https://npm.pkg.github.com`).

