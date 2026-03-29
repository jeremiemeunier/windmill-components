import { IRenderer, GraphConfig, DataPoint } from '../types';

export class SVGRenderer implements IRenderer {
  private svg: SVGSVGElement;
  private mainGroup: SVGGElement;
  private lastConfig: GraphConfig | null = null;
  private defs: SVGDefsElement;
  private gradientCounter: number = 0;

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
    this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this.svg.appendChild(this.defs);
    this.mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg.appendChild(this.mainGroup);
  }

  clear(config?: GraphConfig): void {
    while (this.mainGroup.firstChild) {
      this.mainGroup.removeChild(this.mainGroup.firstChild);
    }
    
    // Clear gradients
    while (this.defs.firstChild) {
      this.defs.removeChild(this.defs.firstChild);
    }
    this.gradientCounter = 0;
    
    if (config) {
      this.lastConfig = config;
    }
  }

  render(data: any, config: GraphConfig): void {
    this.lastConfig = config;
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

  drawArea(areaPath: string, color: string = '#3b82f6', opacity: number = 0.3): SVGPathElement {
    const path = this.createSVGElement('path', {
      d: areaPath,
      fill: color,
      'fill-opacity': opacity.toString(),
      stroke: 'none',
    }) as SVGPathElement;

    this.mainGroup.appendChild(path);
    return path;
  }

  drawDonut(segments: Array<{
    startAngle: number;
    endAngle: number;
    color: string;
  }>, centerX: number, centerY: number, outerRadius: number, innerRadius: number): SVGGElement {
    const group = this.createSVGElement('g', { class: 'donut' });

    segments.forEach((segment) => {
      const path = this.createDonutSegmentPath(
        centerX,
        centerY,
        innerRadius,
        outerRadius,
        segment.startAngle,
        segment.endAngle
      );

      const pathElement = this.createSVGElement('path', {
        d: path,
        fill: segment.color,
      });
      group.appendChild(pathElement);
    });

    this.mainGroup.appendChild(group);
    return group as SVGGElement;
  }

  private createDonutSegmentPath(
    centerX: number,
    centerY: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
  ): string {
    const x1 = centerX + outerRadius * Math.cos(startAngle);
    const y1 = centerY + outerRadius * Math.sin(startAngle);
    const x2 = centerX + outerRadius * Math.cos(endAngle);
    const y2 = centerY + outerRadius * Math.sin(endAngle);
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');
  }

  createGradient(fromColor: string, toColor: string, x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 1): string {
    const gradientId = `gradient-${this.gradientCounter++}`;
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', gradientId);
    gradient.setAttribute('x1', x1.toString());
    gradient.setAttribute('y1', y1.toString());
    gradient.setAttribute('x2', x2.toString());
    gradient.setAttribute('y2', y2.toString());

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', fromColor);
    gradient.appendChild(stop1);

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', toColor);
    gradient.appendChild(stop2);

    this.defs.appendChild(gradient);
    return `url(#${gradientId})`;
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
