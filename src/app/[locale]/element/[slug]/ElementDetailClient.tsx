'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { mockWallpapers } from '@/lib/mock-data';
import { ELEMENTS, Element } from '@/types/genshin';

interface Props {
  element: Element;
}

export function ElementDetailClient({ element }: Props) {
  const t = useTranslations();
  const elementInfo = ELEMENTS[element];
  
  const elementWallpapers = mockWallpapers.filter(w => w.element === element);

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-surface-400 hover:text-genshin-gold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.backToHome')}
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4"
            style={{ backgroundColor: elementInfo.color }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {elementInfo.name_cn}
          </h1>
          <p className="text-surface-400 text-xl">
            {elementInfo.name}
          </p>
          <p className="text-surface-500 mt-4">
            {elementWallpapers.length} 张壁纸
          </p>
        </div>

        {/* Wallpapers */}
        {elementWallpapers.length > 0 ? (
          <WallpaperGrid wallpapers={elementWallpapers} />
        ) : (
          <div className="text-center py-12">
            <p className="text-surface-400">{t('common.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
