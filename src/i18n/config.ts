export const locales = ['en', 'zh', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
};

// RTL languages
export const rtlLocales: Locale[] = [];

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
