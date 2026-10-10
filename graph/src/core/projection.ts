import { ScaleLinear, ScaleTime, ScaleBand } from 'd3-scale';
import { IProjection } from '../types';

export class Projection implements IProjection {
  private xScale: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string>;
  private yScale: ScaleLinear<number, number>;

  constructor(
    xScale: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string>,
    yScale: ScaleLinear<number, number>
  ) {
    this.xScale = xScale;
    this.yScale = yScale;
  }

  projectX(value: number | string): number {
    if (typeof value === 'string' && 'bandwidth' in this.xScale) {
      const pos = this.xScale(value);
      const bandwidth = this.xScale.bandwidth();
      return (pos ?? 0) + bandwidth / 2;
    }
    return (this.xScale as ScaleLinear<number, number> | ScaleTime<number, number>)(value as number) ?? 0;
  }

  projectY(value: number): number {
    return this.yScale(value) ?? 0;
  }

  unprojectX(pixel: number): number {
    if ('invert' in this.xScale && typeof this.xScale.invert === 'function') {
      const result = this.xScale.invert(pixel);
      return result instanceof Date ? result.getTime() : result;
    }
    return pixel;
  }

  unprojectY(pixel: number): number {
    return this.yScale.invert(pixel);
  }

  project(x: number | string, y: number): { x: number; y: number } {
    return {
      x: this.projectX(x),
      y: this.projectY(y),
    };
  }

  unproject(px: number, py: number): { x: number; y: number } {
    return {
      x: this.unprojectX(px),
      y: this.unprojectY(py),
    };
  }
}

export const createProjection = (
  xScale: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string>,
  yScale: ScaleLinear<number, number>
) => new Projection(xScale, yScale);
