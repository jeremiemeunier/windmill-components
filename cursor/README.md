# @jeremiemeunier/cursor

## Aperçu

Curseur personnalisé qui encadre automatiquement les liens et éléments interactifs pour améliorer leur mise en évidence.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/cursor
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Vérifie la base de code avec ESLint.                     |
| `npm run build` | Compile le package avec tsup et produit `dist/`.         |
| `npm run pub`   | Construit puis publie la librairie sur GitHub Packages.  |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub   # publication (optionnelle)
```

## Tests

Ce package ne dispose pas encore de tests automatisés.

## Utilisation

```tsx
import { CustomCursor } from "@jeremiemeunier/cursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <a href="#">My link</a>
    </>
  );
}
```

Le composant se charge d’injecter les styles nécessaires et de suivre la souris pour afficher un cadre animé autour des éléments ciblés.

