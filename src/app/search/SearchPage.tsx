"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { WallpaperGrid } from "@/components/wallpaper/WallpaperGrid";
import { WallpaperFilters } from "@/components/wallpaper/WallpaperFilters";
import { getMockWallpapers, mockWallpapers } from "@/lib/mock-data";
import type { WallpaperFilters as Filters } from "@/types/wallpaper";

export function SearchPage() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag") || "";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Filters>({
    device: "all",
    type: "all",
    tags: initialTag ? [initialTag] : [],
  });

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    mockWallpapers.forEach((w) => w.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredWallpapers = useMemo(() => {
    return getMockWallpapers({
      ...filters,
      search: query,
    });
  }, [query, filters]);

  const handleTagClick = useCallback((tag: string) => {
    setFilters((prev) => {
      const tags = prev.tags || [];
      if (tags.includes(tag)) {
        return { ...prev, tags: tags.filter((t) => t !== tag) };
      }
      return { ...prev, tags: [...tags, tag] };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setFilters({ device: "all", type: "all", tags: [] });
  }, []);

  const hasActiveFilters =
    query ||
    (filters.device && filters.device !== "all") ||
    (filters.type && filters.type !== "all") ||
    (filters.tags && filters.tags.length > 0);

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <section className="bg-surface-50 dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800">
        <div className="container-custom py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-6">
            Search Wallpapers
          </h1>

          {/* Search Input */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, tag, or keyword..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="mt-6">
            <p className="text-sm text-surface-500 mb-3">Popular tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map((tag) => {
                const isActive = filters.tags?.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 sm:py-12">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <WallpaperFilters
              filters={filters}
              onFilterChange={(f) =>
                setFilters((prev) => ({ ...prev, ...f, tags: prev.tags }))
              }
            />

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Active filters display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-surface-500">Active filters:</span>
              {query && (
                <span className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  &quot;{query}&quot;
                  <button
                    onClick={() => setQuery("")}
                    className="hover:text-primary-900 dark:hover:text-primary-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                >
                  #{tag}
                  <button
                    onClick={() => handleTagClick(tag)}
                    className="hover:text-primary-900 dark:hover:text-primary-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-surface-500 mb-6">
            {filteredWallpapers.length} wallpaper
            {filteredWallpapers.length !== 1 ? "s" : ""} found
          </p>

          {/* Grid */}
          <WallpaperGrid
            wallpapers={filteredWallpapers}
            emptyMessage="No wallpapers match your search criteria"
          />
        </div>
      </section>
    </div>
  );
}
