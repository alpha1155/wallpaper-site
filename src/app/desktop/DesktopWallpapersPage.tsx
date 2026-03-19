"use client";

import { useState, useMemo } from "react";
import { Monitor } from "lucide-react";
import { WallpaperGrid } from "@/components/wallpaper/WallpaperGrid";
import { WallpaperFilters } from "@/components/wallpaper/WallpaperFilters";
import { mockWallpapers } from "@/lib/mock-data";
import type { WallpaperFilters as Filters } from "@/types/wallpaper";

export function DesktopWallpapersPage() {
  const [filters, setFilters] = useState<Filters>({ device: "desktop", type: "all" });

  const filteredWallpapers = useMemo(() => {
    let result = mockWallpapers.filter(
      (w) => w.device === "desktop" || w.device === "both"
    );

    if (filters.type && filters.type !== "all") {
      result = result.filter((w) => w.type === filters.type);
    }

    return result;
  }, [filters.type]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters({ ...newFilters, device: "desktop" });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 border-b border-surface-200 dark:border-surface-800">
        <div className="container-custom py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Desktop Collection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white">
            Desktop Wallpapers
          </h1>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-400 max-w-2xl">
            Transform your workspace with our stunning collection of desktop wallpapers.
            Available in 4K, QHD, and Full HD resolutions.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-surface-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {filteredWallpapers.length} wallpapers
            </span>
            <span>•</span>
            <span>Up to 4K resolution</span>
            <span>•</span>
            <span>Free downloads</span>
          </div>
        </div>
      </section>

      {/* Wallpapers Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-8">
            <WallpaperFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              showTypeFilter={true}
            />
          </div>

          <WallpaperGrid
            wallpapers={filteredWallpapers}
            emptyMessage="No desktop wallpapers found"
          />
        </div>
      </section>
    </>
  );
}
