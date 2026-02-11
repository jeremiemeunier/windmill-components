# @jeremiemeunier/graph

## Aperçu

Bibliothèque de graphiques complète et adaptative inspirée de l'architecture interne de YouTube Studio. Un moteur de rendu graphique haute performance construit avec :

- **D3 pour les calculs uniquement** (scales, projections, layouts)
- **Rendu personnalisé** (Canvas, SVG)
- **Architecture modulaire** et industrielle
- **Intégration React** optimisée
- **Support temps réel** pour le streaming de données

## Philosophy

"Do not build charts. Build a rendering engine."

Cette bibliothèque n'est pas une simple collection de graphiques - c'est un **moteur de rendu graphique** avec une séparation claire des responsabilités :

- **Compute Layer** : D3 pour les mathématiques et les transformations
- **Render Engine** : Canvas/SVG pour le rendu haute performance
- **React Components** : Adaptateurs légers pour l'intégration

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :
   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Installez le package :
   ```bash
   npm install @jeremiemeunier/graph
   ```

3. Importez les composants dans votre application :
   ```tsx
   import { LineChart, AreaChart, BarChart, Timeline, Heatmap } from "@jeremiemeunier/graph";
   ```

## Fonctionnalités

### 🎯 Objectifs

- ✅ Pas de bibliothèques externes de graphiques (Chart.js, Recharts, etc.)
- ✅ D3 utilisé **uniquement pour les mathématiques** (scales, domains, layouts)
- ✅ Moteur de rendu personnalisé
- ✅ Haute performance
- ✅ Capable de gérer le temps réel
- ✅ Architecture modulaire
- ✅ Prêt pour l'entreprise

### 📊 Types de Graphiques

**Core Charts:**
- **LineChart** - Graphique en ligne pour visualiser les tendances
- **AreaChart** - Graphique en aires (ligne avec remplissage)
- **BarChart** - Graphique à barres pour comparer les catégories
- **ScatterChart** - Graphique de dispersion pour les corrélations
- **Timeline** - Graphique temporel pour les séries chronologiques
- **Heatmap** - Carte de chaleur pour les données matricielles
- **DonutChart** - Graphique en anneau pour les proportions

**Tremor-Inspired:**
Tous les graphiques suivent les modèles et logiques de Tremor tout en respectant strictement `specs.md`.

**Tremor Data Format Support:**
- ✅ `index`: string - La clé à utiliser pour l'axe X
- ✅ `categories`: string[] - Les clés à extraire comme séries de données
- ✅ `data`: flexible - Format d'objet flexible avec n'importe quelles clés
- ✅ Gradients - Support des dégradés de couleur personnalisables

### 🧱 Architecture

```
Data Layer
    ↓
Compute Layer (D3: scales, math, layout)
    ↓
Render Engine (Canvas/SVG)
    ↓
React Components
```

## Utilisation Rapide

### LineChart

```tsx
import { LineChart } from '@jeremiemeunier/graph';

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
];

function App() {
  return (
    <LineChart
      data={data}
      width={800}
      height={400}
      color="#3b82f6"
      lineWidth={2}
      showGrid={true}
      showAxis={true}
    />
  );
}
```

### AreaChart with Tremor Data Format

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

// Tremor-style data format
const chartData = [
  { date: 'Jan', sales: 2890, costs: 2400 },
  { date: 'Feb', sales: 2756, costs: 2200 },
  { date: 'Mar', sales: 3322, costs: 2600 },
  { date: 'Apr', sales: 3470, costs: 2800 },
  { date: 'May', sales: 3475, costs: 2900 },
];

function App() {
  return (
    <AreaChart
      tremorData={chartData}
      index="date"
      categories={['sales', 'costs']}
      colors={['#3b82f6', '#10b981']}
      width={800}
      height={400}
      showGrid={true}
      showAxis={true}
    />
  );
}
```

### AreaChart with Gradient

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
];

function App() {
  return (
    <AreaChart
      data={data}
      width={800}
      height={400}
      showGradient={true}
      gradientFrom="#3b82f6"
      gradientTo="#8b5cf6"
      fillOpacity={0.4}
    />
  );
}
```

### BarChart

