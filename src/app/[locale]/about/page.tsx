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
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--about-heading)]">
        {`${t('helloText', { name: 'Sulo' })} 👋`}
      </h1>

      <Image
        src="/images/profile.jpg"
        alt="profile picture"
        className="mx-auto rounded-full mb-6"
        width={150}
        height={150}
      />

      <p className="text-md md:text-lg mb-4 text-[var(--about-text)]">
        {t('description')}
      </p>

      <p className="text-md md:text-lg mb-4 text-[var(--about-text)]">
        {t.rich('contactMe', {
          link: (children) => (
            <a
              href="https://www.linkedin.com/in/gunduzsuleyman/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[var(--about-link)]"
            >
              {children}
            </a>
          ),
        })}
      </p>

      <p className="text-md md:text-lg text-[var(--about-text)]">
        {t.rich('myGitHub', {
          link: (children) => (
            <a
              href="https://github.com/suleymangunduzz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[var(--about-link)]"
            >
              {children}
            </a>
          ),
        })}
      </p>
    </section>
  );
}
