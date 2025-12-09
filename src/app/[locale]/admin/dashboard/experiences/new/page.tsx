'use client';

import NewExperienceForm from '@/app/[locale]/admin/dashboard/experiences/new/NewExperienceForm';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function EditExperiencePage() {
  const { loading, isAuthenticated } = useAuthGuard();

  if (loading) {
    return <p className="p-6 text-center">Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Link href="/admin/dashboard/experiences">
        <div className="flex items-center">
          <ArrowLeft className="inline-block mr-2" size={24} />
          <p className="font-bold">Back to Experience List</p>
        </div>
      </Link>
      <NewExperienceForm />
    </div>
  );
}
