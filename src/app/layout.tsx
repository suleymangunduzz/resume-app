import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import '@/app/globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body className="bg-gray-50 text-gray-900">{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
