import { create } from 'zustand';
import { GraphState, Viewport } from './types';

interface GraphStore extends GraphState {
  setDataset: (key: string, data: any[]) => void;
  getDataset: (key: string) => any[] | undefined;
  clearDataset: (key: string) => void;
  setViewport: (viewport: Viewport) => void;
  setTimeRange: (range: [number, number]) => void;
  setFilter: (key: string, value: any) => void;
  clearFilter: (key: string) => void;
  setZoom: (zoom: number) => void;
  markDirty: () => void;
  markClean: () => void;
  reset: () => void;
}

const defaultViewport: Viewport = {
  width: 800,
  height: 600,
  padding: {
    top: 40,
    right: 40,
    bottom: 60,
    left: 60,
  },
};

export const useGraphStore = create<GraphStore>((set, get) => ({
  // Initial state
  datasets: new Map(),
  viewport: defaultViewport,
  timeRange: undefined,
  filters: {},
  zoom: 1,
  isDirty: true,

  // Actions
  setDataset: (key: string, data: any[]) =>
    set((state) => {
      const newDatasets = new Map(state.datasets);
      newDatasets.set(key, data);
      return { datasets: newDatasets, isDirty: true };
    }),

  getDataset: (key: string) => {
    return get().datasets.get(key);
  },

  clearDataset: (key: string) =>
    set((state) => {
      const newDatasets = new Map(state.datasets);
      newDatasets.delete(key);
      return { datasets: newDatasets, isDirty: true };
    }),

  setViewport: (viewport: Viewport) =>
    set({ viewport, isDirty: true }),

  setTimeRange: (range: [number, number]) =>
    set({ timeRange: range, isDirty: true }),

  setFilter: (key: string, value: any) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      isDirty: true,
    })),

  clearFilter: (key: string) =>
    set((state) => {
      const { [key]: _, ...remainingFilters } = state.filters ?? {};
      return { filters: remainingFilters, isDirty: true };
    }),

  setZoom: (zoom: number) =>
    set({ zoom, isDirty: true }),

  markDirty: () => set({ isDirty: true }),

  markClean: () => set({ isDirty: false }),

  reset: () =>
    set({
      datasets: new Map(),
      viewport: defaultViewport,
      timeRange: undefined,
      filters: {},
      zoom: 1,
      isDirty: true,
    }),
}));
