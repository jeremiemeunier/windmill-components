# @jeremiemeunier/navigation

## Aperçu

Provider React léger et composants utilitaires pour gérer l’état de navigation et la pagination dans une application.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/navigation
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Analyse statique avec ESLint.                            |
| `npm run build` | Compile les sources vers `dist/` via tsup.               |
| `npm run pub`   | Construit puis publie la version courante.               |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Aucun test automatisé n’est défini pour le moment.

## Utilisation

Encapsulez votre application avec `NavigationProvider` pour exposer l’état de navigation :

```tsx
import { NavigationProvider, NavigationContext } from "@jeremiemeunier/navigation";

<NavigationProvider>{/* your app */}</NavigationProvider>;
```

Accédez au contexte et mettez-le à jour via `useContext` :

```tsx
const { appActualPage, setAppActualPage } = useContext(NavigationContext);
```

### Pagination component

Le package expose également un composant `Pagination` pour changer de page :

```tsx
import { Pagination } from "@jeremiemeunier/navigation";

const [page, setPage] = useState(1);

<Pagination page={page} setPage={setPage} allPages={10}>
  <Pagination.PaginationPrevious />
  <Pagination.PaginationItem />
  <Pagination.PaginationNext />
</Pagination>;
```

La configuration sticky se passe dans `config`, par exemple `config={{ sticky: { key: true, top: 0 } }}`.

## Migration depuis la version 1.x

La version 2 remplace l’API compacte `<Pagination pages={...} />` par une composition de contrôles enfants. Renommez `pages` en `allPages` et ajoutez les contrôles souhaités comme enfants. Les options `sticky`, `noSelect` et `pages` ont été remplacées par `config.sticky`, la composition explicite des contrôles et `allPages`.
