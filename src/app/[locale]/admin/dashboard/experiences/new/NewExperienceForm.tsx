'use client';

import { useState, useRef } from 'react';

export default function AddExperienceForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Dynamic fields in local state
  const [stillWorking, setStillWorking] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStillWorkingChange = () => {
    setStillWorking((prev) => {
      const newVal = !prev;
      if (newVal) setEndDate('');
      return newVal;
    });
  };

  const handleAddTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      const formData = new FormData(formRef.current!);

      const dataToSend = {
        title: formData.get('title'),
        companyName: formData.get('companyName'),
        location: formData.get('location'),
        description: formData.get('description'),
        beginDate: formData.get('beginDate'),
        endDate: stillWorking ? null : endDate,
        stillWorking,
        order: Number(formData.get('order')),
        website: formData.get('website'),
        techStack,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience/add`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        },
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create experience');
      }

      alert('Experience added successfully!');

      // Reset uncontrolled fields
      formRef.current?.reset();

      // Reset local state
      setStillWorking(false);
      setEndDate('');
      setTechStack([]);
      setTechInput('');
    } catch (err: any) {
      setError(err.message || 'Error creating experience');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
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
          name="order"
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
          name="title"
          required
          placeholder="e.g., Senior Developer"
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
          name="companyName"
          required
          placeholder="e.g., Tech Corp"
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          name="location"
          required
          placeholder="City, Country"
          className="w-full px-3 py-2 rounded border"
          style={{
            background: 'var(--form-bg)',
            color: 'var(--form-text)',
            borderColor: 'var(--form-border)',
          }}
        />
      </div>

      {/* Website */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Website</label>
        <input
          type="text"
          name="website"
          placeholder="https://example.com"
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
          name="beginDate"
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

      {/* Tech Stack */}
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
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          rows={5}
          required
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
