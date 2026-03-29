# Examples

This directory contains usage examples for the @jeremiemeunier/graph library.

## Basic Usage Examples

### LineChart Example

```tsx
import { LineChart } from '@jeremiemeunier/graph';

function MyLineChart() {
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
    { x: 3, y: 30 },
    { x: 4, y: 25 },
    { x: 5, y: 40 },
  ];

  return (
    <LineChart
      data={data}
      width={800}
      height={400}
      color="#3b82f6"
      lineWidth={2}
      showGrid={true}
      showAxis={true}
      backgroundColor="#ffffff"
    />
  );
}
```

### BarChart Example

```tsx
import { BarChart } from '@jeremiemeunier/graph';

function MyBarChart() {
  const data = [
    { category: 'Jan', value: 30, color: '#3b82f6' },
    { category: 'Feb', value: 50, color: '#10b981' },
    { category: 'Mar', value: 20, color: '#f59e0b' },
    { category: 'Apr', value: 40, color: '#ef4444' },
    { category: 'May', value: 60, color: '#8b5cf6' },
  ];

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

### Timeline Example (Real-time)

```tsx
import { Timeline } from '@jeremiemeunier/graph';
import { useState, useEffect } from 'react';

function MyTimeline() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData(prev => [
        ...prev,
        {
          timestamp: Date.now(),
          value: Math.random() * 100,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Timeline
      data={data}
      width={800}
      height={400}
      color="#10b981"
      maxPoints={100}
      showGrid={true}
      showAxis={true}
    />
  );
}
```

### Heatmap Example

```tsx
import { Heatmap } from '@jeremiemeunier/graph';

function MyHeatmap() {
  // Generate a 10x10 heatmap
  const data = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      data.push({
        x,
        y,
        value: Math.random() * 100,
      });
    }
  }

  return (
    <Heatmap
      data={data}
      width={800}
      height={600}
      showGrid={false}
      showAxis={true}
    />
  );
}
```

## Advanced Usage

### Using the Core Engine Directly

```tsx
import {
  createGraphEngine,
  createCanvasRenderer,
  createLineModel,
} from '@jeremiemeunier/graph';
import { useEffect, useRef } from 'react';

function CustomChart() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create engine
    const engine = createGraphEngine({
      viewport: {
        width: 800,
        height: 600,
        padding: { top: 40, right: 40, bottom: 60, left: 60 },
      },
      showGrid: true,
      showAxis: true,
      backgroundColor: '#ffffff',
    });

    // Create and attach renderer
    const renderer = createCanvasRenderer(canvas);
    engine.setRenderer(renderer);

    engineRef.current = engine;

    return () => {
      engine.destroy();
    };
  }, []);

  useEffect(() => {
    if (!engineRef.current) return;

    const data = [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
    ];

    const model = createLineModel(data, engineRef.current.getConfig());
    const { projectedPoints } = model.compute();

    engineRef.current.render(projectedPoints);
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
```

### Using Zustand Store

```tsx
import { useGraphStore } from '@jeremiemeunier/graph';

function MyDashboard() {
  const {
    setDataset,
    getDataset,
    setViewport,
    setZoom,
  } = useGraphStore();

  useEffect(() => {
    // Set initial data
    setDataset('sales', [
      { x: 0, y: 100 },
      { x: 1, y: 150 },
      { x: 2, y: 120 },
    ]);

    // Configure viewport
    setViewport({
      width: 1000,
      height: 600,
      padding: { top: 40, right: 40, bottom: 60, left: 60 },
    });

    // Set zoom level
    setZoom(1.5);
  }, []);

  const salesData = getDataset('sales');

  return (
    <div>
      <LineChart data={salesData} />
    </div>
  );
}
```

### Multi-Chart Dashboard

```tsx
import { LineChart, BarChart, Timeline, Heatmap } from '@jeremiemeunier/graph';

function Dashboard() {
  const lineData = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
  ];

  const barData = [
    { category: 'A', value: 30 },
    { category: 'B', value: 50 },
    { category: 'C', value: 20 },
  ];

  const timelineData = [
    { timestamp: Date.now() - 3600000, value: 100 },
    { timestamp: Date.now() - 1800000, value: 150 },
    { timestamp: Date.now(), value: 200 },
  ];

  const heatmapData = [];
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      heatmapData.push({ x, y, value: Math.random() * 100 });
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <LineChart data={lineData} width={400} height={300} />
      <BarChart data={barData} width={400} height={300} />
      <Timeline data={timelineData} width={400} height={300} />
      <Heatmap data={heatmapData} width={400} height={300} />
    </div>
  );
}
```

## Performance Optimization

### Data Downsampling

```tsx
import { createComputeEngine } from '@jeremiemeunier/graph';

