import { create } from "zustand";
import type { Wallpaper, WallpaperFilters } from "@/types/wallpaper";

interface WallpaperStore {
  wallpapers: Wallpaper[];
  filters: WallpaperFilters;
  loading: boolean;
  selectedWallpaper: Wallpaper | null;
  previewOpen: boolean;

  setWallpapers: (wallpapers: Wallpaper[]) => void;
  setFilters: (filters: WallpaperFilters) => void;
  setLoading: (loading: boolean) => void;
  setSelectedWallpaper: (wallpaper: Wallpaper | null) => void;
  openPreview: (wallpaper: Wallpaper) => void;
  closePreview: () => void;
}

export const useWallpaperStore = create<WallpaperStore>((set) => ({
  wallpapers: [],
  filters: { device: "all", type: "all" },
  loading: false,
  selectedWallpaper: null,
  previewOpen: false,

  setWallpapers: (wallpapers) => set({ wallpapers }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setSelectedWallpaper: (selectedWallpaper) => set({ selectedWallpaper }),
  openPreview: (wallpaper) =>
    set({ selectedWallpaper: wallpaper, previewOpen: true }),
  closePreview: () => set({ previewOpen: false }),
}));
