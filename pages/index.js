import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am a Software Engineer who lives in Istanbul for a while. I believe that learning has no end and I am always willing to learn about new things and trying hard to improve my skills. </p>
        <p>You can contact me on <Link href="https://www.linkedin.com/in/gunduzsuleyman/"><a>LinkedIn.</a></Link></p>
      </section>
    </Layout>
  )
}