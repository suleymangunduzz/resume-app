import { useState, FC } from 'react';

import { KNOW_ME_TEXT, PAGES } from '@/constants';
import utilStyles from '@/styles/utils.module.css';
import Layout from '@/components/layout';
import CommentComponent from '@/components/comment';
import SimpleSlider from '@/components/SimpleSlider';
import CommentForm from '@/components/CommentForm';
import { fetchComments, fetchTabs } from '@/service';
import { Comment, Tab } from '@/types';

export async function getServerSideProps() {
  try {
    const [comments, tabs] = await Promise.all([fetchComments, fetchTabs]);

    return {
      props: {
        comments: comments.filter((comment) => comment.show),
        tabs: [...tabs].sort((a, b) => a.order - b.order),
      },
    };
  } catch (error) {
    console.error(error);
  }
}

const Comments: FC<{ comments: Array<Comment>; tabs: Array<Tab> }> = ({
  comments,
  tabs,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const slideItems = comments.map((comment) => (
    <CommentComponent key={comment._id} comment={comment} />
  ));

  return (
    <Layout pageTitle={PAGES.WHAT_PEOPLE_SAY} tabs={tabs}>
      <SimpleSlider items={slideItems} />
      <br />
      <br />
      <h1
        className={utilStyles.headingSm}
        onClick={() => setShowForm((showForm) => !showForm)}
      >
        {KNOW_ME_TEXT}
      </h1>
      {showForm && <CommentForm />}
    </Layout>
  );
};

export default Comments;
