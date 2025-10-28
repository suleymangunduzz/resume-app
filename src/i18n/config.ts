export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr'] as const,
  localeMeta: {
    en: { label: 'English', flag: '🇬🇧' },
    fr: { label: 'Français', flag: '🇫🇷' },
  },
} as const;

export type Locale = (typeof i18n)['locales'][number];
