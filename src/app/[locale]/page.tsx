'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Sparkles } from 'lucide-react';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { ELEMENTS, Element, Wallpaper } from '@/types/genshin';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function HomePage() {
  const t = useTranslations('home');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  const elements = Object.entries(ELEMENTS) as [Element, typeof ELEMENTS[Element]][];

  useEffect(() => {
    async function fetchWallpapers() {
      setLoading(true);
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase config');
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      
      let query = supabase
        .from('wallpapers')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedElement) {
        query = query.eq('element', selectedElement);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching wallpapers:', error);
        setWallpapers([]);
      } else {
        setWallpapers(data as Wallpaper[]);
      }
      
      setLoading(false);
    }

    fetchWallpapers();
  }, [selectedElement]);

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Compact Hero Section */}
      <section className="relative py-8 md:py-12 border-b border-surface-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-genshin-gold/10 border border-genshin-gold/20 mb-3">
                <Sparkles className="w-3 h-3 text-genshin-gold" />
                <span className="text-genshin-gold text-xs font-medium">
                  {t('badge')}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {t('titlePart1')} <span className="text-gradient-gold">{t('titlePart2')}</span>
              </h1>
            </div>

            {/* Right: Quick element filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedElement(null)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedElement === null
                    ? 'bg-genshin-gold text-surface-950'
                    : 'bg-surface-800 text-surface-400 hover:bg-surface-700'
                }`}
              >
                全部
              </button>
              {elements.map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedElement(selectedElement === key ? null : key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedElement === key
                      ? 'text-white'
                      : 'bg-surface-800 text-surface-400 hover:bg-surface-700'
                  }`}
                  style={{
                    backgroundColor: selectedElement === key ? value.color : undefined,
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: value.color }}
                  />
                  {value.name_cn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wallpaper Grid - Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {selectedElement ? ELEMENTS[selectedElement].name_cn + '元素壁纸' : '全部壁纸'}
            <span className="text-surface-500 text-sm font-normal ml-2">
              ({wallpapers.length} 张)
            </span>
          </h2>
          <div className="flex gap-2">
            <Link
              href="/characters"
              className="text-sm text-surface-400 hover:text-genshin-gold transition-colors"
            >
              按角色浏览
            </Link>
            <span className="text-surface-600">|</span>
            <Link
              href="/regions"
              className="text-sm text-surface-400 hover:text-genshin-gold transition-colors"
            >
              按地区浏览
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-surface-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wallpapers.length > 0 ? (
          <WallpaperGrid wallpapers={wallpapers} columns={5} />
        ) : (
          <div className="text-center py-12">
            <p className="text-surface-400">暂无壁纸</p>
          </div>
        )}
      </section>
    </div>
  );
}
