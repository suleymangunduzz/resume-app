import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Params = Promise<{ locale: string }>;
type PageProps = {
  params: Params;
};
type Experience = {
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

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ExperiencesPage' });

  const experienceData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/experience`,
  );
  const experiences: ReadonlyArray<Experience> = await experienceData.json();

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <div>
        {experiences.map(
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
            <div key={id}>
              <h2>
                {title} at{' '}
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {companyName}
                </a>
              </h2>
              <h4>
                {location} | {new Date(beginDate).toLocaleDateString()} -{' '}
                {stillWorking
                  ? t('present')
                  : new Date(endDate).toLocaleDateString()}
              </h4>
              <p>{description}</p>
              <p>
                <strong>{t('techStack')}:</strong> {techStack.join(', ')}
              </p>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
