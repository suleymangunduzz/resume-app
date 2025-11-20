'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const formStateIconMap = {
  success: '✅',
  error: '❌',
  submitting: '⏳',
};

export default function CommentForm() {
  const t = useTranslations('CommentsPage.form');
  const [formState, setFormState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const formStateTranslation = {
    idle: '',
    success: t('successMessage'),
    error: t('errorMessage'),
    submitting: t('submittingMessage'),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setFormState('submitting');

    const response = await fetch('/api/comments', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: formData.get('name'),
        title: formData.get('title'),
        companyName: formData.get('companyName'),
        description: formData.get('description'),
      }),
    });

    if (response.status !== 200) {
      setFormState('error');
      return;
    }

    setFormState('success');
    form.reset();
  };

  return (
    <section className="max-w-lg mx-auto space-y-5">
      <h2 className="text-2xl font-semibold text-center text-[var(--form-text)]">
        {t('title')}
      </h2>

      <form
        className="bg-[var(--form-bg)] rounded-2xl shadow-md p-6 space-y-5 m-4"
        onSubmit={handleSubmit}
      >
        {[
          {
            id: 'name',
            label: t('fields.name'),
            placeholder: 'Jane Doe',
            type: 'text',
          },
          {
            id: 'title',
            label: t('fields.title'),
            placeholder: t('fields.titlePlaceholder'),
            type: 'text',
          },
          {
            id: 'companyName',
            label: t('fields.companyName'),
            placeholder: 'TechCorp Inc.',
            type: 'text',
          },
        ].map(({ id, label, placeholder, type }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-[var(--form-subtext)]"
            >
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete={id}
              id={id}
              name={id}
              type={type}
              required
              placeholder={placeholder}
              className="mt-1 block w-full rounded-md border border-[var(--form-border)] p-2 text-[var(--form-text)] bg-[var(--form-bg)] focus:border-[var(--form-border-focus)] focus:ring-2 focus:ring-[var(--form-border-focus)] transition-colors"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[var(--form-subtext)]"
          >
            {t('fields.description')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder={t('fields.descriptionPlaceholder')}
            className="mt-1 block w-full rounded-md border border-[var(--form-border)] p-2 text-[var(--form-text)] bg-[var(--form-bg)] focus:border-[var(--form-border-focus)] focus:ring-2 focus:ring-[var(--form-border-focus)] transition-colors"
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full text-[var(--form-btn-text)] font-semibold py-2 px-4 rounded-md transition-colors bg-[var(--form-btn-bg)] hover:bg-[var(--form-btn-hover-bg)]"
        >
          {t('submitCTAText')}
        </button>

        {formStateTranslation[formState] && (
          <div className="mt-3 text-center font-medium text-[var(--form-subtext)]">
            {`${formStateIconMap[formState]}  ${formStateTranslation[formState]}`}
          </div>
        )}
      </form>
    </section>
  );
}
