import { IGraphModel, GraphConfig } from '../types';

export interface DonutDataPoint {
  category: string;
  value: number;
  color?: string;
}

export class DonutModel implements IGraphModel<DonutDataPoint> {
  data: DonutDataPoint[];
  config: GraphConfig;

  constructor(data: DonutDataPoint[], config: GraphConfig) {
    this.data = data;
    this.config = config;
  }

  compute(): {
    segments: Array<{
      startAngle: number;
      endAngle: number;
      color: string;
      category: string;
      value: number;
      percentage: number;
    }>;
    centerX: number;
    centerY: number;
    outerRadius: number;
    innerRadius: number;
  } {
    const { viewport } = this.config;
    
    // Calculate center and radii
    const availableWidth = viewport.width - viewport.padding.left - viewport.padding.right;
    const availableHeight = viewport.height - viewport.padding.top - viewport.padding.bottom;
    const size = Math.min(availableWidth, availableHeight);
    
    const centerX = viewport.padding.left + availableWidth / 2;
    const centerY = viewport.padding.top + availableHeight / 2;
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.6; // 60% for donut hole

    // Calculate total and segments
    const total = this.data.reduce((sum, d) => sum + d.value, 0);
    
    const defaultColors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
      '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
    ];

    let currentAngle = -Math.PI / 2; // Start at top
    const segments = this.data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      currentAngle = endAngle;

      return {
        startAngle,
        endAngle,
        color: item.color || defaultColors[index % defaultColors.length],
        category: item.category,
        value: item.value,
        percentage,
      };
    });

    return {
      segments,
      centerX,
      centerY,
      outerRadius,
      innerRadius,
    };
  }

  validate(): boolean {
    if (!Array.isArray(this.data)) return false;
    if (this.data.length === 0) return false;
    return this.data.every(
      (item) =>
        typeof item.category === 'string' &&
        typeof item.value === 'number' &&
        !isNaN(item.value) &&
        item.value >= 0
    );
  }

  updateData(data: DonutDataPoint[]): void {
    this.data = data;
  }
}

export const createDonutModel = (data: DonutDataPoint[], config: GraphConfig) =>
  new DonutModel(data, config);
