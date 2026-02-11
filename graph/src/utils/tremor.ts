import { TremorChartData, DataPoint } from '../types';

/**
 * Convert Tremor-style data format to internal DataPoint format
 * @param data - Array of objects with flexible keys
 * @param index - The key to use as x-axis (e.g., "date", "month")
 * @param categories - Array of keys to extract as different series
 * @returns Array of DataPoint arrays, one per category
 */
export function convertTremorData(
  data: TremorChartData[],
  index: string,
  categories: string[]
): DataPoint[][] {
  return categories.map((category) => {
    return data.map((row, idx) => ({
      x: typeof row[index] === 'number' ? row[index] : idx,
      y: typeof row[category] === 'number' ? row[category] : 0,
      label: String(row[index] || idx),
    }));
  });
}

/**
 * Generate gradient color based on position (0-1)
 */
export function interpolateGradient(
  from: string,
  to: string,
  position: number
): string {
  // Simple RGB interpolation
  const fromRgb = hexToRgb(from);
  const toRgb = hexToRgb(to);
  
  if (!fromRgb || !toRgb) return from;

  const r = Math.round(fromRgb.r + (toRgb.r - fromRgb.r) * position);
  const g = Math.round(fromRgb.g + (toRgb.g - fromRgb.g) * position);
  const b = Math.round(fromRgb.b + (toRgb.b - fromRgb.b) * position);

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Create gradient stops for canvas
 */
export function createCanvasGradient(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  fromColor: string,
  toColor: string
): CanvasGradient {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, fromColor);
  gradient.addColorStop(1, toColor);
  return gradient;
}
