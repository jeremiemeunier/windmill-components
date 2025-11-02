# @jeremiemeunier/core

## Aperçu

Bibliothèque de composants transverses (loader, helpers d’animation…) utilisée par l’ensemble des packages Windmill.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet pour pointer vers le registre GitHub :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez ensuite la librairie :

   ```bash
   npm install @jeremiemeunier/core
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Vérifie le code avec ESLint.                             |
| `npm run build` | Compile les sources avec tsup dans le dossier `dist/`.   |
| `npm run pub`   | Lance le build puis publie le package sur le registre.   |

Les commandes sont à exécuter depuis le dossier `core/`.

## Développement local

```bash
npm install      # installe les dépendances du package
npm run lint     # contrôle statique
npm run build    # génère les bundles CommonJS, ES Module et les types
# npm run pub   # nécessite d'être connecté à GitHub Packages
```

## Tests

Ce package ne définit pas encore de suite de tests automatisés.

## Utilisation

### Loader

```tsx
<span className="windmillui-loader">
  <svg viewBox="25 25 50 50">
    <circle r="20" cy="50" cx="50"></circle>
  </svg>
</span>
```
