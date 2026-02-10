import React, { useEffect, useRef } from 'react';
import { HeatmapCell, GraphConfig } from '../types';
import { createHeatmapModel } from '../models/heatmap.model';
import { createCanvasRenderer } from '../renderers/canvas.renderer';

export interface HeatmapProps {
  data: HeatmapCell[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
  onCellClick?: (cell: HeatmapCell, index: number) => void;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  width = 800,
  height = 600,
  showGrid = false,
  showAxis = true,
  backgroundColor = '#ffffff',
  padding = { top: 40, right: 40, bottom: 60, left: 60 },
  onCellClick,
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
    const model = createHeatmapModel(data, config);
    if (!model.validate()) {
      console.warn('Invalid heatmap data');
      return;
    }

    const { cells } = model.compute();

    // Render
    const renderer = rendererRef.current;
    renderer.clear();
    renderer.render(data, config);
    renderer.drawHeatmap(cells);
  }, [data, width, height, showGrid, showAxis, backgroundColor, padding]);

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
