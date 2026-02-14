import { ILayout, Viewport, DataPoint, BarDataPoint } from '../types';

export class LineLayout implements ILayout {
  compute(data: DataPoint[], viewport: Viewport): DataPoint[] {
    // For line charts, we just pass through the data
    // The projection will handle the coordinate transformation
    return data;
  }
}

export class BarLayout implements ILayout {
  compute(data: BarDataPoint[], viewport: Viewport): BarDataPoint[] {
    // Bar layout calculation
    return data;
  }

  computeBarWidth(barCount: number, viewport: Viewport, padding: number = 0.1): number {
    const availableWidth = viewport.width - viewport.padding.left - viewport.padding.right;
    return (availableWidth / barCount) * (1 - padding);
  }
}

export class TimelineLayout implements ILayout {
  compute(data: DataPoint[], viewport: Viewport): DataPoint[] {
    // Timeline layout - handles time-based data
    return data.sort((a, b) => a.x - b.x);
  }
}

export class HeatmapLayout implements ILayout {
  compute(data: any[], viewport: Viewport): any[] {
    // Heatmap layout calculation
    return data;
  }

  computeCellSize(
    rows: number,
    cols: number,
    viewport: Viewport
  ): { width: number; height: number } {
    const availableWidth = viewport.width - viewport.padding.left - viewport.padding.right;
    const availableHeight = viewport.height - viewport.padding.top - viewport.padding.bottom;

    return {
      width: availableWidth / cols,
      height: availableHeight / rows,
    };
  }
}

export const createLineLayout = () => new LineLayout();
export const createBarLayout = () => new BarLayout();
export const createTimelineLayout = () => new TimelineLayout();
export const createHeatmapLayout = () => new HeatmapLayout();
