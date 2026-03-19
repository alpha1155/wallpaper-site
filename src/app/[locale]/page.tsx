'use client';

import { useTranslations } from 'next-intl';
import { WallpaperGrid } from '@/components/wallpaper/WallpaperGrid';
import { WallpaperFilters } from '@/components/wallpaper/WallpaperFilters';
import { mockWallpapers } from '@/lib/mock-data';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('home.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </section>

      {/* Filters */}
      <WallpaperFilters />

      {/* Featured Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('home.featured')}</h2>
        <WallpaperGrid wallpapers={mockWallpapers.slice(0, 8)} />
      </section>

      {/* Latest Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('home.latest')}</h2>
        <WallpaperGrid wallpapers={mockWallpapers.slice(0, 12)} />
      </section>
    </div>
  );
}
