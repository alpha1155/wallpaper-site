"use client";

import { WallpaperCard } from "./WallpaperCard";
import { WallpaperGridSkeleton } from "@/components/ui/Skeleton";
import type { Wallpaper } from "@/types/wallpaper";

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  loading?: boolean;
  emptyMessage?: string;
}

export function WallpaperGrid({
  wallpapers,
  loading = false,
  emptyMessage = "No wallpapers found",
}: WallpaperGridProps) {
  if (loading) {
    return <WallpaperGridSkeleton />;
  }

  if (wallpapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-surface-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-surface-600 dark:text-surface-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="masonry-grid animate-fade-in">
      {wallpapers.map((wallpaper, index) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          priority={index < 6}
        />
      ))}
    </div>
  );
}
