import { IRenderer, GraphConfig, DataPoint } from '../types';

export class CanvasRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastConfig: GraphConfig | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.ctx = context;
  }

  clear(config?: GraphConfig): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Prefer the explicitly provided config, fall back to the last one used
    const bgColor = config?.backgroundColor ?? this.lastConfig?.backgroundColor;

    if (bgColor) {
      this.ctx.fillStyle = bgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    if (config) {
      this.lastConfig = config;
    }
  }

  render(data: any, config: GraphConfig): void {
    this.lastConfig = config;
    
    // Draw grid if enabled
    if (config.showGrid) {
      this.drawGrid(config);
    }

    // Draw axis if enabled
    if (config.showAxis) {
      this.drawAxis(config);
    }
  }

  drawLine(points: DataPoint[], color: string = '#3b82f6', lineWidth: number = 2): void {
    if (points.length < 2) return;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }

    this.ctx.stroke();
  }

  drawBars(bars: Array<{ x: number; y: number; width: number; height: number; color?: string }>): void {
    bars.forEach((bar) => {
      this.ctx.fillStyle = bar.color || '#3b82f6';
      this.ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
    });
  }

  drawPoints(points: DataPoint[], color: string = '#3b82f6', radius: number = 3): void {
    points.forEach((point) => {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }

  drawHeatmap(cells: Array<{ x: number; y: number; width: number; height: number; color: string }>): void {
    cells.forEach((cell) => {
      this.ctx.fillStyle = cell.color;
      this.ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
    });
  }

  drawArea(areaPath: string, color: string = '#3b82f6', opacity: number = 0.3): void {
    const path = new Path2D(areaPath);
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.fill(path);
    this.ctx.globalAlpha = 1.0;
  }

  drawDonut(segments: Array<{
    startAngle: number;
    endAngle: number;
    color: string;
  }>, centerX: number, centerY: number, outerRadius: number, innerRadius: number): void {
    segments.forEach((segment) => {
      this.ctx.fillStyle = segment.color;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, outerRadius, segment.startAngle, segment.endAngle);
      this.ctx.arc(centerX, centerY, innerRadius, segment.endAngle, segment.startAngle, true);
      this.ctx.closePath();
      this.ctx.fill();
    });
  }

  private drawGrid(config: GraphConfig): void {
    const { viewport, gridColor = '#e5e7eb' } = config;
    const gridSpacing = 50;

    this.ctx.strokeStyle = gridColor;
    this.ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = viewport.padding.left; x < viewport.width - viewport.padding.right; x += gridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, viewport.padding.top);
      this.ctx.lineTo(x, viewport.height - viewport.padding.bottom);
      this.ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = viewport.padding.top; y < viewport.height - viewport.padding.bottom; y += gridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(viewport.padding.left, y);
      this.ctx.lineTo(viewport.width - viewport.padding.right, y);
      this.ctx.stroke();
    }
  }

  private drawAxis(config: GraphConfig): void {
    const { viewport, axisColor = '#374151' } = config;

    this.ctx.strokeStyle = axisColor;
    this.ctx.lineWidth = 2;

    // X-axis
    this.ctx.beginPath();
    this.ctx.moveTo(viewport.padding.left, viewport.height - viewport.padding.bottom);
    this.ctx.lineTo(viewport.width - viewport.padding.right, viewport.height - viewport.padding.bottom);
    this.ctx.stroke();

    // Y-axis
    this.ctx.beginPath();
    this.ctx.moveTo(viewport.padding.left, viewport.padding.top);
    this.ctx.lineTo(viewport.padding.left, viewport.height - viewport.padding.bottom);
    this.ctx.stroke();
  }

  drawText(text: string, x: number, y: number, options?: {
    color?: string;
    font?: string;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
  }): void {
    this.ctx.fillStyle = options?.color || '#000000';
    this.ctx.font = options?.font || '12px sans-serif';
    this.ctx.textAlign = options?.align || 'left';
    this.ctx.textBaseline = options?.baseline || 'alphabetic';
    this.ctx.fillText(text, x, y);
  }

  destroy(): void {
    this.clear();
  }
}

export const createCanvasRenderer = (canvas: HTMLCanvasElement) => new CanvasRenderer(canvas);
