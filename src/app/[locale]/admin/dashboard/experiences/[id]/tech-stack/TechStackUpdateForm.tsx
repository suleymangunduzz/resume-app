'use client';

import { useEffect, useState } from 'react';

import { Experience } from '@/app/[locale]/experiences/page';

type TechStackUpdateFormProps = {
  experienceId: string;
};

export default function TechStackUpdateForm({
  experienceId,
}: TechStackUpdateFormProps) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchExperience() {
      setLoading(true);
      setFetchingError('');

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience/${experienceId}`,
          { credentials: 'include' },
        );

        if (!res.ok) throw new Error('Failed to fetch experience');

        const data: Experience = await res.json();
        setExperience(data);
        setTechStack(data.techStack ?? []);
      } catch (err: any) {
        setFetchingError(err.message || 'Error fetching experience');
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, [experienceId]);

  const handleAddTech = () => {
    const trimmed = techInput.trim();

    if (!trimmed) return;

    if (
      techStack.some((tech) => tech.toLowerCase() === trimmed.toLowerCase())
    ) {
      setError('This technology already exists in the list.');
      return;
    }

    setTechStack((prev) => [...prev, trimmed]);
    setTechInput('');
    setError('');
  };

  const handleRemoveTech = (indexToRemove: number) => {
    setTechStack((prev) =>
      prev.filter((_, techIndex) => techIndex !== indexToRemove),
    );
  };

  const handleTechChange = (index: number, value: string) => {
    setTechStack((prev) =>
      prev.map((tech, techIndex) => (techIndex === index ? value : tech)),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTechStack = techStack
      .map((tech) => tech.trim())
      .filter((tech) => Boolean(tech));

    if (normalizedTechStack.length !== techStack.length) {
      setError('Tech stack items cannot be empty.');
      return;
    }

    const hasDuplicateTech =
      new Set(normalizedTechStack.map((tech) => tech.toLowerCase())).size !==
      normalizedTechStack.length;

    if (hasDuplicateTech) {
      setError('Tech stack cannot contain duplicate items.');
      return;
    }

    if (normalizedTechStack.length < 3) {
      setError('Tech stack must contain at least 3 items.');
      return;
    }

    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience/${experienceId}/tech-stack`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ techStack: normalizedTechStack }),
        },
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update tech stack');
      }

      alert('Tech stack updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Error updating tech stack');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p>Loading experience...</p>;
  if (fetchingError) return <p className="text-red-600">{fetchingError}</p>;
  if (!experience) return <p>No experience found.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-xl shadow border max-w-md mx-auto"
      style={{
        background: 'var(--card-bg)',
        color: 'var(--card-text)',
        borderColor: 'var(--card-border)',
      }}
    >
      <h3 className="text-xl font-semibold mb-4">Update Tech Stack</h3>
      <p className="text-sm text-[var(--card-subtext)] mb-4">
        {experience.title} at {experience.companyName}
      </p>

      {(error || techStack.length < 3) && (
        <p className="text-red-600 mb-3">
          {error || 'Tech stack must contain at least 3 items.'}
        </p>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Tech Stack</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            className="flex-1 px-3 py-2 rounded border"
            style={{
              background: 'var(--form-bg)',
              color: 'var(--form-text)',
              borderColor: 'var(--form-border)',
            }}
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {techStack.map((tech, index) => (
            <div key={`${tech}-${index}`} className="flex gap-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(index, e.target.value)}
                className="flex-1 px-3 py-2 rounded border"
                style={{
                  background: 'var(--form-bg)',
                  color: 'var(--form-text)',
                  borderColor: 'var(--form-border)',
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveTech(index)}
                className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitLoading || techStack.length < 3}
        className="w-full py-2 rounded text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'var(--form-btn-bg)',
        }}
      >
        {submitLoading ? 'Updating...' : 'Update Tech Stack'}
      </button>
    </form>
  );
}
