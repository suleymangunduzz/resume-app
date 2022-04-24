import Layout from '../../components/layout'
import Experience from '../../components/experience'
import styles from '../../styles/experience.module.css'

function Experiences({ data }) {
  return (
    <Layout pageTitle='My Work Experiences'>
      <div className={styles.container}>
        {data.map((experience) => <Experience key={experience._id} data={experience} />)}
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${__BASE_API_URL__}/experience`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data: data.sort((a, b) => b.order - a.order) } }
}

export default Experiences