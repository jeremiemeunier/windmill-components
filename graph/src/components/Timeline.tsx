import React, { useEffect, useRef } from 'react';
import { TimeSeriesDataPoint, GraphConfig } from '../types';
import { createTimelineModel } from '../models/timeline.model';
import { createSVGRenderer } from '../renderers/svg.renderer';

export interface TimelineProps {
  data: TimeSeriesDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
  maxPoints?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  data,
  width = 800,
  height = 600,
  color = '#10b981',
  lineWidth = 2,
  showGrid = true,
  showAxis = true,
  backgroundColor = '#ffffff',
  padding = { top: 40, right: 40, bottom: 60, left: 60 },
  maxPoints = 1000,
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
    const model = createTimelineModel(data, config, maxPoints);
    if (!model.validate()) {
      console.warn('Invalid timeline data');
      return;
    }

    const { projectedPoints } = model.compute();

    // Render
    const renderer = rendererRef.current;
    renderer.clear(config);
    renderer.render(data, config);
    renderer.drawLine(projectedPoints, color, lineWidth);
  }, [data, width, height, color, lineWidth, showGrid, showAxis, backgroundColor, padding, maxPoints]);

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
