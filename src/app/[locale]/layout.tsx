import { Tab } from '@/types';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const navigationTabs = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/tabs`,
  );
  const tabs: Array<Tab> = await navigationTabs.json();

  return (
    <section>
      <nav>
        <ul>
          {tabs.map((tab) =>
            tab.isVisible ? (
              <li key={tab._id}>
                <Link href={`/${locale}${tab.path}`}>{tab.displayText}</Link>
              </li>
            ) : null,
          )}
        </ul>
      </nav>
      {children}
    </section>
  );
}
