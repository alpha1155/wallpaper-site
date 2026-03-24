'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { ElementFilter } from '@/components/genshin/ElementFilter';
import { createClient } from '@supabase/supabase-js';
import { Element, Wallpaper } from '@/types/genshin';

export default function SearchPage() {
  const t = useTranslations('search');
  const tc = useTranslations('common');
  const [query, setQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWallpapers() {
      setLoading(true);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      let dbQuery = supabase
        .from('wallpapers')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedElement) {
        dbQuery = dbQuery.eq('element', selectedElement);
      }

      if (query) {
        dbQuery = dbQuery.ilike('title', `%${query}%`);
      }

      const { data, error } = await dbQuery;

      if (error) {
        console.error('Error searching:', error);
        setWallpapers([]);
      } else {
        setWallpapers(data as Wallpaper[]);
      }

      setLoading(false);
    }

    fetchWallpapers();
  }, [query, selectedElement]);

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>

          {/* Search Input */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tc('searchPlaceholder')}
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
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-surface-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wallpapers.length > 0 ? (
          <>
            <p className="text-surface-400 mb-6">
              {t('found', { count: wallpapers.length })}
            </p>
            <WallpaperGrid wallpapers={wallpapers} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-surface-400">{tc('noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
