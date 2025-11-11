'use client';

import React, { useState, FC } from 'react';

import { Comment } from '@/app/[locale]/comments/page';
import { useTranslations } from 'next-intl';

const CommentCard: FC<{ comment: Comment }> = ({ comment }) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const t = useTranslations('CommentsPage.CommentCard');

  const { description, name, title, companyName } = comment;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const language = formData.get('language') as string;

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
          body: JSON.stringify({ text: description, language }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
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
              htmlFor="language"
              className="text-sm font-medium text-[var(--card-subtext)]"
            >
              {t('form.label')}
            </label>

            <input
              id="language"
              name="language"
              type="text"
              required
              placeholder={t('form.placeholder')}
              className="px-2 py-1 rounded-lg border border-[var(--card-border)] text-[var(--card-text)] placeholder-[var(--card-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 p-2 rounded-xl border border-[var(--card-border)] font-small cursor-pointer text-[var(--card-text)] disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isPending ? t('form.buttonTextTranslating') : t('form.buttonText')}
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentCard;
