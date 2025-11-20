'use client';

import React, { useState, FC } from 'react';

import { Comment } from '@/app/[locale]/comments/page';
import { useLocale, useTranslations } from 'next-intl';

const VALID_LANGUAGES_MAP = {
  en: { name: 'English', code: 'en', originalName: 'English' },
  es: { name: 'Spanish', code: 'es', originalName: 'Español' },
  fr: { name: 'French', code: 'fr', originalName: 'Français' },
  de: { name: 'German', code: 'de', originalName: 'Deutsch' },
  zh: { name: 'Chinese', code: 'zh', originalName: '中文' },
  ja: { name: 'Japanese', code: 'ja', originalName: '日本語' },
  ru: { name: 'Russian', code: 'ru', originalName: 'Русский' },
  it: { name: 'Italian', code: 'it', originalName: 'Italiano' },
  pt: { name: 'Portuguese', code: 'pt', originalName: 'Português' },
  ar: { name: 'Arabic', code: 'ar', originalName: 'العربية' },
  hi: { name: 'Hindi', code: 'hi', originalName: 'हिन्दी' },
  tr: { name: 'Turkish', code: 'tr', originalName: 'Türkçe' },
  ko: { name: 'Korean', code: 'ko', originalName: '한국어' },
  nl: { name: 'Dutch', code: 'nl', originalName: 'Nederlands' },
  sv: { name: 'Swedish', code: 'sv', originalName: 'Svenska' },
  no: { name: 'Norwegian', code: 'no', originalName: 'Norsk' },
  da: { name: 'Danish', code: 'da', originalName: 'Dansk' },
  fi: { name: 'Finnish', code: 'fi', originalName: 'Suomi' },
  pl: { name: 'Polish', code: 'pl', originalName: 'Polski' },
  cs: { name: 'Czech', code: 'cs', originalName: 'Čeština' },
  el: { name: 'Greek', code: 'el', originalName: 'Ελληνικά' },
} as const;

const CommentCard: FC<{ comment: Comment }> = ({ comment }) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const locale = useLocale();

  const t = useTranslations('CommentsPage.CommentCard');

  const { description, name, title, companyName } = comment;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const languageCode = formData.get('languageCode') as string;

    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/utility/translate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ text: description, languageCode }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      if (data.translated) {
        setTranslatedText(data.translated);
      }

      form.reset();
    } catch (error) {
      setError(error.message || 'An unknown error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 shadow-md hover:shadow-lg transition bg-[var(--card-bg)] hover:bg-[var(--card-hover)]">
      <p className="italic text-[var(--card-subtext)]">
        “{translatedText || description}”
      </p>

      <div className="mt-4">
        <h3 className="font-semibold text-[var(--card-text)]">{name}</h3>
        <p className="text-sm text-[var(--card-subtext)]">
          {title} at {companyName}
        </p>
      </div>

      {translatedText ? (
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-[var(--card-border)] px-3 py-1 mt-4 text-sm text-[var(--card-text)] transition"
          onClick={() => setTranslatedText(null)}
        >
          {t('buttonTextOriginal')}
        </button>
      ) : (
        <form
          className="flex flex-wrap justify-end mt-6 gap-3 border-t border-[var(--card-border)] pt-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="languageCode"
              className="text-sm font-medium text-[var(--card-subtext)]"
            >
              {t('form.label')}
            </label>

            <select
              id="languageCode"
              name="languageCode"
              required
              className="px-2 py-1 rounded-lg border border-[var(--card-border)] text-[var(--card-text)] placeholder-[var(--card-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            >
              <option value="" disabled selected>
                {t('form.selectLanguage')}
              </option>
              {Object.entries(VALID_LANGUAGES_MAP).map(
                ([code, { originalName }]) =>
                  code === locale ? null : (
                    <option key={code} value={code}>
                      {originalName}
                    </option>
                  ),
              )}
            </select>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="p-2 rounded-xl border border-[var(--card-border)] font-small cursor-pointer text-[var(--card-text)] disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isPending ? t('form.buttonTextTranslating') : t('form.buttonText')}
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentCard;
