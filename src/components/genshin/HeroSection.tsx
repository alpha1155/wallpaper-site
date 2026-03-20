'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Sparkles, Download, Users } from 'lucide-react';
import { ELEMENTS, Element } from '@/types/genshin';

export function HeroSection() {
  const t = useTranslations('home');
  const elements = Object.entries(ELEMENTS) as [Element, typeof ELEMENTS[Element]][];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-genshin-gradient" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Floating elements decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {elements.map(([key, value], i) => (
          <div
            key={key}
            className="absolute w-32 h-32 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{
              backgroundColor: value.color,
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-genshin-gold/10 border border-genshin-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-genshin-gold" />
            <span className="text-genshin-gold text-sm font-medium">
              {t('badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">{t('titlePart1')}</span>
            <br />
            <span className="text-gradient-gold">{t('titlePart2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-surface-300 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/characters"
              className="btn-primary px-8 py-3 text-base"
            >
              <Users className="w-5 h-5 mr-2" />
              {t('browseCharacters')}
            </Link>
            <Link
              href="/search"
              className="btn-secondary px-8 py-3 text-base"
            >
              <Download className="w-5 h-5 mr-2" />
              {t('downloadNow')}
            </Link>
          </div>

          {/* Element quick filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {elements.map(([key, value]) => (
              <Link
                key={key}
                href={`/element/${key}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-900/50 border border-surface-700 hover:border-genshin-gold/30 transition-all group"
              >
                <span
                  className="w-4 h-4 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: value.color }}
                />
                <span className="text-surface-300 group-hover:text-white text-sm">
                  {value.name_cn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
