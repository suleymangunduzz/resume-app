import Link from 'next/link'
import styles from './menu.module.css'

export default function Menu({ tabs }) {
  const visibleTabs = tabs.map(({ isVisible, key, path, displayText }) => isVisible ?
    <div className={styles.item} key={key}>
      <Link href={path}>
        <a>{displayText}</a>
      </Link>
    </div> : null
  );

  return (
    <div className={styles.menu}>
      { visibleTabs }
    </div>
  )
}