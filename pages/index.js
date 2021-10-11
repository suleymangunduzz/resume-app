import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import homeStyles from '../styles/home.module.css'

const name = 'Süleyman GÜNDÜZ'

export default function Home() {
  return (
    <Layout pageTitle='About Me'>
      <section className={utilStyles.headingMd}>
        <img
          src="/images/profile.jpg"
          className={`${homeStyles.headerHomeImage} ${homeStyles.borderCircle}`}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
        <p>I am a Software Engineer who lives in Luxembourg for a while. I believe that learning has no end and I am always willing to learn about new things and trying hard to improve my skills. </p>
        <p>You can contact me on <Link href="https://www.linkedin.com/in/gunduzsuleyman/"><a>LinkedIn.</a></Link></p>
        <p>My github <Link href="https://github.com/suleymangunduzz"><a>profile.</a></Link></p>
      </section>
    </Layout>
  )
}