function OptimizedChart({ largeDataset }) {
  const computeEngine = createComputeEngine();
  
  // Downsample to 500 points for better performance
  const sampledData = computeEngine.downsample(largeDataset, 500);

  return <LineChart data={sampledData} />;
}
```

### Viewport Culling

```tsx
import { createComputeEngine, createProjection } from '@jeremiemeunier/graph';

function CulledChart({ data, viewport, projection }) {
  const computeEngine = createComputeEngine();
  
  // Only render points within viewport
  const visibleData = computeEngine.viewportCull(data, viewport, projection);

  return <LineChart data={visibleData} />;
}
```

### AreaChart Example

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

function MyAreaChart() {
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
    { x: 3, y: 30 },
    { x: 4, y: 25 },
    { x: 5, y: 40 },
  ];

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

### DonutChart Example

```tsx
import { DonutChart } from '@jeremiemeunier/graph';

function MyDonutChart() {
  const data = [
    { category: 'Sales', value: 45, color: '#3b82f6' },
    { category: 'Marketing', value: 25, color: '#10b981' },
    { category: 'Operations', value: 20, color: '#f59e0b' },
    { category: 'R&D', value: 10, color: '#ef4444' },
  ];

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

### ScatterChart Example

```tsx
import { ScatterChart } from '@jeremiemeunier/graph';

function MyScatterChart() {
  const data = Array.from({ length: 50 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

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

## Tremor-Style Examples

All charts follow Tremor models and logic while strictly respecting `specs.md` architecture:

### Analytics Dashboard

```tsx
import {
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  ScatterChart,
} from '@jeremiemeunier/graph';

function TremorDashboard() {
  const salesData = [
    { x: 1, y: 2890 },
    { x: 2, y: 2756 },
    { x: 3, y: 3322 },
    { x: 4, y: 3470 },
    { x: 5, y: 3475 },
  ];

  const categoryData = [
    { category: 'Direct', value: 4890 },
    { category: 'Referral', value: 2103 },
    { category: 'Social', value: 2050 },
    { category: 'Organic', value: 1300 },
  ];

  const distributionData = [
    { category: 'North America', value: 40 },
    { category: 'Europe', value: 30 },
    { category: 'Asia', value: 20 },
    { category: 'Others', value: 10 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <div>
        <h3>Revenue Trend</h3>
        <AreaChart
          data={salesData}
          width={600}
          height={300}
          color="#3b82f6"
          fillOpacity={0.2}
        />
      </div>
      <div>
        <h3>Traffic Sources</h3>
        <DonutChart
          data={distributionData}
          width={300}
          height={300}
          showLegend={true}
        />
      </div>
      <div>
        <h3>Monthly Performance</h3>
        <BarChart
          data={categoryData}
          width={600}
          height={300}
        />
      </div>
    </div>
  );
}
```

## Tremor Data Format

### Using Tremor-style data with index and categories

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

function TremorExample() {
  // Tremor data format - flexible object structure
  const chartData = [
    { month: 'Jan', sales: 2890, revenue: 3200, costs: 2100 },
    { month: 'Feb', sales: 2756, revenue: 3100, costs: 2200 },
    { month: 'Mar', sales: 3322, revenue: 3800, costs: 2400 },
    { month: 'Apr', sales: 3470, revenue: 4000, costs: 2600 },
    { month: 'May', sales: 3475, revenue: 4100, costs: 2700 },
    { month: 'Jun', sales: 3129, revenue: 3600, costs: 2300 },
  ];

  return (
    <div>
      <h3>Sales & Revenue Trend</h3>
      <AreaChart
        tremorData={chartData}
        index="month"
        categories={['sales', 'revenue']}
        colors={['#3b82f6', '#10b981']}
        width={800}
        height={400}
        showGrid={true}
        showAxis={true}
      />
    </div>
  );
}
```

### Multiple Series with Tremor Format

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

function MultiSeriesExample() {
  const data = [
    { date: '2024-01', desktop: 186, mobile: 80, tablet: 45 },
    { date: '2024-02', desktop: 305, mobile: 200, tablet: 98 },
    { date: '2024-03', desktop: 237, mobile: 120, tablet: 86 },
    { date: '2024-04', desktop: 273, mobile: 190, tablet: 105 },
    { date: '2024-05', desktop: 209, mobile: 130, tablet: 92 },
  ];

  return (
    <AreaChart
      tremorData={data}
      index="date"
      categories={['desktop', 'mobile', 'tablet']}
      colors={['#3b82f6', '#10b981', '#f59e0b']}
      width={900}
      height={500}
      fillOpacity={0.25}
    />
  );
}
```

### Gradient Area Chart

```tsx
import { AreaChart } from '@jeremiemeunier/graph';

function GradientExample() {
  const data = [
    { x: 0, y: 20 },
    { x: 1, y: 45 },
    { x: 2, y: 28 },
    { x: 3, y: 80 },
    { x: 4, y: 65 },
    { x: 5, y: 95 },
  ];

  return (
    <div>
      <h3>Performance with Gradient</h3>
      <AreaChart
        data={data}
        width={800}
        height={400}
        showGradient={true}
        gradientFrom="#3b82f6"
        gradientTo="#8b5cf6"
        fillOpacity={0.5}
        lineWidth={3}
      />
    </div>
  );
}
```

### Complete Dashboard with Tremor Data

```tsx
import { AreaChart, BarChart, DonutChart } from '@jeremiemeunier/graph';

function TremorDashboard() {
  const timeSeriesData = [
    { month: 'Jan', value: 2890 },
    { month: 'Feb', value: 2756 },
    { month: 'Mar', value: 3322 },
    { month: 'Apr', value: 3470 },
    { month: 'May', value: 3475 },
  ];

  const categoryData = [
    { name: 'Direct', value: 4890 },
    { name: 'Referral', value: 2103 },
    { name: 'Social', value: 2050 },
    { name: 'Organic', value: 1300 },
  ];

  const distributionData = [
    { category: 'North America', value: 40 },
    { category: 'Europe', value: 30 },
    { category: 'Asia', value: 20 },
    { category: 'Others', value: 10 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', padding: '20px' }}>
      <div>
        <h3>Revenue Trend (Tremor Format)</h3>
        <AreaChart
          tremorData={timeSeriesData}
          index="month"
          categories={['value']}
          colors={['#3b82f6']}
          width={600}
          height={300}
          showGradient={true}
          gradientFrom="#3b82f6"
          gradientTo="#60a5fa"
          fillOpacity={0.3}
        />
      </div>
      
      <div>
        <h3>Traffic Sources</h3>
        <DonutChart
          data={distributionData}
          width={300}
          height={300}
          showLegend={true}
        />
      </div>
      
      <div style={{ gridColumn: '1 / -1' }}>
        <h3>Channel Performance</h3>
        <BarChart
          data={categoryData}
          width={800}
          height={300}
        />
      </div>
    </div>
  );
}
```

## Key Features of Tremor Data Format

**Flexible Data Structure:**
- Use any property names for your data
- `index`: Specify which property to use as X-axis
- `categories`: Array of property names to visualize as series

**Benefits:**
- Natural data format (no transformation needed)
- Multiple series from single dataset
- Type-safe with TypeScript
- Gradient support for visual appeal
- Compatible with specs.md architecture

**Conversion:**
The library automatically converts Tremor format to internal format using `convertTremorData` utility, which you can also use directly:

```tsx
import { convertTremorData } from '@jeremiemeunier/graph';

const tremorData = [
  { month: 'Jan', sales: 100, costs: 80 },
  { month: 'Feb', sales: 150, costs: 90 },
];

const converted = convertTremorData(tremorData, 'month', ['sales', 'costs']);
// Returns: [[{x: 0, y: 100, label: 'Jan'}, ...], [{x: 0, y: 80, label: 'Jan'}, ...]]
```
