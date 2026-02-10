import { IGraphModel, GraphConfig, TimeSeriesDataPoint } from '../types';
import { ScaleManager } from '../core/scale';
import { Projection } from '../core/projection';

export class TimelineModel implements IGraphModel<TimeSeriesDataPoint> {
  data: TimeSeriesDataPoint[];
  config: GraphConfig;
  private maxPoints: number;

  constructor(data: TimeSeriesDataPoint[], config: GraphConfig, maxPoints: number = 1000) {
    this.data = data;
    this.config = config;
    this.maxPoints = maxPoints;
  }

  compute(): {
    projectedPoints: Array<{ x: number; y: number; label?: string }>;
    projection: Projection;
  } {
    const scaleManager = new ScaleManager();

    // Sort by timestamp
    const sortedData = [...this.data].sort((a, b) => a.timestamp - b.timestamp);

    // Extract timestamps and values
    const timestamps = sortedData.map((d) => d.timestamp);
    const values = sortedData.map((d) => d.value);

    // Create time-based x scale
    const xScale = scaleManager.createTimeScale(
      [new Date(Math.min(...timestamps)), new Date(Math.max(...timestamps))],
      scaleManager.computeRange(this.config.viewport, 'x')
    );
    const yScale = scaleManager.autoScale(values, this.config.viewport, 'y');

    // Create projection
    const projection = new Projection(xScale, yScale);

    // Project all points
    const projectedPoints = sortedData.map((point) => ({
      x: projection.projectX(point.timestamp),
      y: projection.projectY(point.value),
      label: point.label,
    }));

    return { projectedPoints, projection };
  }

  validate(): boolean {
    if (!Array.isArray(this.data)) return false;
    if (this.data.length === 0) return false;
    return this.data.every(
      (point) =>
        typeof point.timestamp === 'number' &&
        typeof point.value === 'number' &&
        !isNaN(point.timestamp) &&
        !isNaN(point.value)
    );
  }

  addPoint(point: TimeSeriesDataPoint): void {
    this.data.push(point);
    this.trimToWindow();
  }

  updateData(data: TimeSeriesDataPoint[]): void {
    this.data = data;
    this.trimToWindow();
  }

  private trimToWindow(): void {
    if (this.data.length > this.maxPoints) {
      this.data = this.data.slice(-this.maxPoints);
    }
  }

  getTimeRange(): [number, number] | null {
    if (this.data.length === 0) return null;
    const timestamps = this.data.map((d) => d.timestamp);
    return [Math.min(...timestamps), Math.max(...timestamps)];
  }
}

export const createTimelineModel = (
  data: TimeSeriesDataPoint[],
  config: GraphConfig,
  maxPoints?: number
) => new TimelineModel(data, config, maxPoints);
