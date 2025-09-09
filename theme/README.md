# @jeremiemeunier/navigation

Helpers for managing navigation state and pagination in React apps.

## Installation

Create a `.npmrc` file at the root of your project so npm can access the GitHub registry:

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @jeremiemeunier/navigation
```

## Usage

Wrap your application with the `NavigationProvider` to expose navigation state:

```tsx
import { NavigationProvider, NavigationContext } from "@jeremiemeunier/navigation";

<NavigationProvider>{/* your app */}</NavigationProvider>;
```

Access and update the context with React's `useContext`:

```tsx
const { appActualPage, setAppActualPage } = useContext(NavigationContext);
```

### Pagination component

The package also includes a `Pagination` component to switch between pages:

```tsx
import { Pagination } from "@jeremiemeunier/navigation";

const [page, setPage] = useState(1);

<Pagination pages={10} page={page} setPage={setPage} />;
```

`Pagination` accepts an optional `sticky` prop to keep the component fixed while scrolling.

