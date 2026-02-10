import { IRenderer, GraphConfig, DataPoint } from '../types';

export class SVGRenderer implements IRenderer {
  private svg: SVGSVGElement;
  private mainGroup: SVGGElement;

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
    this.mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg.appendChild(this.mainGroup);
  }

  clear(): void {
    while (this.mainGroup.firstChild) {
      this.mainGroup.removeChild(this.mainGroup.firstChild);
    }
  }

  render(data: any, config: GraphConfig): void {
    // Draw background
    if (config.backgroundColor) {
      const rect = this.createSVGElement('rect', {
        x: '0',
        y: '0',
        width: config.viewport.width.toString(),
        height: config.viewport.height.toString(),
        fill: config.backgroundColor,
      });
      this.mainGroup.appendChild(rect);
    }

    // Draw grid if enabled
    if (config.showGrid) {
      this.drawGrid(config);
    }

    // Draw axis if enabled
    if (config.showAxis) {
      this.drawAxis(config);
    }
  }

  drawLine(points: DataPoint[], color: string = '#3b82f6', lineWidth: number = 2): SVGPathElement {
    if (points.length < 2) {
      return this.createSVGElement('path', {}) as SVGPathElement;
    }

    const pathData = points
      .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    const path = this.createSVGElement('path', {
      d: pathData,
      stroke: color,
      'stroke-width': lineWidth.toString(),
      fill: 'none',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    });

    this.mainGroup.appendChild(path);
    return path as SVGPathElement;
  }

  drawBars(bars: Array<{ x: number; y: number; width: number; height: number; color?: string }>): SVGGElement {
    const group = this.createSVGElement('g', { class: 'bars' });

    bars.forEach((bar, index) => {
      const rect = this.createSVGElement('rect', {
        x: bar.x.toString(),
        y: bar.y.toString(),
        width: bar.width.toString(),
        height: bar.height.toString(),
        fill: bar.color || '#3b82f6',
        'data-index': index.toString(),
      });
      group.appendChild(rect);
    });

    this.mainGroup.appendChild(group);
    return group as SVGGElement;
  }

  drawPoints(points: DataPoint[], color: string = '#3b82f6', radius: number = 3): SVGGElement {
    const group = this.createSVGElement('g', { class: 'points' });

    points.forEach((point, index) => {
      const circle = this.createSVGElement('circle', {
        cx: point.x.toString(),
        cy: point.y.toString(),
        r: radius.toString(),
        fill: color,
        'data-index': index.toString(),
      });
      group.appendChild(circle);
    });

    this.mainGroup.appendChild(group);
    return group as SVGGElement;
  }

  drawHeatmap(cells: Array<{ x: number; y: number; width: number; height: number; color: string }>): SVGGElement {
    const group = this.createSVGElement('g', { class: 'heatmap' });

    cells.forEach((cell) => {
      const rect = this.createSVGElement('rect', {
        x: cell.x.toString(),
        y: cell.y.toString(),
        width: cell.width.toString(),
        height: cell.height.toString(),
        fill: cell.color,
      });
      group.appendChild(rect);
    });

    this.mainGroup.appendChild(group);
    return group as SVGGElement;
  }

  private drawGrid(config: GraphConfig): void {
    const { viewport, gridColor = '#e5e7eb' } = config;
    const gridSpacing = 50;
    const gridGroup = this.createSVGElement('g', { class: 'grid' });

    // Vertical grid lines
    for (let x = viewport.padding.left; x < viewport.width - viewport.padding.right; x += gridSpacing) {
      const line = this.createSVGElement('line', {
        x1: x.toString(),
        y1: viewport.padding.top.toString(),
        x2: x.toString(),
        y2: (viewport.height - viewport.padding.bottom).toString(),
        stroke: gridColor,
        'stroke-width': '1',
      });
      gridGroup.appendChild(line);
    }

    // Horizontal grid lines
    for (let y = viewport.padding.top; y < viewport.height - viewport.padding.bottom; y += gridSpacing) {
      const line = this.createSVGElement('line', {
        x1: viewport.padding.left.toString(),
        y1: y.toString(),
        x2: (viewport.width - viewport.padding.right).toString(),
        y2: y.toString(),
        stroke: gridColor,
        'stroke-width': '1',
      });
      gridGroup.appendChild(line);
    }

    this.mainGroup.appendChild(gridGroup);
  }

  private drawAxis(config: GraphConfig): void {
    const { viewport, axisColor = '#374151' } = config;
    const axisGroup = this.createSVGElement('g', { class: 'axis' });

    // X-axis
    const xAxis = this.createSVGElement('line', {
      x1: viewport.padding.left.toString(),
      y1: (viewport.height - viewport.padding.bottom).toString(),
      x2: (viewport.width - viewport.padding.right).toString(),
      y2: (viewport.height - viewport.padding.bottom).toString(),
      stroke: axisColor,
      'stroke-width': '2',
    });
    axisGroup.appendChild(xAxis);

    // Y-axis
    const yAxis = this.createSVGElement('line', {
      x1: viewport.padding.left.toString(),
      y1: viewport.padding.top.toString(),
      x2: viewport.padding.left.toString(),
      y2: (viewport.height - viewport.padding.bottom).toString(),
      stroke: axisColor,
      'stroke-width': '2',
    });
    axisGroup.appendChild(yAxis);

    this.mainGroup.appendChild(axisGroup);
  }

  drawText(text: string, x: number, y: number, options?: {
    color?: string;
    fontSize?: number;
    anchor?: string;
  }): SVGTextElement {
    const textElement = this.createSVGElement('text', {
      x: x.toString(),
      y: y.toString(),
      fill: options?.color || '#000000',
      'font-size': (options?.fontSize || 12).toString(),
      'text-anchor': options?.anchor || 'start',
    });
    textElement.textContent = text;
    this.mainGroup.appendChild(textElement);
    return textElement as SVGTextElement;
  }

  private createSVGElement(tagName: string, attributes: Record<string, string>): SVGElement {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
  }

  destroy(): void {
    this.clear();
    if (this.mainGroup.parentNode) {
      this.mainGroup.parentNode.removeChild(this.mainGroup);
    }
  }
}

export const createSVGRenderer = (svg: SVGSVGElement) => new SVGRenderer(svg);
