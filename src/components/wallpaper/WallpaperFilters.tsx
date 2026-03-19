"use client";

import { useTranslations } from "next-intl";
import { Monitor, Smartphone, Image, Video } from "lucide-react";
import { useWallpaperStore } from "@/store/wallpaper-store";
import { cn } from "@/lib/utils";

export function WallpaperFilters() {
  const t = useTranslations("filters");
  const { filters, setFilters } = useWallpaperStore();

  const deviceOptions = [
    { value: "all", label: t("all"), icon: null },
    { value: "desktop", label: t("desktop"), icon: Monitor },
    { value: "mobile", label: t("mobile"), icon: Smartphone },
  ];

  const typeOptions = [
    { value: "all", label: t("all"), icon: null },
    { value: "static", label: t("static"), icon: Image },
    { value: "dynamic", label: t("dynamic"), icon: Video },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
      {/* Device Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("device")}:
        </span>
        <div className="flex gap-1">
          {deviceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setFilters({
                  device: option.value as "all" | "desktop" | "mobile",
                })
              }
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                filters.device === option.value
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("type")}:
        </span>
        <div className="flex gap-1">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setFilters({
                  type: option.value as "all" | "static" | "dynamic",
                })
              }
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                filters.type === option.value
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
