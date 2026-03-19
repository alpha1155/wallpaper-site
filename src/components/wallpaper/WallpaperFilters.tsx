"use client";

import { useCallback } from "react";
import { Monitor, Smartphone, ImageIcon, Play, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WallpaperFilters as Filters, DeviceType, WallpaperType } from "@/types/wallpaper";

interface WallpaperFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  showTypeFilter?: boolean;
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function FilterButton({ active, onClick, icon, label }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
          : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export function WallpaperFilters({
  filters,
  onFilterChange,
  showTypeFilter = true,
}: WallpaperFiltersProps) {
  const handleDeviceChange = useCallback(
    (device: DeviceType | "all") => {
      onFilterChange({ ...filters, device });
    },
    [filters, onFilterChange]
  );

  const handleTypeChange = useCallback(
    (type: WallpaperType | "all") => {
      onFilterChange({ ...filters, type });
    },
    [filters, onFilterChange]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      {/* Device filters */}
      <div className="flex flex-wrap gap-2">
        <FilterButton
          active={filters.device === "all" || !filters.device}
          onClick={() => handleDeviceChange("all")}
          icon={<LayoutGrid className="w-4 h-4" />}
          label="All"
        />
        <FilterButton
          active={filters.device === "desktop"}
          onClick={() => handleDeviceChange("desktop")}
          icon={<Monitor className="w-4 h-4" />}
          label="Desktop"
        />
        <FilterButton
          active={filters.device === "mobile"}
          onClick={() => handleDeviceChange("mobile")}
          icon={<Smartphone className="w-4 h-4" />}
          label="Mobile"
        />
      </div>

      {/* Type filters */}
      {showTypeFilter && (
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={filters.type === "all" || !filters.type}
            onClick={() => handleTypeChange("all")}
            icon={<LayoutGrid className="w-4 h-4" />}
            label="All Types"
          />
          <FilterButton
            active={filters.type === "static"}
            onClick={() => handleTypeChange("static")}
            icon={<ImageIcon className="w-4 h-4" />}
            label="Static"
          />
          <FilterButton
            active={filters.type === "dynamic"}
            onClick={() => handleTypeChange("dynamic")}
            icon={<Play className="w-4 h-4" />}
            label="Dynamic"
          />
        </div>
      )}
    </div>
  );
}
