import { getTranslations } from 'next-intl/server';
import CommentForm from '@/app/[locale]/comments/CommentForm';

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
    <section>
      <h2 className="text-3xl font-semibold mb-6 text-center">{t('title')}</h2>
      <div className="grid gap-6 sm:grid-cols-2 mb-6">
        {commentsData.map(({ description, name, title, companyName, show }) =>
          show ? (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic">“{description}”</p>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">
                  {title} at {companyName}
                </p>
              </div>
            </div>
          ) : null,
        )}
      </div>
      <div>
        <hr className="my-10" />
      </div>
      <CommentForm />
    </section>
  );
}
