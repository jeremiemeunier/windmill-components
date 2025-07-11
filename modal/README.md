# windmillui Modal

Bibliothèque React pour gérer des modales complexes. Le composant `Modal` expose plusieurs sous‑composants permettant de créer des menus ou des boîtes de dialogue.

## Installation

Installez le paquet via npm :

```bash
npm install @jeremiemeunier/modal
```

ou avec yarn :

```bash
yarn add @jeremiemeunier/modal
```

## Construction

Si vous clonez ce dépôt et souhaitez générer la version distribuable, lancez :

```bash
npm run build
```

La commande s’appuie sur **tsup** pour compiler les fichiers TypeScript dans le dossier `dist`.

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
