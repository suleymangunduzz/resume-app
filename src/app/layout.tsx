import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';

import '@/app/globals.css';

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body className="bg-gray-50 text-gray-900">{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
