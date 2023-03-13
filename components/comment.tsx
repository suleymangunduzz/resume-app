import styles from './comment.module.css';
import utilsStyles from '@/styles/utils.module.css';
import { FC } from 'react';

type Comment = {
  description: string;
  companyName: string;
  name: string;
  title: string;
};

const Comment: FC<{ comment: Comment }> = ({ comment }) => {
  const { companyName, description, name, title } = comment;

  return (
    <div className={styles.container}>
      <h1 className={utilsStyles.headingXl}>{description}</h1>
      <h1 className={utilsStyles.headingLg}>{name}</h1>
      <h1 className={utilsStyles.headingSm}>{companyName}</h1>
      <h1 className={utilsStyles.headingMd}>{title}</h1>
    </div>
  );
};

export default Comment;
