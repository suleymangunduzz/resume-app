'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/check`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
            cache: 'no-store',
          },
        );

        if (!res.ok) {
          // Not authenticated → redirect to /[locale]/admin/login
          router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }

        setIsAuthenticated(true);
        setLoading(false);
      } catch {
        setLoading(false);
        setIsAuthenticated(false);
        router.push(`/${locale}/admin/login`);
      }
    }

    checkAuth();
  }, [pathname, router, locale]);

  return { loading, isAuthenticated };
}
