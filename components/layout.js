import Head from 'next/head'
import styles from './layout.module.css'
import Menu from './menu'

export const siteTitle = 'Süleyman GÜNDÜZ - Personal BLOG'

export default function Layout({ children, pageTitle }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Contact info and my work experiences."
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{pageTitle}</title>
      </Head>
      <header className={styles.header}>
        <Menu />
      </header>
      <main>{children}</main>
    </div>
  )
}
