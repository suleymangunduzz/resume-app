'use client';

import { useAuthGuard } from 'src/hooks/useAuthGuard';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AdminCommentsPage() {
  const { loading, isAuthenticated } = useAuthGuard();

  if (loading) {
    return <p className="p-6 text-center">Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Link href="/admin/dashboard">
        <div className="flex items-center">
          <ArrowLeft className="inline-block mr-2" size={24} />
          <p className="font-bold">Back to Dashboard</p>
        </div>
      </Link>
      This is the experiences admin dashboard page.
    </div>
  );
}
