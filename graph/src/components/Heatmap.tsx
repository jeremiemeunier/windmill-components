import React, { useEffect, useRef } from 'react';
import { HeatmapCell, GraphConfig } from '../types';
import { createHeatmapModel } from '../models/heatmap.model';
import { createSVGRenderer } from '../renderers/svg.renderer';

export interface HeatmapProps {
  data: HeatmapCell[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  width = 800,
  height = 600,
  showGrid = false,
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
    renderer.clear(config);
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
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    />
  );
};
