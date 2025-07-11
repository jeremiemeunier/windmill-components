# @jeremiemeunier/hooks

A small collection of React hooks used across windmillui projects.

## Installation

```bash
npm install @jeremiemeunier/hooks
```

## Build

Run the build step before publishing or when using the hooks directly from the repository:

```bash
npm run build
```

This uses [tsup](https://github.com/egoist/tsup) to generate CommonJS and ES modules in `dist/`.

## Available hooks

### `useRefresh`

Refreshes active queries created with **@tanstack/react-query**. The hook exposes a `refreshing` function that accepts a list of query keys and invalidates then refetches matching queries.

```ts
import { useRefresh } from "@jeremiemeunier/hooks";

const { refreshing } = useRefresh();

refreshing(["users"]);
```

Make sure that a `QueryClientProvider` is set up in your application.

### `useSeo`

Updates SEO related meta tags. Call the hook with the information you want to update.

```ts
import { useSeo } from "@jeremiemeunier/hooks";

useSeo({
  title: "Page title",
  description: "Short description",
  image: "/preview.png",
});
```

Add the following tags to your HTML so the hook can update them:

```html
<meta data-seo-title />
<meta data-seo-description />
<meta data-seo-image />
<meta data-seo-theme />
```

## Usage in a React project

After installing the package and running the build step, import the hooks from `@jeremiemeunier/hooks` in your React components as shown above. They can be bundled with your application like any other dependency.
