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

<Pagination pages={10} page={page} setPage={setPage} />;
```

`Pagination` accepte la prop optionnelle `sticky` afin de fixer le composant lors du défilement.

