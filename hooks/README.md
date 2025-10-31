# @jeremiemeunier/hooks

## Aperçu

Collection de hooks React partagés entre les différents packages Windmill (`useRefresh`, `useSeo`, etc.).

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/hooks
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Lint la base de code.                                    |
| `npm run build` | Génère les bundles CommonJS/ESM via tsup.                |
| `npm run pub`   | Construit puis publie la librairie.                      |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Les hooks ne disposent pas encore de tests automatisés.

## Hooks disponibles

### `useRefresh`

Rafraîchit les requêtes actives créées avec **@tanstack/react-query**. Le hook expose la fonction `refreshing` qui accepte une liste de clés de requête, invalide les entrées correspondantes puis les relance.

```ts
import { useRefresh } from "@jeremiemeunier/hooks";

const { refreshing } = useRefresh();

refreshing(["users"]);
```

Assurez-vous qu’un `QueryClientProvider` est présent dans votre application.

### `useSeo`

Met à jour les métadonnées SEO (balises `meta`). Appelez le hook avec les informations à appliquer.

```ts
import { useSeo } from "@jeremiemeunier/hooks";

useSeo({
  title: "Page title",
  description: "Short description",
  image: "/preview.png",
  keywords: "react, hooks, seo",
  color: "#3b82f6",
  type: "website",
});
```

Ajoutez les balises suivantes dans votre HTML pour qu’elles puissent être mises à jour :

```html
<meta data-seo-title />
<meta data-seo-description />
<meta data-seo-image />
<meta data-seo-theme />
```

## Utilisation dans un projet React

Après l’installation (et éventuellement un build local), importez les hooks depuis `@jeremiemeunier/hooks` dans vos composants comme n’importe quelle dépendance.
