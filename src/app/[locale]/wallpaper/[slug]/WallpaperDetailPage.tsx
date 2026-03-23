'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Wallpaper } from '@/types/genshin';
import { WallpaperDetailClient } from './WallpaperDetailClient';

interface Props {
  slug: string;
}

export function WallpaperDetailPage({ slug }: Props) {
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWallpaper() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        setError(true);
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error: fetchError } = await supabase
        .from('wallpapers')
        .select('*')
        .eq('slug', slug)
        .single();

      if (fetchError || !data) {
        setError(true);
      } else {
        setWallpaper(data as Wallpaper);
      }
      setLoading(false);
    }

    fetchWallpaper();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-genshin-gold"></div>
      </div>
    );
  }

  if (error || !wallpaper) {
    notFound();
  }

  return <WallpaperDetailClient wallpaper={wallpaper} />;
}
