# @jeremiemeunier/editorparser

Composant React permettant d'afficher le contenu d'un éditeur au format JSON. Il
convertit un tableau d'éléments (titres, paragraphes, images, citations…) en
balises HTML.

## Installation

Ajoutez un fichier `.npmrc` à la racine de votre projet :

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Puis installez la dépendance :

```bash
npm install @jeremiemeunier/editorparser
```

## Construction

Si vous utilisez ce dépôt directement, générez la version distribuable avec :

```bash
npm run build
```

La commande s'appuie sur **tsup** pour produire les fichiers dans `dist/`.

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

