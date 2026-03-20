'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { ElementFilter } from '@/components/genshin/ElementFilter';
import { mockWallpapers } from '@/lib/mock-data';
import { Element } from '@/types/genshin';

export default function SearchPage() {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredWallpapers = useMemo(() => {
    let results = mockWallpapers;

    // Filter by element
    if (selectedElement) {
      results = results.filter(w => w.element === selectedElement);
    }

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        w =>
          w.title.toLowerCase().includes(lowerQuery) ||
          w.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return results;
  }, [query, selectedElement]);

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('meta.searchTitle')}
          </h1>

          {/* Search Input */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-900 border border-surface-700 text-white placeholder:text-surface-500 focus:border-genshin-gold focus:ring-1 focus:ring-genshin-gold outline-none transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ElementFilter
            selected={selectedElement}
            onChange={setSelectedElement}
          />
        </div>

        {/* Results */}
        {filteredWallpapers.length > 0 ? (
          <>
            <p className="text-surface-400 mb-6">
              找到 {filteredWallpapers.length} 张壁纸
            </p>
            <WallpaperGrid wallpapers={filteredWallpapers} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-surface-400">{t('common.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
