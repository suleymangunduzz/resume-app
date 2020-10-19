import Link from 'next/link'
import styles from './experience.module.css'
import utilsStyles from '../styles/utils.module.css'
import { getMonth, getYear } from 'date-fns'

const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Experience ({ data }) {
  const {
    companyName,
    title,
    description,
    beginDate,
    endDate,
    stillWorking,
    website,
    techStack
  } = data;

  const formatDate = date => {
    const month = monthList[getMonth(new Date(date))];
    const year = getYear(new Date(date));

    return `${year} ${month}`;
  }

  return <div className={styles.container}>
    <h1 className={utilsStyles.heading2Xl}>{companyName}</h1>
    <h1 className={utilsStyles.headingMd}>{title}</h1>
      <div className={styles.dates}>
        {formatDate(beginDate)} - { stillWorking ? 'Present' : formatDate(endDate)}
      </div>
      <p>{description}</p>
      <h1 className={utilsStyles.headingSm}>Tech Stack</h1>
      <ul>
        {techStack?.map((item, index) => <li key={index}>{item}</li> )}
      </ul>
    <Link href={website}><a>Go to company's website</a></Link>
  </div>
}