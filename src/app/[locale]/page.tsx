'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { HeroSection } from '@/components/genshin/HeroSection';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { getFeaturedWallpapers, getPopularWallpapers, getLatestWallpapers } from '@/lib/mock-data';
import { REGIONS, Region } from '@/types/genshin';

export default function HomePage() {
  const t = useTranslations('home');
  
  const featuredWallpapers = getFeaturedWallpapers();
  const popularWallpapers = getPopularWallpapers(5);
  const latestWallpapers = getLatestWallpapers(5);
  const regions = Object.entries(REGIONS).slice(0, 6) as [Region, typeof REGIONS[Region]][];

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Wallpapers */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t('featured')}
          </h2>
          <Link
            href="/search"
            className="flex items-center gap-1 text-genshin-gold hover:text-genshin-gold-light transition-colors"
          >
            {t('viewAll')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <WallpaperGrid wallpapers={featuredWallpapers} columns={4} />
      </section>

      {/* Popular Wallpapers */}
      <section className="container mx-auto px-4 py-16 border-t border-surface-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t('popular')}
          </h2>
          <Link
            href="/search?sort=popular"
            className="flex items-center gap-1 text-genshin-gold hover:text-genshin-gold-light transition-colors"
          >
            {t('viewAll')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <WallpaperGrid wallpapers={popularWallpapers} columns={5} />
      </section>

      {/* Browse by Region */}
      <section className="container mx-auto px-4 py-16 border-t border-surface-800">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {t('byRegion')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {regions.map(([key, value]) => (
            <Link
              key={key}
              href={`/region/${key}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-surface-900 border border-surface-800 hover:border-genshin-gold/30 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-lg group-hover:text-genshin-gold transition-colors">
                  {value.name_cn}
                </span>
                <span className="text-surface-400 text-sm">
                  {value.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Wallpapers */}
      <section className="container mx-auto px-4 py-16 border-t border-surface-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t('latest')}
          </h2>
          <Link
            href="/search?sort=latest"
            className="flex items-center gap-1 text-genshin-gold hover:text-genshin-gold-light transition-colors"
          >
            {t('viewAll')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <WallpaperGrid wallpapers={latestWallpapers} columns={5} />
      </section>
    </div>
  );
}
