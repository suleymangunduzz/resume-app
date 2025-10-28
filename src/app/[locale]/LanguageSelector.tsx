'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { i18n } from '@/i18n/config';

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();

  const currentLocale = (params?.locale as string) || i18n.defaultLocale;
  const currentLabel = i18n.localeMeta[currentLocale].label;
  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Change language (current: ${currentLabel})`}
      >
        <span aria-hidden="true">{i18n.localeMeta[currentLocale].flag}</span>
      </button>

      {open && (
        <div
          className="absolute mt-2 right-0 w-32 bg-white border rounded shadow-lg z-10"
          role="menu"
          aria-label="Select language"
        >
          {i18n.locales
            .filter((loc) => loc !== currentLocale)
            .map((loc) => (
              <Link
                key={loc}
                href={pathname.replace(`/${currentLocale}`, `/${loc}`)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">{i18n.localeMeta[loc].flag}</span>
                <span>{i18n.localeMeta[loc].label}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
