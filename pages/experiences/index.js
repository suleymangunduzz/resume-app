import Head from 'next/head'
import Layout from '../../components/layout'
import Experience from '../../components/experience'

function Experiences ({ data }) {
  return (
    <Layout>
      <Head>
        <title>My Work Experiences</title>
      </Head>
      { data.sort((a,b) => a.order - b.order).map((experience, index) => <Experience key={index} data={experience}/>) }
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${__BASE_API_URL__}/experience`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data: data.reverse() } }
}

export default Experiences