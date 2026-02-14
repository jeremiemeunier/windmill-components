import { IGraphModel, GraphConfig, BarDataPoint } from '../types';
import { ScaleManager } from '../core/scale';
import { Projection } from '../core/projection';

export class BarModel implements IGraphModel<BarDataPoint> {
  data: BarDataPoint[];
  config: GraphConfig;

  constructor(data: BarDataPoint[], config: GraphConfig) {
    this.data = data;
    this.config = config;
  }

  compute(): {
    bars: Array<{ x: number; y: number; width: number; height: number; color?: string }>;
    projection: Projection;
  } {
    const scaleManager = new ScaleManager();

    // Extract categories and values
    const categories = this.data.map((d) => d.category);
    const values = this.data.map((d) => d.value);

    // Create scales
    const xScale = scaleManager.createBandScale(
      categories,
      scaleManager.computeRange(this.config.viewport, 'x'),
      0.2
    );
    const yScale = scaleManager.autoScale(values, this.config.viewport, 'y');

    // Create projection
    const projection = new Projection(xScale, yScale);

    // Compute bar positions and dimensions
    const baseY = this.config.viewport.height - this.config.viewport.padding.bottom;
    const bars = this.data.map((bar) => {
      const x = xScale(bar.category) ?? 0;
      const y = projection.projectY(bar.value);
      const width = xScale.bandwidth();
      const height = baseY - y;

      return {
        x,
        y,
        width,
        height,
        color: bar.color,
      };
    });

    return { bars, projection };
  }

  validate(): boolean {
    if (!Array.isArray(this.data)) return false;
    if (this.data.length === 0) return false;
    return this.data.every(
      (bar) =>
        typeof bar.category === 'string' &&
        typeof bar.value === 'number' &&
        !isNaN(bar.value)
    );
  }

  updateData(data: BarDataPoint[]): void {
    this.data = data;
  }
}

export const createBarModel = (data: BarDataPoint[], config: GraphConfig) =>
  new BarModel(data, config);
