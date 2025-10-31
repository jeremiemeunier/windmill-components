# @jeremiemeunier/toast

## Aperçu

Librairie utilitaire pour afficher des notifications toast réutilisables dans vos applications React.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez la dépendance :

   ```bash
   npm install @jeremiemeunier/toast
   ```

## Scripts npm

| Commande        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `npm run lint`  | Vérifie la base de code avec ESLint.                                     |
| `npm run tsup`  | Compile le package et génère les artefacts dans `dist/`.                 |
| `npm run pub`   | Exécute `tsup` puis publie la bibliothèque sur GitHub Packages.          |

## Développement local

```bash
npm install
npm run lint
npm run tsup
# npm run pub
```

## Tests

Ce package ne définit pas encore de tests automatisés.

## Utilisation

Encapsulez votre application avec `ToastProvider` afin de rendre les notifications disponibles partout.

```tsx
import { ToastProvider } from "@jeremiemeunier/toast";

const App = () => <ToastProvider>{/* your application */}</ToastProvider>;
```

Dans vos composants, utilisez le hook `useToasts` pour ajouter ou supprimer des toasts.

```tsx
import { useToasts } from "@jeremiemeunier/toast";

const Example = () => {
  const { pushToast, clearToast } = useToasts();

  const notify = () => {
    pushToast({
      content: "Votre action est réussie",
      type: "positive",
      title: "Succès",
    });
  };

  return <button onClick={notify}>Afficher un toast</button>;
};
```

### API

- `ToastProvider` : provider de contexte qui stocke les toasts actifs.
- `useToasts()` : hook retournant les fonctions `pushToast` et `clearToast`.
- `Toast` : composant interne chargé d’afficher chaque notification.

`pushToast` accepte les options suivantes :

```ts
{
  content: string;
  type: 'positive' | 'negative' | 'neutral' | null;
  title?: string;
  format?: { icon?: 'left' | 'right' | 'both'; countdown?: boolean };
  position?: 'tl' | 'tr' | 'bl' | 'br' | 'cl' | 'cr' | 'cb' | 'ct';
  icon?: string | string[];
  loading?: boolean;
  timed?: number;        // countdown timer in seconds
  duration?: number;     // auto hide delay in seconds
  persistent?: boolean;  // disable auto hide when true
}
```

## Publication

`npm run pub` se charge de compiler le package avant de lancer `npm publish`. Une authentification GitHub Packages est requise.
