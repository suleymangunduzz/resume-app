'use client';

import { Link } from '@/i18n/navigation';
import { useAuthGuard } from 'src/hooks/useAuthGuard';

export default function DashboardPage() {
  const { loading, isAuthenticated } = useAuthGuard();

  if (loading) {
    return <p className="p-6 text-center">Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="
    rounded-xl 
    shadow 
    border 
    p-6
    transition 
    bg-[var(--card-bg)] 
    border-[var(--header-border)]
    text-[var(--card-text)]
  "
    >
      <h3 className="text-xl font-semibold mb-1 text-[var(--card-text)]">
        Admin Routes
      </h3>

      <p className="text-sm text-[var(--card-subtext)]">
        Navigate to the page to edit data.
      </p>

      <nav className="mt-5">
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href="/admin/dashboard/comments"
              className="
            block 
            px-4 py-2 
            rounded-lg 
            transition
            bg-[var(--card-bg)]
            text-[var(--card-text)]
            hover:bg-[var(--card-hover)]
            hover:text-[var(--card-text)]
          "
            >
              Comments
            </Link>
          </li>

          <li>
            <Link
              href="/admin/dashboard/experiences"
              className="
            block 
            px-4 py-2 
            rounded-lg 
            transition
            bg-[var(--card-bg)]
            text-[var(--card-text)]
            hover:bg-[var(--card-hover)]
            hover:text-[var(--card-text)]
          "
            >
              Work Experience
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
