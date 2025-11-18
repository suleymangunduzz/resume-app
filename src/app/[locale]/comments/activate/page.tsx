'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ActivateCommentPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const t = useTranslations('ActivateCommentPage');

  const [status, setStatus] = useState(t('activatingMessage'));
  const [statusType, setStatusType] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  useEffect(() => {
    if (!token) {
      setStatus(t('invalidOrMissingTokenMessage'));
      setStatusType('error');
      return;
    }

    async function activate() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/activate`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          setStatus(t('successMessage'));
          setStatusType('success');
        } else {
          setStatus(res.statusText || t('activationFailedMessage'));
          setStatusType('error');
        }
      } catch (err) {
        setStatus(t('errorMessage'));
        setStatusType('error');
      }
    }

    activate();
  }, [token]);

  const statusColors = {
    loading: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="flex items-center justify-center px-6">
      <div
        className="max-w-md w-full rounded-xl shadow-lg p-8 border"
        style={{
          background: 'var(--card-bg)',
          color: 'var(--card-text)',
          borderColor: 'var(--form-border)',
        }}
      >
        {statusType === 'loading' && (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-blue-300 dark:border-blue-700 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <p
          className={`text-lg font-medium text-center ${statusColors[statusType]}`}
        >
          {status}
        </p>

        {statusType === 'success' && (
          <p
            className="mt-4 text-center text-sm"
            style={{ color: 'var(--card-subtext)' }}
          >
            {`🎉 ${t('commentIsVisibleMessage')}`}
            <br />
            <br />
            <Link
              href="/comments"
              className="underline ml-1 font-medium font-semibold"
            >
              {t('goToCommentsButton')}
            </Link>
          </p>
        )}

        {statusType === 'error' && (
          <p
            className="mt-4 text-center text-sm"
            style={{ color: 'var(--card-subtext)' }}
          >
            {`⚠️ ${t('contactSupportMessage')}`}
            <br />
            <br />
            <Link
              href="/comments"
              className="underline ml-1 font-medium font-semibold"
            >
              {t('goToCommentsButton')}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
