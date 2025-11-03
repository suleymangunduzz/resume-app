'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenuToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;

    if (open) {
      menu.classList.remove('max-h-0');
      menu.classList.add('max-h-[400px]');
    } else {
      menu.classList.add('max-h-0');
      menu.classList.remove('max-h-[400px]');
    }
  }, [open]);

  return (
    <button
      onClick={() => setOpen((prev) => !prev)}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="md:hidden p-2 rounded transition-colors bg-[var(--icon-btn-bg)] hover:bg-[var(--icon-btn-hover-bg)] text-[var(--icon-btn-color)]"
    >
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}
