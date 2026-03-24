'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { ELEMENTS, Element, Wallpaper } from '@/types/genshin';

interface Props {
  element: Element;
}

export function ElementDetailClient({ element }: Props) {
  const tc = useTranslations('common');
  const te = useTranslations('elements');
  const elementInfo = ELEMENTS[element];
  
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallpapers() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('wallpapers')
        .select('*')
        .eq('element', element)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching wallpapers:', error);
        setWallpapers([]);
      } else {
        setWallpapers(data as Wallpaper[]);
      }

      setLoading(false);
    }

    fetchWallpapers();
  }, [element]);

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-surface-400 hover:text-genshin-gold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {tc('back')}
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4"
            style={{ backgroundColor: elementInfo.color }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {te(element)}
          </h1>
          <p className="text-surface-400 text-xl">
            {elementInfo.name}
          </p>
          {!loading && (
            <p className="text-surface-500 mt-4">
              {tc('wallpaperCount', { count: wallpapers.length })}
            </p>
          )}
        </div>

        {/* Wallpapers */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-surface-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wallpapers.length > 0 ? (
          <WallpaperGrid wallpapers={wallpapers} />
        ) : (
          <div className="text-center py-12">
            <p className="text-surface-400">{tc('noWallpapers')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
