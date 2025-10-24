import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
