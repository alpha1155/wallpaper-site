'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Download, Eye } from 'lucide-react';
import { Wallpaper, ELEMENTS } from '@/types/genshin';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export function WallpaperCard({ wallpaper, priority = false }: WallpaperCardProps) {
  const elementColor = wallpaper.element ? ELEMENTS[wallpaper.element].color : '#D4A853';

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Link
      href={`/wallpaper/${wallpaper.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-surface-900 border border-surface-800 hover:border-genshin-gold/30 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={wallpaper.thumbnail_url}
            alt={wallpaper.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent opacity-80" />
          
          {/* Element indicator */}
          {wallpaper.element && (
            <div
              className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${elementColor}30` }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: elementColor }}
              />
            </div>
          )}

          {/* Featured badge */}
          {wallpaper.is_featured && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-genshin-gold/90 text-surface-950 text-xs font-bold">
              精选
            </div>
          )}

          {/* Stats overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 group-hover:text-genshin-gold transition-colors">
              {wallpaper.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-surface-300">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatCount(wallpaper.view_count)}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {formatCount(wallpaper.download_count)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
