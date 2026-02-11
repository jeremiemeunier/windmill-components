import React, { useEffect, useRef } from 'react';
import { DataPoint, GraphConfig } from '../types';
import { createAreaModel } from '../models/area.model';
import { createCanvasRenderer } from '../renderers/canvas.renderer';

export interface AreaChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
  fillOpacity?: number;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width = 800,
  height = 600,
  color = '#3b82f6',
  lineWidth = 2,
  showGrid = true,
  showAxis = true,
  backgroundColor = '#ffffff',
  padding = { top: 40, right: 40, bottom: 60, left: 60 },
  fillOpacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createCanvasRenderer> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Create renderer if not exists
    if (!rendererRef.current) {
      rendererRef.current = createCanvasRenderer(canvas);
    }

    const config: GraphConfig = {
      viewport: { width, height, padding },
      showGrid,
      showAxis,
      backgroundColor,
      lineWidth,
    };

    // Create model and compute
    const model = createAreaModel(data, config);
    if (!model.validate()) {
      console.warn('Invalid area chart data');
      return;
    }

    const { projectedPoints, areaPath } = model.compute();

    // Render
    const renderer = rendererRef.current;
    renderer.clear(config);
    renderer.render(data, config);
    renderer.drawArea(areaPath, color, fillOpacity);
    renderer.drawLine(projectedPoints, color, lineWidth);
  }, [data, width, height, color, lineWidth, showGrid, showAxis, backgroundColor, padding, fillOpacity]);

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
    <canvas
      ref={canvasRef}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    />
  );
};
