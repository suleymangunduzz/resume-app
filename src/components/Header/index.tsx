import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LanguageSelector from '@/components/LanguageSelector';
import MobileMenuToggle from '@/components/Header/MobileMenuToggle';

type Tab = {
  _id: string;
  isVisible: string;
  key: string;
  path: string;
  displayText: string;
  order: number;
};

type Props = {
  locale: string;
};

export default async function Header({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Shared' });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tabs`, {
    next: { revalidate: 60 },
  });
  const tabs: Array<Tab> = await res.json();

  const translationMap = {
    comments: t('nav.comments'),
    experiences: t('nav.experiences'),
    about: t('nav.about'),
  } as const;

  const visibleTabs = tabs
    .filter((tab) => tab.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: title */}
        <h1 className="text-xl font-bold tracking-tight">{t('nav.title')}</h1>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6">
          {visibleTabs.map(({ key, path, displayText }) => (
            <li key={key}>
              <Link
                href={path}
                prefetch
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {translationMap[key] || displayText}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: lang + menu toggle */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <MobileMenuToggle /> {/* just toggles a CSS class */}
        </div>
      </div>

      {/* Mobile menu — always rendered server-side */}
      <div
        id="mobileMenu"
        className="md:hidden max-h-0 overflow-hidden transition-all duration-300 bg-white/90 backdrop-blur-md shadow-md border-t"
      >
        <ul className="flex flex-col items-center gap-4 py-4">
          {visibleTabs.map(({ key, path, displayText }) => (
            <li key={key}>
              <Link
                href={path}
                prefetch
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {translationMap[key] || displayText}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
