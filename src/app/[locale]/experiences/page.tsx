import { getTranslations } from 'next-intl/server';

type Params = Promise<{ locale: string }>;

type PageProps = {
  params: Params;
};

export type Experience = {
  _id: string;
  companyName: string;
  title: string;
  description: string;
  beginDate: string;
  endDate: string;
  stillWorking: boolean;
  website: string;
  techStack: string[];
  location: string;
  order: number;
};

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ExperiencesPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

// Helper to format duration and dates
function formatDuration(
  beginDate: string,
  endDate: string | null,
  stillWorking: boolean,
  t: any,
) {
  const start = new Date(beginDate);
  const end = stillWorking ? new Date() : new Date(endDate!);

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: Array<string> = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? t('year') : t('years')}`);
  if (remainingMonths > 0)
    parts.push(
      `${remainingMonths} ${remainingMonths === 1 ? t('month') : t('months')}`,
    );

  const startStr = start.toLocaleString('default', {
    year: 'numeric',
    month: 'long',
  });
  const endStr = stillWorking
    ? t('present')
    : end.toLocaleString('default', { year: 'numeric', month: 'long' });

  return `(${parts.join(' ') || '0 months'}), ${startStr} - ${endStr}`;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ExperiencesPage' });
  let experiences: Array<Experience> = [];

  try {
    const experienceData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience`,
      { credentials: 'include' },
    );
    experiences = await experienceData.json();
  } catch (error) {
    experiences = [];
  }

  return (
    <section>
      <h1 className="text-3xl font-semibold text-center mb-4 text-[var(--card-text)]">
        {t('title')}
      </h1>
      <p className="text-center mb-2 md:mb-10 text-[var(--card-subtext)] px-4">
        {t('description')}
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 md:p-4 lg:gap-6">
        {experiences
          .sort((a, b) => a.order - b.order)
          .map(
            ({
              _id: id,
              companyName,
              title,
              description,
              beginDate,
              endDate,
              stillWorking,
              website,
              techStack,
              location,
            }) => (
              <div
                key={id}
                className="rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 m-3 lg:m-0 bg-[var(--card-bg)] hover:bg-[var(--card-hover)]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--card-text)] hover:text-[var(--card-link)] transition-colors">
                      {title} at{' '}
                      {website ? (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-[var(--card-link)]"
                        >
                          {companyName}
                        </a>
                      ) : (
                        companyName
                      )}
                    </h2>
                    <h4 className="text-sm mt-1 text-[var(--card-subtext)]">
                      {location} |{' '}
                      {formatDuration(beginDate, endDate, stillWorking, t)}
                    </h4>
                  </div>

                  <p className="mt-4 italic text-[var(--card-subtext)]">
                    {description}
                  </p>

                  {techStack.length > 0 && (
                    <p className="mt-4 text-sm text-[var(--card-subtext)]">
                      <strong>{t('techStack')}:</strong> {techStack.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
      </div>
    </section>
  );
}
