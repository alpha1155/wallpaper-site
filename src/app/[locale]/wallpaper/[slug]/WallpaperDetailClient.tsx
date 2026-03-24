'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Download, Eye, ArrowLeft, ExternalLink } from 'lucide-react';
import { ELEMENTS, REGIONS } from '@/types/genshin';

interface WallpaperData {
  id: string;
  title: string;
  slug: string;
  preview_url: string;
  thumbnail_url: string;
  download_urls: {
    mobile?: string;
    desktop?: string;
    desktop_2k?: string;
    desktop_4k?: string;
    ultrawide?: string;
  };
  element?: string;
  region?: string;
  character_ids: string[];
  tags: string[];
  source: string;
  artist_name?: string;
  artist_url?: string;
  view_count: number;
  download_count: number;
}

interface Props {
  wallpaper: WallpaperData;
}

export function WallpaperDetailClient({ wallpaper }: Props) {
  const t = useTranslations('wallpaper');
  const tc = useTranslations('common');
  const te = useTranslations('elements');
  const tr = useTranslations('regions');
  
  // Safe access to element and region info
  const elementKey = wallpaper.element as keyof typeof ELEMENTS | undefined;
  const regionKey = wallpaper.region as keyof typeof REGIONS | undefined;
  const elementInfo = elementKey ? ELEMENTS[elementKey] : null;
  const regionInfo = regionKey ? REGIONS[regionKey] : null;

  const formatCount = (count: number | null | undefined) => {
    const num = count || 0;
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const sourceLabels: Record<string, string> = {
    official: t('official'),
    fanart: t('fanart'),
    ai: t('ai'),
    screenshot: t('screenshot'),
  };

  // Safe access to download_urls
  const downloadUrls = wallpaper.download_urls || {};
  const downloadOptions = [
    { key: 'mobile', label: t('mobile'), url: downloadUrls.mobile },
    { key: 'desktop', label: t('desktop'), url: downloadUrls.desktop },
    { key: 'desktop_2k', label: t('desktop2k'), url: downloadUrls.desktop_2k },
    { key: 'desktop_4k', label: t('desktop4k'), url: downloadUrls.desktop_4k },
    { key: 'ultrawide', label: t('ultrawide'), url: downloadUrls.ultrawide },
  ].filter((opt) => opt.url);

  // Safe access to tags
  const tags = wallpaper.tags || [];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-900 border border-surface-800">
              <Image
                src={wallpaper.preview_url}
                alt={wallpaper.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {wallpaper.title}
              </h1>
              <div className="flex items-center gap-4 text-surface-400 text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatCount(wallpaper.view_count)} {t('viewCount')}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {formatCount(wallpaper.download_count)} {t('downloadCount')}
                </span>
              </div>
            </div>

            {/* Meta info */}
            <div className="space-y-3">
              {elementInfo && elementKey && (
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: elementInfo.color }}
                  />
                  <span className="text-surface-300">{te(elementKey)}</span>
                </div>
              )}
              {regionInfo && regionKey && (
                <div className="text-surface-300">
                  {tr(regionKey)}
                </div>
              )}
              <div className="text-surface-400 text-sm">
                {t('source')}: {sourceLabels[wallpaper.source] || wallpaper.source}
              </div>
              {wallpaper.artist_name && (
                <div className="text-surface-400 text-sm flex items-center gap-2">
                  {t('artist')}: 
                  {wallpaper.artist_url ? (
                    <a
                      href={wallpaper.artist_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-genshin-gold hover:underline flex items-center gap-1"
                    >
                      {wallpaper.artist_name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span>{wallpaper.artist_name}</span>
                  )}
                </div>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div>
                <h3 className="text-surface-300 text-sm mb-2">{t('tags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-800 text-surface-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Download Options */}
            <div>
              <h3 className="text-surface-300 text-sm mb-3">{t('downloadOptions')}</h3>
              <div className="space-y-2">
                {downloadOptions.length > 0 ? (
                  downloadOptions.map((opt) => (
                    <a
                      key={opt.key}
                      href={opt.url}
                      download
                      className="flex items-center justify-between w-full px-4 py-3 bg-surface-900 hover:bg-surface-800 border border-surface-700 hover:border-genshin-gold/30 rounded-lg transition-all group"
                    >
                      <span className="text-surface-300 group-hover:text-white">
                        {opt.label}
                      </span>
                      <Download className="w-4 h-4 text-surface-500 group-hover:text-genshin-gold" />
                    </a>
                  ))
                ) : (
                  <p className="text-surface-500 text-sm">{tc('noDownloadOptions')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
