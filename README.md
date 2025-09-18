# Windmill Components

Ce dépôt regroupe plusieurs librairies React publiées sous le scope `@jeremiemeunier`. Chaque dossier correspond à un package indépendant contenant son propre code et sa documentation.

## Packages disponibles

| Package | Description rapide |
| ------- | ------------------ |
| **core** | Composants de base et utilitaires (ex. `Loader`). |
| **carousel** | Composant de carrousel pour faire défiler du contenu. |
| **cursor** | Curseur personnalisé qui met en évidence les liens. |
| **drawer** | Panneau latéral coulissant. |
| **editorparser** | Parser pour afficher le contenu d'un éditeur au format JSON. |
| **form** | Large collection d’éléments de formulaire : `Input`, `Select`, `Checkbox`, `DatePicker`, etc. |
| **hooks** | Hooks React réutilisables comme `useRefresh` et `useSeo`. |
| **modal** | Système de modales complet avec de nombreux sous-composants. |
| **navigation** | Provider et hook pour gérer l’état de navigation. |
| **theme** | Gestion des thèmes avec contexte et composants de sélection. |
| **toast** | Bibliothèque de notifications toast. |

Chaque package possède un fichier `README.md` décrivant en détail son installation et son utilisation. Vous pouvez ainsi intégrer uniquement les composants dont vous avez besoin.

## Installation générale

Ajoutez un fichier `.npmrc` à la racine de votre projet pour récupérer les packages depuis le registre GitHub :

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Installez ensuite les packages souhaités, par exemple :

```bash
npm install @jeremiemeunier/core @jeremiemeunier/form
```

## Développement

Chaque package est construit avec **tsup** pour générer les fichiers distribuables dans le dossier `dist`. Reportez‑vous aux scripts `build` de chaque package pour plus de détails.

