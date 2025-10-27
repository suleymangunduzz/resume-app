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
    <main>
      <Image
        src="/images/profile.jpg"
        alt="profile picture"
        width={150}
        height={150}
      />
      <h1 className="text-3xl font-bold underline">{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
