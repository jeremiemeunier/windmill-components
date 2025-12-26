# @jeremiemeunier/popover

## Aperçu

Composant React Popover avec support d'animation (Framer Motion), permettant d'afficher du contenu contextuel au clic. Comprend un trigger personnalisable et un positionnement flexible du contenu.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/popover
   ```

## Scripts npm

| Commande        | Description                                |
| --------------- | ------------------------------------------ |
| `npm run lint`  | Analyse statique avec ESLint.              |
| `npm run build` | Compile les sources vers `dist/` via tsup. |
| `npm run pub`   | Construit puis publie la version courante. |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Aucun test automatisé n'est défini pour le moment.

## Utilisation

Le composant `Popover` utilise un pattern de composition avec deux sous-composants : `Popover.Trigger` et `Popover.Content`.

### Exemple de base

```tsx
import { Popover } from "@jeremiemeunier/popover";

<Popover>
  <Popover.Trigger>Cliquez ici</Popover.Trigger>
  <Popover.Content>
    <div>Contenu du popover</div>
  </Popover.Content>
</Popover>;
```

### Popover.Trigger

Le composant `Trigger` accepte les props suivantes :

- `className?: string` — Classe CSS supplémentaire
- `level?: "primary" | "secondary" | "tertiary"` — Niveau de style du bouton
- `format?: "icon-only" | "icon-left" | "icon-right"` — Format du bouton
- `size?: "sm" | "sl"` — Taille du bouton
- `title?: string` — Attribut title HTML
- `onClick?: () => void` — Callback appelé en plus de l'ouverture/fermeture

### Popover.Content

Le composant `Content` accepte les props suivantes :

- `align?: "start" | "center" | "end"` — Alignement du contenu par rapport au trigger (défaut: `"start"`)
- `className?: string` — Classe CSS supplémentaire

### Exemple avec alignement

```tsx
<Popover>
  <Popover.Trigger level="primary" size="sm">
    Options
  </Popover.Trigger>
  <Popover.Content align="end">
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
    </ul>
  </Popover.Content>
</Popover>
```

## Fonctionnalités

- ✅ Ouverture/fermeture au clic
- ✅ Fermeture au clic en dehors du popover
- ✅ Fermeture avec la touche Échap
- ✅ Animations d'entrée/sortie (Framer Motion)
- ✅ Alignement configurable (start, center, end)
- ✅ Trigger personnalisable avec options de style
