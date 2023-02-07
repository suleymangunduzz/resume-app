import Link from 'next/link'
import Image from 'next/image'

import { DESCRIPTION, GITHUB_URL, LINKEDIN_URL, NAME } from '../constants'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/home.module.css'

export async function getServerSideProps() {
  const res = await fetch(`${__BASE_API_URL__}/tabs`)
  const tabs = await res.json()

  return { props: { tabs: tabs.sort((a, b) => a.order - b.order) } }
}

export default function Home({ tabs }) {
  return (
    <Layout pageTitle='About Me' tabs={tabs}>
      <section className={utilStyles.headingMd}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/profile.jpg"
            width={150}
            height={150}
            className={`${styles.headerHomeImage} ${styles.borderCircle}`}
            alt={NAME}
          />
        </div>
        <h1 className={utilStyles.heading2Xl}>{NAME}</h1>
        <p>{DESCRIPTION}</p>
        <p>You can contact me on <Link href={LINKEDIN_URL}><a>LinkedIn.</a></Link></p>
        <p>My github <Link href={GITHUB_URL}><a>profile.</a></Link></p>
      </section>
    </Layout>
  )
}
