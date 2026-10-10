import { scaleLinear, scaleTime, scaleBand, ScaleLinear, ScaleTime, ScaleBand } from 'd3-scale';
import { extent } from 'd3-array';
import { Viewport } from '../types';

export class ScaleManager {
  private xScale: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string> | null = null;
  private yScale: ScaleLinear<number, number> | null = null;

  createLinearScale(
    domain: [number, number],
    range: [number, number]
  ): ScaleLinear<number, number> {
    return scaleLinear().domain(domain).range(range);
  }

  createTimeScale(
    domain: [Date, Date] | [number, number],
    range: [number, number]
  ): ScaleTime<number, number> {
    return scaleTime().domain(domain).range(range);
  }

  createBandScale(
    domain: string[],
    range: [number, number],
    padding: number = 0.1
  ): ScaleBand<string> {
    return scaleBand().domain(domain).range(range).padding(padding);
  }

  setXScale(scale: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string>) {
    this.xScale = scale;
  }

  setYScale(scale: ScaleLinear<number, number>) {
    this.yScale = scale;
  }

  getXScale() {
    return this.xScale;
  }

  getYScale() {
    return this.yScale;
  }

  computeDomain(data: number[]): [number, number] {
    const [min, max] = extent(data) as [number, number];
    return [min ?? 0, max ?? 0];
  }

  computeRange(viewport: Viewport, axis: 'x' | 'y'): [number, number] {
    if (axis === 'x') {
      return [viewport.padding.left, viewport.width - viewport.padding.right];
    } else {
      return [viewport.height - viewport.padding.bottom, viewport.padding.top];
    }
  }

  autoScale(
    data: number[],
    viewport: Viewport,
    axis: 'x' | 'y'
  ): ScaleLinear<number, number> {
    const domain = this.computeDomain(data);
    const range = this.computeRange(viewport, axis);
    return this.createLinearScale(domain, range);
  }
}

export const createScaleManager = () => new ScaleManager();
