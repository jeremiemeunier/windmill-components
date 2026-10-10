import { IGraphModel, GraphConfig, HeatmapCell } from '../types';
import { ScaleManager } from '../core/scale';
import { interpolateViridis } from 'd3-scale-chromatic';

export class HeatmapModel implements IGraphModel<HeatmapCell> {
  data: HeatmapCell[];
  config: GraphConfig;

  constructor(data: HeatmapCell[], config: GraphConfig) {
    this.data = data;
    this.config = config;
  }

  compute(): {
    cells: Array<{ x: number; y: number; width: number; height: number; color: string }>;
  } {
    // Find grid dimensions
    const xValues = [...new Set(this.data.map((d) => d.x))].sort((a, b) => a - b);
    const yValues = [...new Set(this.data.map((d) => d.y))].sort((a, b) => a - b);

    // Build index maps for O(1) lookups
    const xIndexMap = new Map<number, number>();
    const yIndexMap = new Map<number, number>();
    xValues.forEach((val, idx) => xIndexMap.set(val, idx));
    yValues.forEach((val, idx) => yIndexMap.set(val, idx));

    // Calculate cell dimensions
    const availableWidth =
      this.config.viewport.width -
      this.config.viewport.padding.left -
      this.config.viewport.padding.right;
    const availableHeight =
      this.config.viewport.height -
      this.config.viewport.padding.top -
      this.config.viewport.padding.bottom;

    const cellWidth = availableWidth / xValues.length;
    const cellHeight = availableHeight / yValues.length;

    // Find value range for color mapping
    const values = this.data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Map data to cells with colors
    const cells = this.data.map((cell) => {
      const xIndex = xIndexMap.get(cell.x) ?? 0;
      const yIndex = yIndexMap.get(cell.y) ?? 0;

      const x = this.config.viewport.padding.left + xIndex * cellWidth;
      const y = this.config.viewport.padding.top + yIndex * cellHeight;

      // Normalize value to 0-1 for color scale
      const normalizedValue = maxValue > minValue
        ? (cell.value - minValue) / (maxValue - minValue)
        : 0.5;

      const color = interpolateViridis(normalizedValue);

      return {
        x,
        y,
        width: cellWidth,
        height: cellHeight,
        color,
      };
    });

    return { cells };
  }

  validate(): boolean {
    if (!Array.isArray(this.data)) return false;
    if (this.data.length === 0) return false;
    return this.data.every(
      (cell) =>
        typeof cell.x === 'number' &&
        typeof cell.y === 'number' &&
        typeof cell.value === 'number' &&
        !isNaN(cell.x) &&
        !isNaN(cell.y) &&
        !isNaN(cell.value)
    );
  }

  updateData(data: HeatmapCell[]): void {
    this.data = data;
  }
}

export const createHeatmapModel = (data: HeatmapCell[], config: GraphConfig) =>
  new HeatmapModel(data, config);
