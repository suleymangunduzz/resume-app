import Link from 'next/link';

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

  const navigationTabs = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/tabs`,
  );

  const tabs: ReadonlyArray<Tab> = await navigationTabs.json();

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
