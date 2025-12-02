'use client';

import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

import { useAuthGuard } from 'src/hooks/useAuthGuard';
import AdminExperiencesDashboard from '@/app/[locale]/admin/dashboard/experiences/AdminExperiencesDashboard';

export default function AdminExperiencesPage() {
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
      <AdminExperiencesDashboard />
    </div>
  );
}
