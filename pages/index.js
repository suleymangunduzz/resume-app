import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/home.module.css'

const name = "Süleyman GÜNDÜZ"
const description = "I am a Software Engineer who lives in Luxembourg for a while. I believe that learning has no end and I am always willing to learn about new things and working hard to improve my skills. "
const linkedInURL = "https://www.linkedin.com/in/gunduzsuleyman/"
const githubURL = "https://github.com/suleymangunduzz"

export default function Home() {
  return (
    <Layout pageTitle='About Me'>
      <section className={utilStyles.headingMd}>
        <img
          src="/images/profile.jpg"
          className={`${styles.headerHomeImage} ${styles.borderCircle}`}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
        <p>{description}</p>
        <p>You can contact me on <Link href={linkedInURL}><a>LinkedIn.</a></Link></p>
        <p>My github <Link href={githubURL}><a>profile.</a></Link></p>
      </section>
    </Layout>
  )
}
