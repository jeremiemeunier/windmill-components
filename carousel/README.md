# @jeremiemeunier/carousel

## Aperçu

Composant React de carrousel permettant de faire défiler un ensemble de slides avec pagination automatique.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet pour pointer vers le registre GitHub :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/carousel
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Analyse statique via ESLint.                             |
| `npm run build` | Génère les bundles du composant avec tsup dans `dist/`.  |
| `npm run pub`   | Construit puis publie la version courante sur le registre|

Exécutez ces commandes depuis le dossier `carousel/`.

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub   # publication nécessitant une connexion à GitHub Packages
```

## Tests

Ce package ne dispose pas encore de tests automatisés.

## Utilisation

```tsx
import { Carousel } from "@jeremiemeunier/carousel";

const slides = [<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>];

<Carousel slides={slides} slidesNumber={2} />;
```

### Props

| Nom            | Type                | Défaut | Description                                  |
| -------------- | ------------------- | :----: | -------------------------------------------- |
| `slides`       | `React.ReactNode[]` |   —    | Éléments à afficher dans le carrousel.       |
| `slidesNumber` | `number`            |  `4`   | Nombre de slides visibles simultanément.     |
| `className`    | `string`            |   —    | Classe(s) CSS supplémentaires optionnelles.  |

Le composant gère la pagination, le scroll fluide et ajoute des contrôles de navigation accessibles.

 
