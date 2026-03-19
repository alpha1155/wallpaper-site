"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { WallpaperGrid } from "@/components/wallpaper/WallpaperGrid";
import { WallpaperFilters } from "@/components/wallpaper/WallpaperFilters";
import { PreviewModal } from "@/components/wallpaper/PreviewModal";
import { mockWallpapers, getMockFeaturedWallpapers } from "@/lib/mock-data";
import type { Wallpaper, WallpaperFilters as Filters } from "@/types/wallpaper";

export default function Home() {
  const [filters, setFilters] = useState<Filters>({ device: "all", type: "all" });
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const featuredWallpapers = useMemo(() => getMockFeaturedWallpapers(), []);

  const filteredWallpapers = useMemo(() => {
    let result = [...mockWallpapers];

    if (filters.device && filters.device !== "all") {
      result = result.filter(
        (w) => w.device === filters.device || w.device === "both"
      );
    }

    if (filters.type && filters.type !== "all") {
      result = result.filter((w) => w.type === filters.type);
    }

    return result;
  }, [filters]);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setPreviewOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 border-b border-surface-200 dark:border-surface-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 dark:opacity-10" />
        <div className="container-custom relative py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Over 10,000+ wallpapers available</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white leading-tight">
              Stunning Wallpapers for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                Every Device
              </span>
            </h1>
            <p className="mt-6 text-lg text-surface-600 dark:text-surface-400 max-w-2xl">
              Browse our curated collection of high-quality wallpapers. From breathtaking
              landscapes to abstract art, find the perfect background for your desktop and
              mobile devices.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/desktop" className="btn-primary">
                Desktop Wallpapers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/mobile" className="btn-secondary">
                Mobile Wallpapers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 sm:py-16 bg-surface-50 dark:bg-surface-950">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
                Featured Wallpapers
              </h2>
              <p className="mt-2 text-surface-600 dark:text-surface-400">
                Hand-picked selections from our collection
              </p>
            </div>
            <Link
              href="/featured"
              className="hidden sm:inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredWallpapers.slice(0, 10).map((wallpaper) => (
              <div
                key={wallpaper.id}
                onClick={() => handleWallpaperClick(wallpaper)}
                className="cursor-pointer"
              >
                <div className="card overflow-hidden group">
                  <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
                    <img
                      src={wallpaper.thumbnail_url}
                      alt={wallpaper.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-medium text-sm truncate">
                        {wallpaper.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/featured"
            className="sm:hidden mt-6 flex items-center justify-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            View all featured
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* All Wallpapers Section */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
              Browse All Wallpapers
            </h2>
            <p className="mt-2 text-surface-600 dark:text-surface-400">
              Filter by device and type to find your perfect wallpaper
            </p>
          </div>

          <div className="mb-8">
            <WallpaperFilters filters={filters} onFilterChange={setFilters} />
          </div>

          <WallpaperGrid
            wallpapers={filteredWallpapers}
            emptyMessage="No wallpapers match your filters"
          />
        </div>
      </section>

      {/* Preview Modal */}
      {selectedWallpaper && (
        <PreviewModal
          wallpaper={selectedWallpaper}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  );
}
