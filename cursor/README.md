# @jeremiemeunier/cursor

Custom cursor component that highlights links by drawing a frame around them.

## Installation

Create a `.npmrc` file at the root of your project so npm can access the GitHub registry:

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @jeremiemeunier/cursor
```

## Usage

```tsx
import { CustomCursor } from "@jeremiemeunier/cursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <a href="#">My link</a>
    </>
  );
}
```

### Build

If you clone this repository and want to generate the distributable files run:

```bash
npm run build
```

This uses **tsup** to compile the source into the `dist/` folder.

