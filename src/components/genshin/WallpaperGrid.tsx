'use client';

import { Wallpaper } from '@/types/genshin';
import { WallpaperCard } from './WallpaperCard';

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  columns?: 2 | 3 | 4 | 5;
}

export function WallpaperGrid({ wallpapers, columns = 5 }: WallpaperGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  };

  if (wallpapers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-surface-400">暂无壁纸</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {wallpapers.map((wallpaper, index) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
