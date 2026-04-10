import React, { useEffect, useRef } from 'react';
import { DataPoint, GraphConfig } from '../types';
import { createLineModel } from '../models/line.model';
import { createSVGRenderer } from '../renderers/svg.renderer';

export interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 800,
  height = 600,
  color = '#3b82f6',
  lineWidth = 2,
  showGrid = true,
  showAxis = true,
  backgroundColor = '#ffffff',
  padding = { top: 40, right: 40, bottom: 60, left: 60 },
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
      showGrid,
      showAxis,
      backgroundColor,
      lineWidth,
    };

    // Create model and compute
    const model = createLineModel(data, config);
    if (!model.validate()) {
      console.warn('Invalid line chart data');
      return;
    }

    const { projectedPoints } = model.compute();

    // Render
    const renderer = rendererRef.current;
    renderer.clear(config);
    renderer.render(data, config);
    renderer.drawLine(projectedPoints, color, lineWidth);
  }, [data, width, height, color, lineWidth, showGrid, showAxis, backgroundColor, padding]);

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