```tsx
import { BarChart } from '@jeremiemeunier/graph';

const data = [
  { category: 'A', value: 30, color: '#3b82f6' },
  { category: 'B', value: 50, color: '#10b981' },
  { category: 'C', value: 20, color: '#f59e0b' },
];

function App() {
  return (
    <BarChart
      data={data}
      width={800}
      height={400}
      defaultColor="#3b82f6"
      showGrid={true}
      showAxis={true}
    />
  );
}
```

### Timeline

```tsx
import { Timeline } from '@jeremiemeunier/graph';

const data = [
  { timestamp: Date.now() - 3600000, value: 100 },
  { timestamp: Date.now() - 1800000, value: 150 },
  { timestamp: Date.now(), value: 200 },
];

function App() {
  return (
    <Timeline
      data={data}
      width={800}
      height={400}
      color="#10b981"
      maxPoints={1000}
    />
  );
}
```

### AreaChart

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
];

function App() {
  return (
    <AreaChart
      data={data}
      width={800}
      height={400}
      color="#3b82f6"
      fillOpacity={0.3}
      showGrid={true}
      showAxis={true}
    />
  );
}
```

### DonutChart

```tsx
import { DonutChart } from '@jeremiemeunier/graph';

const data = [
  { category: 'Product A', value: 40, color: '#3b82f6' },
  { category: 'Product B', value: 30, color: '#10b981' },
  { category: 'Product C', value: 20, color: '#f59e0b' },
  { category: 'Product D', value: 10, color: '#ef4444' },
];

function App() {
  return (
    <DonutChart
      data={data}
      width={400}
      height={400}
      showLegend={true}
    />
  );
}
```

### ScatterChart

```tsx
import { ScatterChart } from '@jeremiemeunier/graph';

const data = [
  { x: 10, y: 20 },
  { x: 15, y: 25 },
  { x: 20, y: 30 },
  { x: 25, y: 22 },
];

function App() {
  return (
    <ScatterChart
      data={data}
      width={800}
      height={400}
      color="#8b5cf6"
      pointRadius={5}
      showGrid={true}
      showAxis={true}
    />
  );
}
```

### Heatmap

```tsx
import { Heatmap } from '@jeremiemeunier/graph';

const data = [
  { x: 0, y: 0, value: 10 },
  { x: 1, y: 0, value: 20 },
  { x: 0, y: 1, value: 15 },
  { x: 1, y: 1, value: 30 },
];

function App() {
  return (
    <Heatmap
      data={data}
      width={800}
      height={400}
      showGrid={false}
      showAxis={true}
    />
  );
}
```

## API Avancée

### Utilisation du Moteur de Base

Pour un contrôle plus fin, vous pouvez utiliser directement le moteur de base :

```tsx
import {
  createGraphEngine,
  createScaleManager,
  createCanvasRenderer,
  createLineModel,
} from '@jeremiemeunier/graph';

// Créer le moteur
const engine = createGraphEngine({
  viewport: { width: 800, height: 600, padding: { top: 40, right: 40, bottom: 60, left: 60 } },
  showGrid: true,
  showAxis: true,
});

// Créer le renderer
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const renderer = createCanvasRenderer(canvas);
engine.setRenderer(renderer);

// Créer et utiliser le modèle
const model = createLineModel(data, engine.getConfig());
const { projectedPoints } = model.compute();

// Rendre
engine.render(projectedPoints);
```

### Store Zustand

Gestion d'état globale pour les graphiques complexes :

```tsx
import { useGraphStore } from '@jeremiemeunier/graph';

