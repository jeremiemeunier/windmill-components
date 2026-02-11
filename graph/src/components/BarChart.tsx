import React, { useEffect, useRef } from 'react';
import { BarDataPoint, GraphConfig } from '../types';
import { createBarModel } from '../models/bar.model';
import { createCanvasRenderer } from '../renderers/canvas.renderer';

export interface BarChartProps {
  data: BarDataPoint[];
  width?: number;
  height?: number;
  defaultColor?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 800,
  height = 600,
  defaultColor = '#3b82f6',
  showGrid = true,
  showAxis = true,
  backgroundColor = '#ffffff',
  padding = { top: 40, right: 40, bottom: 60, left: 60 },
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
    };

    // Create model and compute
    const model = createBarModel(data, config);
    if (!model.validate()) {
      console.warn('Invalid bar chart data');
      return;
    }

    const { bars } = model.compute();

    // Apply default color to bars without color
    const coloredBars = bars.map((bar) => ({
      ...bar,
      color: bar.color || defaultColor,
    }));

    // Render
    const renderer = rendererRef.current;
    renderer.clear(config);
    renderer.render(data, config);
    renderer.drawBars(coloredBars);
  }, [data, width, height, defaultColor, showGrid, showAxis, backgroundColor, padding]);

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
