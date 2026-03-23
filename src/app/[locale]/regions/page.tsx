'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { REGIONS, Region } from '@/types/genshin';
import { mockWallpapers } from '@/lib/mock-data';

export default function RegionsPage() {
  const t = useTranslations('regions');
  const regions = Object.entries(REGIONS) as [Region, typeof REGIONS[Region]][];

  // Count wallpapers per region
  const getRegionCount = (region: Region) => {
    return mockWallpapers.filter(w => w.region === region).length;
  };

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map(([key, value]) => (
            <Link
              key={key}
              href={`/region/${key}`}
              className="group relative overflow-hidden rounded-2xl aspect-[16/9] bg-surface-900 border border-surface-800 hover:border-genshin-gold/30 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-2xl md:text-3xl group-hover:text-genshin-gold transition-colors mb-2">
                  {value.name_cn}
                </span>
                <span className="text-surface-400 text-lg">
                  {value.name}
                </span>
                <span className="text-surface-500 text-sm mt-2">
                  {getRegionCount(key)} 张壁纸
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
