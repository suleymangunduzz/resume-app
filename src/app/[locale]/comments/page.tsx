import { getTranslations } from 'next-intl/server';
import CommentForm from '@/components/CommentForm';
import CommentCard from '@/app/[locale]/comments/CommentCard';

type Params = Promise<{ locale: string }>;

export type Comment = {
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
  let commentsData: ReadonlyArray<Comment> = [];

  try {
    const comments = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/comments`,
    );
    commentsData = await comments.json();
  } catch (error) {
    commentsData = [];
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-6 text-center text-[var(--card-text)]">
        {t('title')}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 mb-6 p-4">
        {commentsData.map((comment) =>
          comment.show ? (
            <CommentCard key={comment._id} comment={comment} />
          ) : null,
        )}
      </div>

      <div>
        <hr className="my-10 border-[var(--card-subtext)]" />
      </div>

      <CommentForm />
    </section>
  );
}
