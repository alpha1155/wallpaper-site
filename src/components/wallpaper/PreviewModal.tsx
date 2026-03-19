"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { X, Download, Monitor, Smartphone, Play, Pause } from "lucide-react";
import { cn, getResolutionLabel, isVideoFormat } from "@/lib/utils";
import type { Wallpaper } from "@/types/wallpaper";

interface PreviewModalProps {
  wallpaper: Wallpaper;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (resolution: string, url: string) => void;
}

export function PreviewModal({
  wallpaper,
  isOpen,
  onClose,
  onDownload,
}: PreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null);

  const isVideo = wallpaper.type === "dynamic";
  const resolutions = Object.keys(wallpaper.download_urls);

  // Separate mobile and desktop resolutions
  const mobileResolutions = resolutions.filter((r) => {
    const [w, h] = r.split("x").map(Number);
    return h > w;
  });
  const desktopResolutions = resolutions.filter((r) => {
    const [w, h] = r.split("x").map(Number);
    return w >= h;
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleDownload = (resolution: string) => {
    const url = wallpaper.download_urls[resolution];
    if (url) {
      if (onDownload) {
        onDownload(resolution, url);
      }
      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${wallpaper.slug}-${resolution}${isVideoFormat(url) ? ".mp4" : ".webp"}`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] m-4 flex flex-col animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
          aria-label="Close preview"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Preview area */}
        <div className="relative flex-1 min-h-0 rounded-t-xl overflow-hidden bg-surface-900">
          {isVideo ? (
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
              <video
                src={wallpaper.preview_url}
                autoPlay={isPlaying}
                loop
                muted
                playsInline
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px]">
              <Image
                src={wallpaper.preview_url}
                alt={wallpaper.title}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          )}
        </div>

        {/* Download options */}
        <div className="bg-white dark:bg-surface-900 rounded-b-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-surface-900 dark:text-white">
                {wallpaper.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-surface-500">
                {wallpaper.type === "dynamic" && (
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Dynamic
                  </span>
                )}
                <span className="flex items-center gap-1">
                  {wallpaper.device === "mobile" ? (
                    <Smartphone className="w-3 h-3" />
                  ) : wallpaper.device === "desktop" ? (
                    <Monitor className="w-3 h-3" />
                  ) : (
                    <>
                      <Monitor className="w-3 h-3" />
                      <Smartphone className="w-3 h-3" />
                    </>
                  )}
                  {wallpaper.device === "both" ? "All Devices" : wallpaper.device}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Desktop resolutions */}
              {desktopResolutions.length > 0 && (
                <div>
                  <span className="text-xs text-surface-500 uppercase tracking-wide flex items-center gap-1 mb-2">
                    <Monitor className="w-3 h-3" />
                    Desktop
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {desktopResolutions.map((resolution) => (
                      <button
                        key={resolution}
                        onClick={() => handleDownload(resolution)}
                        onMouseEnter={() => setSelectedResolution(resolution)}
                        onMouseLeave={() => setSelectedResolution(null)}
                        className={cn(
                          "btn-secondary text-xs sm:text-sm",
                          selectedResolution === resolution && "ring-2 ring-primary-500"
                        )}
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        {getResolutionLabel(resolution)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile resolutions */}
              {mobileResolutions.length > 0 && (
                <div>
                  <span className="text-xs text-surface-500 uppercase tracking-wide flex items-center gap-1 mb-2">
                    <Smartphone className="w-3 h-3" />
                    Mobile
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {mobileResolutions.map((resolution) => (
                      <button
                        key={resolution}
                        onClick={() => handleDownload(resolution)}
                        onMouseEnter={() => setSelectedResolution(resolution)}
                        onMouseLeave={() => setSelectedResolution(null)}
                        className={cn(
                          "btn-secondary text-xs sm:text-sm",
                          selectedResolution === resolution && "ring-2 ring-primary-500"
                        )}
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        {getResolutionLabel(resolution)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {wallpaper.tags && wallpaper.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
              {wallpaper.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
