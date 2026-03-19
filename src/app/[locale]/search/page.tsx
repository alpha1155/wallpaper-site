'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { WallpaperGrid } from '@/components/wallpaper/WallpaperGrid';
import { mockWallpapers } from '@/lib/mock-data';

export default function SearchPage() {
  const t = useTranslations();
  const [query, setQuery] = useState('');

  const filteredWallpapers = query
    ? mockWallpapers.filter(
        (w) =>
          w.title.toLowerCase().includes(query.toLowerCase()) ||
          w.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('meta.searchTitle')}
        </h1>

        {/* Search Input */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </section>

      {query ? (
        filteredWallpapers.length > 0 ? (
          <WallpaperGrid wallpapers={filteredWallpapers} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t('common.noResults')}
          </p>
        )
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t('common.searchPlaceholder')}
        </p>
      )}
    </div>
  );
}
