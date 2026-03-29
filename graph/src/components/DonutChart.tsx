import React, { useEffect, useRef } from 'react';
import { GraphConfig } from '../types';
import { DonutDataPoint, createDonutModel } from '../models/donut.model';
import { createSVGRenderer } from '../renderers/svg.renderer';

export interface DonutChartProps {
  data: DonutDataPoint[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 400,
  height = 400,
  showLegend = true,
  backgroundColor = '#ffffff',
  padding = { top: 20, right: 20, bottom: 20, left: 20 },
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rendererRef = useRef<ReturnType<typeof createSVGRenderer> | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Create renderer if not exists
    if (!rendererRef.current) {
      rendererRef.current = createSVGRenderer(svg);
    }

    const config: GraphConfig = {
      viewport: { width, height, padding },
      showGrid: false,
      showAxis: false,
      backgroundColor,
    };

    // Create model and compute
    const model = createDonutModel(data, config);
    if (!model.validate()) {
      console.warn('Invalid donut chart data');
      return;
    }

    const { segments, centerX, centerY, outerRadius, innerRadius } = model.compute();

    // Render
    const renderer = rendererRef.current;
    renderer.clear(config);
    renderer.render(data, config);
    renderer.drawDonut(segments, centerX, centerY, outerRadius, innerRadius);

    // Draw legend if enabled
    if (showLegend) {
      const legendX = padding.left + 10;
      let legendY = height - padding.bottom - (segments.length * 20);

      segments.forEach((segment, index) => {
        // Draw color box using SVG rect
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', legendX.toString());
        rect.setAttribute('y', (legendY + index * 20).toString());
        rect.setAttribute('width', '12');
        rect.setAttribute('height', '12');
        rect.setAttribute('fill', segment.color);
        svg.appendChild(rect);

        // Draw label
        renderer.drawText(
          `${segment.category} (${segment.percentage.toFixed(1)}%)`,
          legendX + 20,
          legendY + index * 20 + 10,
          { color: '#374151', fontSize: 12, anchor: 'start' }
        );
      });
    }
  }, [data, width, height, showLegend, backgroundColor, padding]);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    />
  );
};
