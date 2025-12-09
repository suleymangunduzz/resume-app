'use client';

import { useParams } from 'next/navigation';

import ExperienceUpdateForm from '@/app/[locale]/admin/dashboard/experiences/[id]/edit/ExperienceUpdateForm';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function EditExperiencePage() {
  const { loading, isAuthenticated } = useAuthGuard();
  const { id: experienceId } = useParams();

  if (loading) {
    return <p className="p-6 text-center">Checking authentication...</p>;
  }

  if (!isAuthenticated || !experienceId) {
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
      <ExperienceUpdateForm experienceId={experienceId as string} />
    </div>
  );
}
