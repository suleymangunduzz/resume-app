import { useState } from 'react'
import utilStyles from '../../styles/utils.module.css'

import Layout from '../../components/layout'
import Comment from '../../components/comment'
import SimpleSlider from '../../components/SimpleSlider'
import CommentForm from '../../components/commentForm'

function Comments({ data }) {
  const [showForm, setShowForm] = useState(false);
  const slideItems = data.map((comment) => <Comment key={comment._id} data={comment} />);

  return (
    <Layout pageTitle='What People Say'>
      <SimpleSlider items={slideItems} />
      <br />
      <br />
      <h1 className={utilStyles.headingSm} onClick={() => setShowForm((showForm) => !showForm)}>If you know me, you can click on this text and say something :)</h1>
      {showForm && <CommentForm />}
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${__BASE_API_URL__}/comments`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data: data.filter(comment => comment.show) } }
}

export default Comments