# @jeremiemeunier/carousel

Simple React carousel to scroll through an array of slides.

## Installation

Create a `.npmrc` file at the root of your project so npm can access the GitHub registry:

```npmrc
@jeremiemeunier:registry=https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @jeremiemeunier/carousel
```

## Usage

```tsx
import { Carousel } from "@jeremiemeunier/carousel";

const slides = [<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>];

<Carousel slides={slides} slidesNumber={2} />;
```

### Props

| Name          | Type                | Default | Description                         |
| ------------- | ------------------- | :-----: | ----------------------------------- |
| `slides`      | `React.ReactNode[]` |   —     | Elements to display.                |
| `slidesNumber`| `number`            |   `4`   | Number of slides visible at a time. |
| `className`   | `string`            |   —     | Additional CSS classes.             |

`Carousel` scrolls smoothly between groups of slides and renders navigation buttons to move between pages.

 
