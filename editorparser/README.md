# @jeremiemeunier/editorparser

Composant React permettant d'afficher le contenu d'un éditeur au format JSON. Il
convertit un tableau d'éléments (titres, paragraphes, images, citations…) en
balises HTML.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez la dépendance :

   ```bash
   npm install @jeremiemeunier/editorparser
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Vérifie la qualité du code avec ESLint.                  |
| `npm run build` | Construit les bundles `dist/` via tsup.                  |
| `npm run pub`   | Construit puis publie le package sur GitHub Packages.    |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Ce package ne propose pas encore de tests automatisés.

## Utilisation

Importez le composant et passez‑lui la structure JSON décrivant votre contenu :

```tsx
import { EditorParser } from "@jeremiemeunier/editorparser";

const data = [
  { type: "h2", content: "Titre" },
  { type: "p", content: "Premier paragraphe" },
  { type: "img", content: "/image.jpg" },
  { type: "cit", content: "Citation", author: "Auteur" },
];

const Article = () => <EditorParser bson={data} />;
```

`EditorParser` accepte la propriété `bson` qui peut être un élément unique ou un
tableau d'éléments. Chaque élément possède au minimum :

```ts
interface EditorBlockElementInterface {
  type: string;
  content: string | EditorBlockCardInterface[];
  class?: string[];
  author?: string;
}
```

Les types reconnus par le parser sont `h2` à `h6`, `cit`, `img` et `p` (par
defaut).

