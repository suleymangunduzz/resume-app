import { useState } from 'react'

import { KNOW_ME_TEXT } from '../../constants'
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import Comment from '../../components/comment'
import SimpleSlider from '../../components/SimpleSlider'
import CommentForm from '../../components/CommentForm'

export async function getServerSideProps() {
  const fetchComments = fetch(`${__BASE_API_URL__}/comments`).then(res => res.json());
  const fetchTabs = fetch(`${__BASE_API_URL__}/tabs`).then(res => res.json());
  const [comments, tabs] = await Promise.all([fetchComments, fetchTabs]);

  return { props: { data: comments.filter(comment => comment.show), tabs: tabs.sort((a, b) => a.order - b.order) } }
}

function Comments({ data, tabs }) {
  const [showForm, setShowForm] = useState(false);
  const slideItems = data.map((comment) => <Comment key={comment._id} data={comment} />);

  return (
    <Layout pageTitle='What People Say' tabs={tabs}>
      <SimpleSlider items={slideItems} />
      <br />
      <br />
      <h1 className={utilStyles.headingSm} onClick={() => setShowForm((showForm) => !showForm)}>{KNOW_ME_TEXT}</h1>
      {showForm && <CommentForm />}
    </Layout>
  )
}

export default Comments