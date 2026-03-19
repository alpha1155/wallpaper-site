"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Monitor, Smartphone, MonitorSmartphone } from "lucide-react";
import type { Wallpaper } from "@/types/wallpaper";
import { cn } from "@/lib/utils";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export function WallpaperCard({ wallpaper, priority = false }: WallpaperCardProps) {
  const DeviceIcon = {
    mobile: Smartphone,
    desktop: Monitor,
    both: MonitorSmartphone,
  }[wallpaper.device];

  const aspectRatio = wallpaper.device === "mobile" ? "aspect-[9/16]" : "aspect-[16/9]";

  return (
    <Link
      href={`/wallpaper/${wallpaper.slug}`}
      className="masonry-item group block"
    >
      <article className="card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary-500/50">
        <div className={cn("relative w-full overflow-hidden", aspectRatio)}>
          <Image
            src={wallpaper.thumbnail_url}
            alt={wallpaper.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Dynamic indicator */}
          {wallpaper.type === "dynamic" && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              <Play className="w-3 h-3 fill-current" />
              <span>Live</span>
            </div>
          )}

          {/* Device badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white p-1.5 rounded-full">
            <DeviceIcon className="w-3.5 h-3.5" />
          </div>

          {/* Title on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-medium text-sm truncate">
              {wallpaper.title}
            </h3>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm text-surface-900 dark:text-surface-100 truncate group-hover:text-primary-500 transition-colors">
            {wallpaper.title}
          </h3>

          {wallpaper.tags && wallpaper.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {wallpaper.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400"
                >
                  {tag}
                </span>
              ))}
              {wallpaper.tags.length > 2 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500">
                  +{wallpaper.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
