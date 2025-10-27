import { getTranslations } from 'next-intl/server';

type Params = Promise<{ locale: string }>;

type Comment = {
  _id: string;
  description: string;
  companyName: string;
  name: string;
  title: string;
  show: boolean;
};

type PageProps = {
  params: Params;
};

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CommentsPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CommentsPage' });

  const comments = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments`,
  );
  const commentsData: ReadonlyArray<Comment> = await comments.json();

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <div>
        {commentsData.map(
          ({ _id: id, name, title, companyName, show, description }) =>
            show ? (
              <div key={id} style={{ marginBottom: '20px' }}>
                <h3>
                  {name} - {title} at {companyName}
                </h3>
                <p>{description}</p>
              </div>
            ) : null,
        )}
      </div>
    </main>
  );
}

// export const addComment = (comment) =>
//   fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/comments/add`, {
//     body: JSON.stringify({ ...comment, show: false }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//   });
