import { getTranslations } from 'next-intl/server';
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
    <section>
      <Header locale={locale} />
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
