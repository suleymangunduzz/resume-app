import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Tab = {
  _id: string;
  isVisible: string;
  key: string;
  path: string;
  displayText: string;
  order: number;
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Shared' });

  const navigationTabs = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/tabs`,
  );

  const tabs: Array<Tab> = await navigationTabs.json();

  const translationMap = {
    comments: t('nav.comments'),
    experiences: t('nav.experiences'),
    about: t('nav.about'),
  } as const;

  return (
    <section>
      <nav className="flex w-full items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md fixed top-0 z-50 shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">{t('nav.title')}</h1>
        <ul className="flex gap-6">
          {tabs
            .sort((a, b) => a.order - b.order)
            .map(({ isVisible, path, key, displayText }) =>
              isVisible ? (
                <li key={key}>
                  <Link
                    href={path}
                    prefetch
                    className={
                      'text-gray-600 hover:text-gray-900 transition-colors cursor-pointer'
                      // pathname === link.href && 'text-blue-600 font-semibold',
                    }
                  >
                    {translationMap[key] || displayText}
                  </Link>
                </li>
              ) : null,
            )}
        </ul>
      </nav>
      <main className="max-w-5xl mx-auto pt-[100px] pb-[100px]">
        {children}
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 border-t fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md">
        {t.rich('footer.text', {
          year: new Date().getFullYear(),
          name: 'Süleyman GÜNDÜZ',
        })}
      </footer>
    </section>
  );
}
