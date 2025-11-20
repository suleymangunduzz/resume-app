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
        // Call your backend endpoint that requires admin auth
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/check`,
          {
            credentials: 'include', // sends the HttpOnly cookie
          },
        );

        if (!res.ok) {
          // If not authenticated, redirect to login
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
