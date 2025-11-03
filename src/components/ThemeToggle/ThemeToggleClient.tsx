'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Cookies from 'js-cookie';

interface Props {
  initialTheme: 'light' | 'dark';
}

export default function ThemeToggleClient({ initialTheme }: Props) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    Cookies.set('theme', theme, { expires: 365 });
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      className="flex items-center gap-2 rounded p-2 transition-colors bg-[var(--icon-btn-bg)] hover:bg-[var(--icon-btn-hover-bg)] text-[var(--icon-btn-color)]"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
