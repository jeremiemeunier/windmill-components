import { IGraphModel, GraphConfig, DataPoint } from '../types';
import { ScaleManager } from '../core/scale';
import { Projection } from '../core/projection';
import { area, curveMonotoneX, Area } from 'd3-shape';

export class AreaModel implements IGraphModel<DataPoint> {
  data: DataPoint[];
  config: GraphConfig;

  constructor(data: DataPoint[], config: GraphConfig) {
    this.data = data;
    this.config = config;
  }

  compute(): { 
    projectedPoints: DataPoint[]; 
    areaPath: string;
    projection: Projection 
  } {
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

    // Create area path using d3-shape
    const baseY = this.config.viewport.height - this.config.viewport.padding.bottom;
    const areaGenerator = area<DataPoint>()
      .x((d) => d.x)
      .y0(baseY)
      .y1((d) => d.y)
      .curve(curveMonotoneX);

    const areaPath = areaGenerator(projectedPoints) || '';

    return { projectedPoints, areaPath, projection };
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

  updateData(data: DataPoint[]): void {
    this.data = data;
  }
}

export const createAreaModel = (data: DataPoint[], config: GraphConfig) =>
  new AreaModel(data, config);
