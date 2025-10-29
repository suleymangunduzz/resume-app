'use client';

import { useEffect } from 'react';

import config from '@/components/CommentForm/config';

type ActionMessages = {
  successMessage: string;
  errorMessage: string;
  submittingMessage: string;
};

export default function ClientInit({
  actionMessages,
}: {
  actionMessages: ActionMessages;
}) {
  const { successMessage, errorMessage, submittingMessage } = actionMessages;

  useEffect(() => {
    const form = document.getElementById(config.formId) as HTMLFormElement;
    const messageEl = document.getElementById(
      config.messageElementId,
    ) as HTMLDivElement;
    const submitBtn = document.getElementById(
      config.submitButtonId,
    ) as HTMLButtonElement;

    if (!form || !messageEl || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      messageEl.textContent = `⏳ ${submittingMessage}`;

      const formData = new FormData(form);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/add`,
          {
            method: 'POST',
            body: JSON.stringify({
              name: formData.get('name'),
              title: formData.get('title'),
              companyName: formData.get('companyName'),
              description: formData.get('description'),
              show: false,
            }),
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (res.ok) {
          messageEl.textContent = `✅ ${successMessage}`;
          form.reset();
        } else {
          messageEl.textContent = `❌ ${errorMessage}`;
        }
      } catch (err) {
        messageEl.textContent = `❌ ${errorMessage}`;
      } finally {
        submitBtn.disabled = false;
      }
    });
  }, []);
  return null;
}
