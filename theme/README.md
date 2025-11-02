# @jeremiemeunier/theme

## Aperçu

Système de gestion de thèmes basé sur un provider React et des composants de sélection/commutation.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/theme
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Lint des sources avec ESLint.                            |
| `npm run build` | Compile les bundles `dist/` via tsup.                    |
| `npm run pub`   | Construit puis publie la librairie.                      |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Aucun test automatisé n’est encore fourni.

## Utilisation

Encapsulez votre application avec `ThemeProvider` pour activer la gestion des thèmes :

```tsx
import { ThemeProvider } from "@jeremiemeunier/theme";

const App = () => (
  <ThemeProvider availableTheme={["lavand", "tomato", "sunflower"]}>
    {/* your application */}
  </ThemeProvider>
);
```

Utilisez ensuite les composants de thème dans votre interface :

```tsx
import { ThemeSelector, ThemeSwitch } from "@jeremiemeunier/theme";

const Header = () => (
  <div>
    <ThemeSwitch />
    <ThemeSelector />
  </div>
);
```

### Thèmes disponibles

Le package prend en charge les thèmes suivants :
- `lavand`
- `lavand-ultra`
- `tomato` 
- `sunflower`

### Composants

- `ThemeProvider` : provider de contexte qui gère l’état du thème
- `ThemeSwitch` : composant pour basculer entre les modes clair/sombre
- `ThemeSelector` : composant permettant de choisir un thème colorimétrique

## Publication

Le script `npm run pub` exécute le build et publie la bibliothèque sur GitHub Packages (une authentification préalable est nécessaire).

