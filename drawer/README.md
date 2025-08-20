# @jeremiemeunier/drawer

Slide-in side panel with a React context and hook.

## Installation

Create a `.npmrc` file at the root of your project so npm can access the GitHub registry:

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @jeremiemeunier/drawer
```

## Usage

Wrap your application with the `DrawerProvider` and control the drawer through the `useDrawer` hook:

```tsx
import { DrawerProvider, useDrawer } from "@jeremiemeunier/drawer";

const App = () => {
  const { openDrawer, pushContent } = useDrawer();

  return (
    <DrawerProvider>
      <button
        onClick={() => {
          pushContent(<div>My drawer content</div>);
          openDrawer();
        }}
      >
        Open drawer
      </button>
    </DrawerProvider>
  );
};
```

### API

- `DrawerProvider` – context provider wrapping your app.
- `useDrawer()` – hook returning `pushContent`, `openDrawer`, `closeDrawer`, and `switchDrawer` functions.

The drawer uses **framer-motion** for animations and **simplebar-react** for scrollbars.

 
