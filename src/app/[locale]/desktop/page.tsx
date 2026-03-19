'use client';

import { useTranslations } from 'next-intl';
import { WallpaperGrid } from '@/components/wallpaper/WallpaperGrid';
import { WallpaperFilters } from '@/components/wallpaper/WallpaperFilters';
import { mockWallpapers } from '@/lib/mock-data';

export default function DesktopPage() {
  const t = useTranslations();
  const desktopWallpapers = mockWallpapers.filter(
    (w) => w.device === 'desktop' || w.device === 'both'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('meta.desktopTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('meta.desktopDesc')}
        </p>
      </section>

      <WallpaperFilters />

      <WallpaperGrid wallpapers={desktopWallpapers} />
    </div>
  );
}
