'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { WallpaperGrid } from '@/components/genshin/WallpaperGrid';
import { Wallpaper } from '@/types/genshin';

interface Props {
  slug: string;
}

// 角色名称映射
const CHARACTER_NAMES: Record<string, { name_cn: string; name_en: string; name_ja: string }> = {
  'raiden-shogun': { name_cn: '雷电将军', name_en: 'Raiden Shogun', name_ja: '雷電将軍' },
  'hu-tao': { name_cn: '胡桃', name_en: 'Hu Tao', name_ja: '胡桃' },
  'nahida': { name_cn: '纳西妲', name_en: 'Nahida', name_ja: 'ナヒーダ' },
  'furina': { name_cn: '芙宁娜', name_en: 'Furina', name_ja: 'フリーナ' },
  'zhongli': { name_cn: '钟离', name_en: 'Zhongli', name_ja: '鍾離' },
  'ayaka': { name_cn: '神里绫华', name_en: 'Ayaka', name_ja: '神里綾華' },
  'kazuha': { name_cn: '枫原万叶', name_en: 'Kazuha', name_ja: '楓原万葉' },
  'ganyu': { name_cn: '甘雨', name_en: 'Ganyu', name_ja: '甘雨' },
  'xiao': { name_cn: '魈', name_en: 'Xiao', name_ja: '魈' },
  'yae-miko': { name_cn: '八重神子', name_en: 'Yae Miko', name_ja: '八重神子' },
};

export function CharacterDetailPage({ slug }: Props) {
  const t = useTranslations('characters');
  const tc = useTranslations('common');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  const character = CHARACTER_NAMES[slug];
  const displayName = character?.name_cn || slug;

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
        .contains('character_ids', [slug])
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
  }, [slug]);

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 text-surface-400 hover:text-genshin-gold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToList')}
        </Link>

        {/* Character Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {displayName}
          </h1>
          {character && (
            <p className="text-surface-400">{character.name_en}</p>
          )}
        </div>

        {/* Wallpapers Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-surface-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wallpapers.length > 0 ? (
          <>
            <p className="text-surface-400 mb-6">
              {tc('wallpaperCount', { count: wallpapers.length })}
            </p>
            <WallpaperGrid wallpapers={wallpapers} columns={5} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-surface-400">{tc('noWallpapers')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
