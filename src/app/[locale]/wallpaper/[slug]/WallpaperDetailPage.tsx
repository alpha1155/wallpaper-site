"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Monitor,
  Smartphone,
  Play,
  Pause,
  Eye,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";
import { WallpaperCard } from "@/components/wallpaper/WallpaperCard";
import { getResolutionLabel, formatDate, formatNumber, isVideoFormat } from "@/lib/utils";
import type { Wallpaper } from "@/types/wallpaper";

interface WallpaperDetailPageProps {
  wallpaper: Wallpaper;
  relatedWallpapers: Wallpaper[];
}

export function WallpaperDetailPage({
  wallpaper,
  relatedWallpapers,
}: WallpaperDetailPageProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  const isVideo = wallpaper.type === "dynamic";
  const resolutions = Object.keys(wallpaper.download_urls);

  const mobileResolutions = resolutions.filter((r) => {
    const [w, h] = r.split("x").map(Number);
    return h > w;
  });

  const desktopResolutions = resolutions.filter((r) => {
    const [w, h] = r.split("x").map(Number);
    return w >= h;
  });

  const handleDownload = async (resolution: string) => {
    const url = wallpaper.download_urls[resolution];
    if (!url) return;

    setDownloading(resolution);

    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${wallpaper.slug}-${resolution}${isVideoFormat(url) ? ".mp4" : ".webp"}`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloading(null), 1000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this wallpaper: ${wallpaper.title}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-surface-200 dark:border-surface-800">
        <div className="container-custom py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all wallpapers
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="relative aspect-video bg-surface-900">
                {isVideo ? (
                  <>
                    <video
                      src={wallpaper.preview_url}
                      autoPlay={isPlaying}
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                  </>
                ) : (
                  <Image
                    src={wallpaper.preview_url}
                    alt={wallpaper.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Mobile Download Section */}
            <div className="lg:hidden mt-8 card p-6">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                Download Options
              </h2>
              <DownloadButtons
                desktopResolutions={desktopResolutions}
                mobileResolutions={mobileResolutions}
                downloading={downloading}
                onDownload={handleDownload}
              />
            </div>

            {/* Related Wallpapers */}
            {relatedWallpapers.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">
                  Related Wallpapers
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedWallpapers.map((related) => (
                    <WallpaperCard key={related.id} wallpaper={related} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Info Card */}
              <div className="card p-6">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  {wallpaper.title}
                </h1>

                {/* Meta info */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-400">
                    {wallpaper.device === "mobile" ? (
                      <Smartphone className="w-4 h-4" />
                    ) : wallpaper.device === "desktop" ? (
                      <Monitor className="w-4 h-4" />
                    ) : (
                      <div className="flex items-center gap-1">
                        <Monitor className="w-4 h-4" />
                        <Smartphone className="w-4 h-4" />
                      </div>
                    )}
                    <span>
                      {wallpaper.device === "both"
                        ? "Desktop & Mobile"
                        : wallpaper.device.charAt(0).toUpperCase() +
                          wallpaper.device.slice(1)}
                    </span>
                  </div>

                  {wallpaper.type === "dynamic" && (
                    <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-400">
                      <Play className="w-4 h-4" />
                      <span>Dynamic Wallpaper (MP4)</span>
                    </div>
                  )}

                  {wallpaper.views !== undefined && (
                    <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-400">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(wallpaper.views)} views</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(wallpaper.created_at)}</span>
                  </div>
                </div>

                {/* Tags */}
                {wallpaper.tags && wallpaper.tags.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm text-surface-500 mb-3">
                      <Tag className="w-4 h-4" />
                      <span>Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {wallpaper.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/search?tag=${tag}`}
                          className="text-xs px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share button */}
                <button
                  onClick={handleShare}
                  className="mt-6 w-full btn-secondary"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Wallpaper
                </button>
              </div>

              {/* Desktop Download Card */}
              <div className="hidden lg:block card p-6">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                  Download Options
                </h2>
                <DownloadButtons
                  desktopResolutions={desktopResolutions}
                  mobileResolutions={mobileResolutions}
                  downloading={downloading}
                  onDownload={handleDownload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DownloadButtonsProps {
  desktopResolutions: string[];
  mobileResolutions: string[];
  downloading: string | null;
  onDownload: (resolution: string) => void;
}

function DownloadButtons({
  desktopResolutions,
  mobileResolutions,
  downloading,
  onDownload,
}: DownloadButtonsProps) {
  return (
    <div className="space-y-4">
      {desktopResolutions.length > 0 && (
        <div>
          <span className="text-xs text-surface-500 uppercase tracking-wide flex items-center gap-2 mb-3">
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </span>
          <div className="space-y-2">
            {desktopResolutions.map((resolution) => (
              <button
                key={resolution}
                onClick={() => onDownload(resolution)}
                disabled={downloading === resolution}
                className="w-full btn-primary justify-between"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {getResolutionLabel(resolution)}
                </span>
                <span className="text-xs opacity-75">{resolution}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {mobileResolutions.length > 0 && (
        <div>
          <span className="text-xs text-surface-500 uppercase tracking-wide flex items-center gap-2 mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </span>
          <div className="space-y-2">
            {mobileResolutions.map((resolution) => (
              <button
                key={resolution}
                onClick={() => onDownload(resolution)}
                disabled={downloading === resolution}
                className="w-full btn-secondary justify-between"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {getResolutionLabel(resolution)}
                </span>
                <span className="text-xs opacity-75">{resolution}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
