'use client';

import { useState } from 'react';

export default function AddExperienceForm() {
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stillWorking, setStillWorking] = useState(false);
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState<number>(1);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStillWorkingChange = () => {
    setStillWorking((prev) => {
      const newVal = !prev;
      if (newVal) setEndDate('');
      return newVal;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            companyName,
            description,
            beginDate,
            endDate: stillWorking ? null : endDate,
            stillWorking,
            order,
          }),
        },
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create experience');
      }

      alert('Experience added successfully!');

      // Reset form
      setTitle('');
      setCompanyName('');
      setDescription('');
      setBeginDate('');
      setEndDate('');
      setStillWorking(false);
      setOrder(1);
    } catch (err: any) {
      setError(err.message || 'Error creating experience');
    } finally {
      setSubmitLoading(false);
    }
  };

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
      <h3 className="text-xl font-semibold mb-4">Add New Experience</h3>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Order */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Order</label>
        <select
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        >
          {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      {/* Company */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Start Date</label>
        <input
          type="date"
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
          checked={stillWorking}
          onChange={handleStillWorkingChange}
          className="w-4 h-4"
        />
        <label className="text-[var(--form-text)]">Still Working Here</label>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        {submitLoading ? 'Submitting...' : 'Add Experience'}
      </button>
    </form>
  );
}
