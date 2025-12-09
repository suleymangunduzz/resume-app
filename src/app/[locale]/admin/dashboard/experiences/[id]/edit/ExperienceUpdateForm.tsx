'use client';

import { useEffect, useState } from 'react';
import { Experience } from '@/app/[locale]/experiences/page';

type ExperienceUpdateFormProps = {
  experienceId: string;
};

function formatDateForInput(dateStr: string | null) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ExperienceUpdateForm({
  experienceId,
}: ExperienceUpdateFormProps) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const [error, setError] = useState('');

  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stillWorking, setStillWorking] = useState(false);

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

        // Initialize form fields
        setBeginDate(formatDateForInput(data.beginDate));
        setEndDate(formatDateForInput(data.endDate));
        setStillWorking(data.stillWorking);
      } catch (err: any) {
        setFetchingError(err.message || 'Error fetching experience');
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, [experienceId]);

  const handleStillWorkingChange = () => {
    setStillWorking((prev) => {
      const newVal = !prev;

      if (newVal) {
        setEndDate('');
      } else {
        if (experience?.endDate) {
          setEndDate(formatDateForInput(experience.endDate));
        }
      }

      return newVal;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience/${experienceId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            beginDate,
            endDate: stillWorking ? null : endDate,
            stillWorking,
            description: experience?.description ?? '',
          }),
        },
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update experience');
      }

      alert('Experience updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Error updating experience');
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
      <h3 className="text-xl font-semibold mb-4">{experience.title}</h3>
      <p className="text-sm text-[var(--card-subtext)] mb-4">
        {experience.companyName} • {experience.location}
      </p>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Begin Date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Start Date</label>
        <input
          type="date"
          name="beginDate"
          value={beginDate}
          onChange={(e) => setBeginDate(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={stillWorking}
          className={`w-full px-3 py-2 rounded border ${
            stillWorking ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      {/* Still Working */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="stillWorking"
          checked={stillWorking}
          onChange={handleStillWorkingChange}
          id="stillWorking"
          className="w-4 h-4"
        />
        <label htmlFor="stillWorking" className="text-[var(--form-text)]">
          Still Working Here
        </label>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={experience.description}
          rows={5}
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={submitLoading}
        className="w-full py-2 rounded text-white font-medium"
        style={{
          background: 'var(--form-btn-bg)',
        }}
      >
        {submitLoading ? 'Updating...' : 'Update Experience'}
      </button>
    </form>
  );
}
