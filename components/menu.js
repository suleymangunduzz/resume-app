import Link from 'next/link'
import styles from './menu.module.css'

export default function Menu () {
  return <div className={styles.menu}>
    <div className={styles.item}><Link href="/"><a>About</a></Link></div>
    <div className={styles.item}><Link href="/experiences"><a>Experiences</a></Link></div>
    <div className={styles.item}><Link href="/comments"><a>Comments</a></Link></div>
    {/* <div className={styles.item}><Link href="/blog"><a>Blog</a></Link></div> */}
  </div>
}