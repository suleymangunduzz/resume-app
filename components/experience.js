import Link from 'next/link'
import styles from './experience.module.css'
import utilsStyles from '../styles/utils.module.css'

export default function Experience ({ data }) {
  const {
    companyName,
    title,
    description,
    beginDate,
    endDate,
    stillWorking,
    website
  } = data;

  return <div className={styles.container}>
    <h1 className={utilsStyles.heading2Xl}>{companyName}</h1>
    <h1 className={utilsStyles.headingMd}>{title}</h1>
      <div className={styles.dates}>
        {beginDate} - { stillWorking ? 'Present' : endDate}
      </div>
      <p>{description}</p>
    <Link href={website}><a>Go to company's website.</a></Link>
  </div>
}