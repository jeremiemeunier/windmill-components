import React, { useEffect, useRef } from 'react';
import { DataPoint, GraphConfig, TremorChartData } from '../types';
import { createAreaModel } from '../models/area.model';
import { createSVGRenderer } from '../renderers/svg.renderer';
import { convertTremorData } from '../utils/tremor';

// Constants
const SECONDARY_SERIES_OPACITY_FACTOR = 0.7;

export interface AreaChartProps {
  // Standard data format
  data?: DataPoint[];
  
  // Tremor-style data format
  tremorData?: TremorChartData[];
  index?: string;
  categories?: string[];
  
  // Styling
  width?: number;
  height?: number;
  color?: string;
  colors?: string[];
  lineWidth?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  backgroundColor?: string;
  padding?: { top: number; right: number; bottom: number; left: number };
  fillOpacity?: number;
  
  // Gradient support
  showGradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  tremorData,
  index,
  categories,
  width = 800,
  height = 600,
  color = '#3b82f6',
  colors,
  lineWidth = 2,
  showGrid = true,
  showAxis = true,
  backgroundColor = '#ffffff',
  padding = { top: 40, right: 40, bottom: 60, left: 60 },
  fillOpacity = 0.3,
  showGradient = false,
  gradientFrom,
  gradientTo,
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
      colors,
    };

    // Convert Tremor data if provided
    let chartData: DataPoint[] = data || [];
    let seriesData: DataPoint[][] = [];
    
    if (tremorData && index && categories) {
      seriesData = convertTremorData(tremorData, index, categories);
      // Use first series for single-line chart
      chartData = seriesData[0] || [];
    }

    // Create model and compute
    const model = createAreaModel(chartData, config);
    if (!model.validate()) {
      console.warn('Invalid area chart data');
      return;
    }

    const { projectedPoints, areaPath } = model.compute();

    // Render
    const renderer = rendererRef.current;
    renderer.clear(config);
    renderer.render(chartData, config);
    
    // Draw with gradient if enabled
    if (showGradient && gradientFrom && gradientTo) {
      // Create SVG gradient
      const gradientRef = renderer.createGradient(gradientFrom, gradientTo, 0, 0, 0, 1);
      renderer.drawArea(areaPath, gradientRef, fillOpacity);
      renderer.drawLine(projectedPoints, gradientTo, lineWidth);
    } else {
      const lineColor = colors?.[0] || color;
      renderer.drawArea(areaPath, lineColor, fillOpacity);
      renderer.drawLine(projectedPoints, lineColor, lineWidth);
    }
    
    // Draw additional series if using Tremor data with multiple categories
    if (seriesData.length > 1) {
      seriesData.slice(1).forEach((series, idx) => {
        const seriesModel = createAreaModel(series, config);
        if (seriesModel.validate()) {
          const { projectedPoints: seriesPoints, areaPath: seriesPath } = seriesModel.compute();
          // idx starts at 0 for slice(1), so add 1 to get the correct color index
          const seriesColor = colors?.[idx + 1] || colors?.[0] || color;
          renderer.drawArea(seriesPath, seriesColor, fillOpacity * SECONDARY_SERIES_OPACITY_FACTOR);
          renderer.drawLine(seriesPoints, seriesColor, lineWidth);
        }
      });
    }
  }, [data, tremorData, index, categories, width, height, color, colors, lineWidth, showGrid, showAxis, backgroundColor, padding, fillOpacity, showGradient, gradientFrom, gradientTo]);

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
