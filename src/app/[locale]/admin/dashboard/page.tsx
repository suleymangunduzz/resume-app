'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminCommentsDashboard from './AdminCommentsDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/check`,
          {
            credentials: 'include',
          },
        );

        if (!res.ok) {
          router.push('/admin/login');
        } else {
          setLoading(false);
        }
      } catch {
        router.push('/admin/login');
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <p className="p-6 text-center">Checking authentication...</p>;
  }

  return <AdminCommentsDashboard />;
}
