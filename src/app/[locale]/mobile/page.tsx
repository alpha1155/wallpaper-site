'use client';

import { useTranslations } from 'next-intl';
import { WallpaperGrid } from '@/components/wallpaper/WallpaperGrid';
import { WallpaperFilters } from '@/components/wallpaper/WallpaperFilters';
import { mockWallpapers } from '@/lib/mock-data';

export default function MobilePage() {
  const t = useTranslations();
  const mobileWallpapers = mockWallpapers.filter(
    (w) => w.device === 'mobile' || w.device === 'both'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('meta.mobileTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('meta.mobileDesc')}
        </p>
      </section>

      <WallpaperFilters />

      <WallpaperGrid wallpapers={mobileWallpapers} />
    </div>
  );
}
