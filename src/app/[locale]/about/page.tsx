import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function Page() {
  const t = useTranslations('AboutPage');

  return (
    <section className="text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {`${t('helloText', { name: 'Sulo' })} 👋`}
      </h1>
      <Image
        src="/images/profile.jpg"
        alt="profile picture"
        className="mx-auto rounded-full mb-6"
        width={150}
        height={150}
      />
      <p className="text-md md:text-lg text-gray-600">{t('description')}</p>
      <br />
      <p className="text-md md:text-lg text-gray-600">
        {t.rich('contactMe', {
          link: (children) => (
            <a
              href="https://www.linkedin.com/in/gunduzsuleyman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {children}
            </a>
          ),
        })}
      </p>
      <br />
      <p className="text-md md:text-lg text-gray-600">
        {t.rich('myGitHub', {
          link: (children) => (
            <a
              href="https://github.com/suleymangunduzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {children}
            </a>
          ),
        })}
      </p>
    </section>
  );
}
