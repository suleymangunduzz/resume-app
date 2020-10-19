import styles from './comment.module.css'
import utilsStyles from '../styles/utils.module.css'

export default function Comment ({ data }) {
  const {
    companyName,
    description,
    name,
    title,
    show
  } = data;

  return show ? <div className={styles.container}>
  <h1 className={utilsStyles.headingXl}>{description}</h1>
  <h1 className={utilsStyles.headingLg}>{name}</h1>
  <h1 className={utilsStyles.headingSm}>{companyName}</h1>
  <h1 className={utilsStyles.headingMd}>{title}</h1>
  </div> : null;
}