'use client';

import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';

export type Experience = {
  _id: string;
  companyName: string;
  title: string;
  description: string;
  beginDate: string;
  endDate: string;
  stillWorking: boolean;
  website: string;
  techStack: string[];
  location: string;
  order: number;
};

export default function AdminExperiencesDashboard() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteExperienceId, setDeleteExperienceId] = useState<string | null>(
    null,
  );

  async function fetchExperiences() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience`,
        { credentials: 'include' },
      );
      if (!res.ok) throw new Error('Failed to fetch experiences');
      const data = await res.json();
      setExperiences(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching experiences');
    } finally {
      setLoading(false);
    }
  }

  async function deleteExperience() {
    if (!deleteExperienceId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience/${deleteExperienceId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!res.ok) throw new Error('Failed to delete experience');

      fetchExperiences();
      setShowDeleteModal(false);
      setDeleteExperienceId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting experience');
    }
  }

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (Boolean(deleteExperienceId)) {
      setShowDeleteModal(true);
    }
  }, [deleteExperienceId]);

  return (
    <section
      className="p-6"
      style={{ background: 'var(--page-bg)', minHeight: '100vh' }}
    >
      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <form
              method="dialog"
              onSubmit={(event) => {
                event.preventDefault();
                deleteExperience();
              }}
            >
              <h3 className="font-bold text-lg mb-4 text-center">
                Delete this experience?
              </h3>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  Yes, delete
                </button>

                <button
                  type="button"
                  className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-semibold mb-6 text-center text-[var(--card-text)]">
        Admin Experiences Dashboard
      </h2>

      {loading && <p>Loading experiences...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <button className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
        <Link href="/admin/dashboard/experiences/new">Add New Experience</Link>
      </button>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="p-4 rounded-xl shadow border hover:shadow-md transition"
            style={{
              background: 'var(--card-bg)',
              color: 'var(--card-text)',
              borderColor: 'var(--card-border)',
            }}
          >
            <h3 className="text-lg font-semibold">{exp.title}</h3>
            <p className="text-sm text-[var(--card-subtext)]">
              {exp.companyName} • {exp.location}
            </p>
            <p className="text-sm text-[var(--card-subtext)]">
              {exp.beginDate} – {exp.stillWorking ? 'Present' : exp.endDate}
            </p>

            <p className="mt-2">{exp.description}</p>

            {exp.website && (
              <p className="mt-1">
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--card-link)' }}
                >
                  Visit website
                </a>
              </p>
            )}

            {exp.techStack.length > 0 && (
              <p className="mt-1 text-sm text-[var(--card-subtext)]">
                Tech Stack: {exp.techStack.join(', ')}
              </p>
            )}

            <p className="mt-1 text-sm">Order: {exp.order}</p>

            {/* ACTION BUTTONS */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setDeleteExperienceId(exp._id)}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
              <Link href={`/admin/dashboard/experiences/${exp._id}/edit`}>
                <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">
                  Edit
                </button>
              </Link>
              <Link href={`/admin/dashboard/experiences/${exp._id}/tech-stack`}>
                <button className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
                  Edit Tech Stack
                </button>
              </Link>
            </div>
          </div>
        ))}

        {experiences.length === 0 && !loading && (
          <p
            className="text-center col-span-full"
            style={{ color: 'var(--card-subtext)' }}
          >
            No experiences found.
          </p>
        )}
      </div>
    </section>
  );
}
