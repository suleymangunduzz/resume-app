import { useState } from 'react'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

import Layout from '../../components/layout'
import Comment from '../../components/comment'
import SimpleSlider from '../../components/SimpleSlider'
import CommentForm from '../../components/commentForm'

function Comments ({ data }) {
  const filteredData = data.filter(comment => comment.show);
  const slideItems = filteredData.map((comment, index) => <Comment key={index} data={comment}/>);
  const showComents = filteredData.length;

  const [showForm, setShowForm] = useState(false);

  return (
    <Layout>
      <Head>
        <title>What People Say</title>
      </Head>
      {showComents ? <SimpleSlider items={slideItems}/> : null}
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
  const res = await fetch(`https://resume-backend-app.herokuapp.com/comments`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data: data.reverse() } }
}

export default Comments