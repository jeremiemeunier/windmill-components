# @jeremiemeunier/theme

React theme management system with context provider and theme switching components.

## Installation

Create a `.npmrc` file at the root of your project so npm can access the GitHub registry:

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @jeremiemeunier/theme
```

## Usage

Wrap your application with the `ThemeProvider` to enable theme management:

```tsx
import { ThemeProvider } from "@jeremiemeunier/theme";

const App = () => (
  <ThemeProvider availableTheme={["lavand", "tomato", "sunflower"]}>
    {/* your application */}
  </ThemeProvider>
);
```

Use the theme components in your app:

```tsx
import { ThemeSelector, ThemeSwitch } from "@jeremiemeunier/theme";

const Header = () => (
  <div>
    <ThemeSwitch />
    <ThemeSelector />
  </div>
);
```

### Available themes

The package supports the following theme names:
- `lavand`
- `lavand-ultra`
- `tomato` 
- `sunflower`

### Components

- `ThemeProvider` – context provider that manages theme state
- `ThemeSwitch` – component to toggle between light and dark modes
- `ThemeSelector` – component to select from available color themes

### Build

If you clone this repository and want to generate the distributable files run:

```bash
npm run build
```

This uses **tsup** to compile the source into the `dist/` folder.

