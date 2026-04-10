import { IGraphModel, GraphConfig, DataPoint } from '../types';
import { ScaleManager } from '../core/scale';
import { Projection } from '../core/projection';

export class LineModel implements IGraphModel<DataPoint> {
  data: DataPoint[];
  config: GraphConfig;

  constructor(data: DataPoint[], config: GraphConfig) {
    this.data = data;
    this.config = config;
  }

  compute(): { projectedPoints: DataPoint[]; projection: Projection } {
    const scaleManager = new ScaleManager();

    // Extract x and y values
    const xValues = this.data.map((d) => d.x);
    const yValues = this.data.map((d) => d.y);

    // Create scales
    const xScale = scaleManager.autoScale(xValues, this.config.viewport, 'x');
    const yScale = scaleManager.autoScale(yValues, this.config.viewport, 'y');

    // Create projection
    const projection = new Projection(xScale, yScale);

    // Project all points
    const projectedPoints = this.data.map((point) => ({
      x: projection.projectX(point.x),
      y: projection.projectY(point.y),
      label: point.label,
    }));

    return { projectedPoints, projection };
  }

  validate(): boolean {
    if (!Array.isArray(this.data)) return false;
    if (this.data.length === 0) return false;
    return this.data.every((point) => 
      typeof point.x === 'number' && 
      typeof point.y === 'number' &&
      !isNaN(point.x) &&
      !isNaN(point.y)
    );
  }

  addPoint(point: DataPoint): void {
    this.data.push(point);
  }

  updateData(data: DataPoint[]): void {
    this.data = data;
  }

  trimToWindow(maxPoints: number): void {
    if (this.data.length > maxPoints) {
      this.data = this.data.slice(-maxPoints);
    }
  }
}

export const createLineModel = (data: DataPoint[], config: GraphConfig) =>
  new LineModel(data, config);
