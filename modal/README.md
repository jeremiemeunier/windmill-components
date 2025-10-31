# @jeremiemeunier/modal

Bibliothèque React pour gérer des modales complexes. Le composant `Modal` expose plusieurs sous‑composants permettant de créer des menus ou des boîtes de dialogue.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet pour pointer vers le registre GitHub :

   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :

   ```bash
   npm install @jeremiemeunier/modal
   ```

## Scripts npm

| Commande        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run lint`  | Lint le projet avec ESLint.                              |
| `npm run build` | Construit les artefacts dans `dist/` via tsup.           |
| `npm run pub`   | Build + publication sur GitHub Packages.                |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub
```

## Tests

Le package ne dispose pas encore de tests automatisés.

## Utilisation

Importez le composant dans votre projet React :

```tsx
import { Modal } from "@jeremiemeunier/modal";
```

Le composant principal possède plusieurs sous‑composants :

- `Modal.Background`
- `Modal.Body`
- `Modal.Close`
- `Modal.Header`
- `Modal.MenuLeft`
- `Modal.MenuRight`
- `Modal.ModalCenter`
- `Modal.Navigation` (avec `Modal.Navigation.Item`)
- `Modal.Pages`

Exemple minimal d’intégration :

```tsx
const [visible, setVisible] = useState(false);

<Modal>
  <Modal.Background setVisibility={setVisible} />
  <Modal.ModalCenter size="medium">
    <Modal.Header>Exemple</Modal.Header>
    <Modal.Close setVisibility={setVisible} />
    <Modal.Body>Contenu de la modale</Modal.Body>
  </Modal.ModalCenter>
</Modal>;
```

Assurez‑vous d’avoir installé les dépendances listées dans `package.json` (React, ReactDOM, framer-motion, simplebar-react, etc.).
