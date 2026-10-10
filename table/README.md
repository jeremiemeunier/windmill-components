# @jeremiemeunier/table

Composant React pour afficher des lignes de données dans un tableau défilable. Les colonnes sont définies par une clé et un libellé, avec la possibilité de personnaliser le rendu de chaque cellule et d'ajouter des actions par ligne.

## Installation

Configurez le registre GitHub Packages dans le fichier `.npmrc` de votre projet :

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Installez le package :

```bash
npm install @jeremiemeunier/table
```

React et React DOM doivent être fournis par l'application hôte (versions 18 ou 19).

## Utilisation

```tsx
import { Table } from "@jeremiemeunier/table";

type User = {
  name: string;
  email: string;
};

const rows: User[] = [
  { name: "Ada Lovelace", email: "ada@example.com" },
  { name: "Grace Hopper", email: "grace@example.com" },
];

function UsersTable() {
  return (
    <Table
      headings={[
        { key: "name", label: "Nom" },
        { key: "email", label: "E-mail" },
      ]}
      rows={rows}
    />
  );
}
```

`headings` définit l'ordre des colonnes. Par défaut, la valeur associée à `key` est affichée sous forme de texte. Utilisez `render` pour contrôler le contenu d'une cellule :

```tsx
{
  key: "email",
  label: "E-mail",
  render: (value, user) => <a href={`mailto:${String(value)}`}>{user.email}</a>,
}
```

Les actions par ligne sont facultatives. Elles apparaissent au survol, au toucher ou lorsque la ligne reçoit le focus clavier :

```tsx
<Table
  headings={[{ key: "name", label: "Nom" }]}
  rows={rows}
  onHoverActions={(user) => (
    <button type="button" onClick={() => console.log(user.email)}>
      Ouvrir
    </button>
  )}
/>
```

## API

- `headings`: liste de colonnes avec `key`, `label` et un `render` facultatif recevant `(value, row, rowIndex)`.
- `rows`: liste d'objets dont les clés correspondent aux clés des colonnes.
- `onHoverActions`: fonction facultative recevant `(row, rowIndex)` et renvoyant le contenu React des actions.

Le tableau utilise les classes `table-root` et `table-hover-actions` pour permettre l'ajout de styles depuis l'application.

## Développement

Dans le dossier `table/` :

```bash
npm install
npm run build
npm run lint
```
