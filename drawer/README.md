# @jeremiemeunier/drawer

## Aperçu

Panneau latéral coulissant contrôlé par contexte React et hook utilitaire (`useDrawer`).

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/drawer
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Analyse le code avec ESLint.                             |
| `npm run build` | Produit les bundles via tsup dans `dist/`.               |
| `npm run pub`   | Construit puis publie la bibliothèque sur GitHub Packages|

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Ce package ne fournit pas encore de tests automatisés.

## Utilisation

Encapsulez votre application avec `DrawerProvider` et contrôlez l’état via le hook `useDrawer` :

```tsx
import { DrawerProvider, useDrawer } from "@jeremiemeunier/drawer";

const App = () => {
  const { openDrawer, pushContent } = useDrawer();

  return (
    <DrawerProvider>
      <button
        onClick={() => {
          pushContent(<div>My drawer content</div>);
          openDrawer();
        }}
      >
        Open drawer
      </button>
    </DrawerProvider>
  );
};
```

### API

- `DrawerProvider` : provider de contexte qui englobe l’application.
- `useDrawer()` : renvoie les fonctions `pushContent`, `openDrawer`, `closeDrawer` et `switchDrawer`.

Le composant s’appuie sur **framer-motion** pour les animations et **simplebar-react** pour la gestion des barres de défilement.

 