function MyComponent() {
  const { setDataset, getDataset, setViewport } = useGraphStore();

  // Définir des données
  setDataset('myData', data);

  // Récupérer des données
  const myData = getDataset('myData');

  // Définir le viewport
  setViewport({
    width: 1000,
    height: 600,
    padding: { top: 40, right: 40, bottom: 60, left: 60 },
  });
}
```

## Props des Composants

### LineChart Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `DataPoint[]` | **required** | Données du graphique |
| `width` | `number` | `800` | Largeur du graphique |
| `height` | `number` | `600` | Hauteur du graphique |
| `color` | `string` | `'#3b82f6'` | Couleur de la ligne |
| `lineWidth` | `number` | `2` | Épaisseur de la ligne |
| `showGrid` | `boolean` | `true` | Afficher la grille |
| `showAxis` | `boolean` | `true` | Afficher les axes |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `padding` | `object` | `{ top: 40, right: 40, bottom: 60, left: 60 }` | Marges internes |

### BarChart Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `BarDataPoint[]` | **required** | Données du graphique |
| `width` | `number` | `800` | Largeur du graphique |
| `height` | `number` | `600` | Hauteur du graphique |
| `defaultColor` | `string` | `'#3b82f6'` | Couleur par défaut des barres |
| `showGrid` | `boolean` | `true` | Afficher la grille |
| `showAxis` | `boolean` | `true` | Afficher les axes |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `padding` | `object` | `{ top: 40, right: 40, bottom: 60, left: 60 }` | Marges internes |

### Timeline Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `TimeSeriesDataPoint[]` | **required** | Données temporelles |
| `width` | `number` | `800` | Largeur du graphique |
| `height` | `number` | `600` | Hauteur du graphique |
| `color` | `string` | `'#10b981'` | Couleur de la ligne |
| `lineWidth` | `number` | `2` | Épaisseur de la ligne |
| `maxPoints` | `number` | `1000` | Nombre max de points |
| `realtime` | `boolean` | `false` | Mode temps réel |
| `showGrid` | `boolean` | `true` | Afficher la grille |
| `showAxis` | `boolean` | `true` | Afficher les axes |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `padding` | `object` | `{ top: 40, right: 40, bottom: 60, left: 60 }` | Marges internes |

### Heatmap Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `HeatmapCell[]` | **required** | Données de la heatmap |
| `width` | `number` | `800` | Largeur du graphique |
| `height` | `number` | `600` | Hauteur du graphique |
| `showGrid` | `boolean` | `false` | Afficher la grille |
| `showAxis` | `boolean` | `true` | Afficher les axes |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `padding` | `object` | `{ top: 40, right: 40, bottom: 60, left: 60 }` | Marges internes |

## Types de Données

```typescript
// LineChart & général
interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

// BarChart
interface BarDataPoint {
  category: string;
  value: number;
  color?: string;
}

// Timeline
interface TimeSeriesDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

// Heatmap
interface HeatmapCell {
  x: number;
  y: number;
  value: number;
}
```

## Performance

### Optimisations

- ✅ **requestAnimationFrame** pour le rendu fluide
- ✅ **Dirty-flag rendering** - re-rendu uniquement si nécessaire
- ✅ **Viewport culling** - rendu uniquement des points visibles
- ✅ **Downsampling** - réduction automatique des données volumineuses
- ✅ **Canvas batching** - regroupement des opérations de dessin

### Support Temps Réel

- ✅ Streaming de données
- ✅ Buffers circulaires
- ✅ Fenêtres glissantes
- ✅ Trimming basé sur le temps
- ✅ Re-rendu partiel

## Scripts npm

| Commande | Description |
|----------|-------------|
| `npm run lint` | Analyse statique avec ESLint |
| `npm run build` | Compile la bibliothèque avec tsup |
| `npm run pub` | Build et publication sur GitHub Packages |

## Développement Local

```bash
npm install
npm run lint
npm run build
```

## Architecture Technique

### Compute Layer (D3 uniquement)

Modules D3 autorisés :
- ✅ `d3-scale` - Échelles et transformations
- ✅ `d3-array` - Opérations sur les tableaux
- ✅ `d3-shape` - Générateurs de formes

Modules D3 interdits :
- ❌ `d3-selection` - Manipulation du DOM
- ❌ `d3-transition` - Animations DOM

### Render Engine

**Canvas Renderer** (haute performance) :
- Rendu rapide pour grands datasets
- Animations fluides
- Pas d'interactivité native

**SVG Renderer** (interactivité) :
- Graphiques interactifs
- Détection de hover
- Accessibilité

### React Integration

Les composants React sont **légers** et ne contiennent pas de logique de rendu :
- Montage du renderer
- Passage des données
- Gestion du resize
- Connexion au store

## Cas d'Usage

- 📊 Tableaux de bord analytiques
- 📈 Systèmes de monitoring
- 🔍 Outils d'observabilité
- 🛡️ Tableaux de bord SIEM
- 📡 UI de streaming de données
- ⚡ Métriques temps réel
- 🏢 Plateformes d'entreprise

## Tests

Ce package ne fournit pas encore de suite de tests automatisés.

## Licence

ISC

## Auteur

@jeremiemeunier

## Repository

https://github.com/jeremiemeunier/windmill-components
