import { GraphConfig, IRenderer, Viewport } from '../types';
import { ScaleManager } from './scale';
import { Projection } from './projection';

export class GraphEngine {
  private scaleManager: ScaleManager;
  private renderer: IRenderer | null = null;
  private config: GraphConfig;
  private animationFrameId: number | null = null;
  private isDirty: boolean = true;

  constructor(config: GraphConfig) {
    this.config = config;
    this.scaleManager = new ScaleManager();
  }

  setRenderer(renderer: IRenderer) {
    this.renderer = renderer;
  }

  setConfig(config: Partial<GraphConfig>) {
    this.config = { ...this.config, ...config };
    this.markDirty();
  }

  getConfig(): GraphConfig {
    return this.config;
  }

  getScaleManager(): ScaleManager {
    return this.scaleManager;
  }

  markDirty() {
    this.isDirty = true;
  }

  render(data: any) {
    if (!this.renderer) {
      console.warn('No renderer attached to engine');
      return;
    }

    if (this.isDirty) {
      this.renderer.clear();
      this.renderer.render(data, this.config);
      this.isDirty = false;
    }
  }

  startRenderLoop(dataProvider: () => any) {
    const loop = () => {
      this.markDirty();
      this.render(dataProvider());
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  stopRenderLoop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resize(viewport: Viewport) {
    this.config.viewport = viewport;
    this.markDirty();
  }

  destroy() {
    this.stopRenderLoop();
    if (this.renderer) {
      this.renderer.destroy();
    }
  }
}

export class ComputeEngine {
  computeStats(data: number[]): {
    min: number;
    max: number;
    mean: number;
    median: number;
  } {
    if (!data || data.length === 0) {
      return {
        min: 0,
        max: 0,
        mean: 0,
        median: 0,
      };
    }

    const sorted = [...data].sort((a, b) => a - b);
    const sum = data.reduce((acc, val) => acc + val, 0);
    const len = sorted.length;
    const middle = Math.floor(len / 2);

    let median: number;
    if (len % 2 === 0) {
      median = (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      median = sorted[middle];
    }

    return {
      min: sorted[0],
      max: sorted[len - 1],
      mean: sum / len,
      median,
    };
  }

  downsample(data: any[], targetPoints: number): any[] {
    if (data.length <= targetPoints) return data;

    const step = data.length / targetPoints;
    const result: any[] = [];

    for (let i = 0; i < targetPoints; i++) {
      const index = Math.floor(i * step);
      result.push(data[index]);
    }

    return result;
  }

  viewportCull<T extends { x: number; y: number }>(
    data: T[],
    viewport: Viewport,
    projection: Projection
  ): T[] {
    return data.filter((point) => {
      const px = projection.projectX(point.x);
      const py = projection.projectY(point.y);

      return (
        px >= viewport.padding.left &&
        px <= viewport.width - viewport.padding.right &&
        py >= viewport.padding.top &&
        py <= viewport.height - viewport.padding.bottom
      );
    });
  }
}

export const createGraphEngine = (config: GraphConfig) => new GraphEngine(config);
export const createComputeEngine = () => new ComputeEngine();
