import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import Header from '@/components/Header';

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

  return (
    <NextIntlClientProvider>
      <section className="bg-[var(--page-bg)] min-h-dvh flex flex-col">
        <Header locale={locale} />

        <main className="pt-[calc(var(--header-height)+16px)] overflow-y-auto">
          {children}
        </main>

        <footer className="h-[var(--footer-height)] text-center py-6 text-sm text-[var(--footer-text)] border-t border-[var(--footer-text)] bg-[var(--footer-bg)] backdrop-blur-md mt-auto">
          {t.rich('footer.text', {
            year: new Date().getFullYear(),
            name: 'Süleyman GÜNDÜZ',
          })}
        </footer>
      </section>
    </NextIntlClientProvider>
  );
}
