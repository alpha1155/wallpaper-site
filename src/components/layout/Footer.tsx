"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ELEMENTS, REGIONS, Element, Region } from "@/types/genshin";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const elements = Object.entries(ELEMENTS).slice(0, 7) as [Element, typeof ELEMENTS[Element]][];
  const regions = Object.entries(REGIONS).slice(0, 6) as [Region, typeof REGIONS[Region]][];

  return (
    <footer className="border-t border-genshin-gold/10 bg-surface-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-genshin-gold to-genshin-gold-dark flex items-center justify-center">
                <span className="text-surface-950 text-lg font-bold">G</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gradient-gold">GenshinWalls</span>
              </div>
            </Link>
            <p className="text-surface-400 text-sm">
              {t("description")}
            </p>
            <p className="text-surface-500 text-xs mt-4">
              {t("disclaimer")}
            </p>
          </div>

          {/* Elements */}
          <div>
            <h3 className="font-semibold text-genshin-gold mb-4">{t("elements")}</h3>
            <ul className="space-y-2">
              {elements.map(([key, value]) => (
                <li key={key}>
                  <Link
                    href={`/element/${key}`}
                    className="text-surface-400 hover:text-genshin-gold transition-colors flex items-center gap-2 text-sm"
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: value.color }}
                    />
                    {value.name_cn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="font-semibold text-genshin-gold mb-4">{t("regions")}</h3>
            <ul className="space-y-2">
              {regions.map(([key, value]) => (
                <li key={key}>
                  <Link
                    href={`/region/${key}`}
                    className="text-surface-400 hover:text-genshin-gold transition-colors text-sm"
                  >
                    {value.name_cn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-genshin-gold mb-4">{t("links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-surface-400 hover:text-genshin-gold transition-colors text-sm"
                >
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/characters"
                  className="text-surface-400 hover:text-genshin-gold transition-colors text-sm"
                >
                  {tNav("characters")}
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-surface-400 hover:text-genshin-gold transition-colors text-sm"
                >
                  {tNav("search")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-genshin-gold/10">
          <p className="text-center text-surface-500 text-sm">
            © {currentYear} GenshinWalls. {t("copyright")}
          </p>
          <p className="text-center text-surface-600 text-xs mt-2">
            Genshin Impact is a trademark of miHoYo/HoYoverse.
          </p>
        </div>
      </div>
    </footer>
  );
}
