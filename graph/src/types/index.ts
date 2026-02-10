export interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface TimeSeriesDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

export interface BarDataPoint {
  category: string;
  value: number;
  color?: string;
}

export interface HeatmapCell {
  x: number;
  y: number;
  value: number;
}

export interface Viewport {
  width: number;
  height: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface Domain {
  x: [number, number];
  y: [number, number];
}

export interface GraphConfig {
  viewport: Viewport;
  domain?: Domain;
  colors?: string[];
  backgroundColor?: string;
  gridColor?: string;
  axisColor?: string;
  lineWidth?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  animate?: boolean;
}

export type RendererType = 'canvas' | 'svg' | 'webgl';

export interface IRenderer {
  clear(): void;
  render(data: any, config: GraphConfig): void;
  destroy(): void;
}

export interface IProjection {
  projectX(value: number): number;
  projectY(value: number): number;
  unprojectX(pixel: number): number;
  unprojectY(pixel: number): number;
}

export interface ILayout {
  compute(data: any[], viewport: Viewport): any[];
}

export interface IGraphModel<T = any> {
  data: T[];
  config: GraphConfig;
  compute(): any;
  validate(): boolean;
}

export interface GraphState {
  datasets: Map<string, any[]>;
  viewport: Viewport;
  timeRange?: [number, number];
  filters?: Record<string, any>;
  zoom: number;
  isDirty: boolean;
}
