'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // important to store HttpOnly cookie
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message ?? 'Login failed');
        return;
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError('An error occurred during login.');
      setLoading(false);
    }
  }

  return (
    <div
      className="h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--page-bg)' }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 rounded-xl shadow-lg border"
        style={{
          background: 'var(--form-bg)',
          color: 'var(--form-text)',
          borderColor: 'var(--form-border)',
        }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm"
            style={{ color: 'var(--form-subtext)' }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-3 rounded-lg border focus:outline-none"
            style={{
              background: 'var(--form-bg)',
              color: 'var(--form-text)',
              borderColor: 'var(--form-border)',
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-sm"
            style={{ color: 'var(--form-subtext)' }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full p-3 rounded-lg border focus:outline-none"
            style={{
              background: 'var(--form-bg)',
              color: 'var(--form-text)',
              borderColor: 'var(--form-border)',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg font-medium transition disabled:opacity-50"
          style={{
            background: 'var(--form-btn-bg)',
            color: 'var(--form-btn-text)',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
