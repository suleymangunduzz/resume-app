import Link from 'next/link';
import {
  getMonth,
  getYear,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

import Text from './text';
import styles from './experience.module.css';
import utilsStyles from '@/styles/utils.module.css';
import { MONTH_LIST } from '@/constants';

/*
  TODO: Fix the types for the entire file.
  Create helper methods for the dates with proper types.
*/
const formatDate = (date) => {
  const month = MONTH_LIST[getMonth(new Date(date))];
  const year = getYear(new Date(date));
  return `${year} ${month}`;
};

const getDateDiff = (beginDate, endDate, stillWorking) => {
  const dateDifferenceInMonths = differenceInMonths(
    stillWorking ? new Date().getTime() : new Date(endDate).getTime(),
    new Date(beginDate).getTime()
  );

  const dateDifferenceInYears = differenceInYears(
    stillWorking ? new Date().getTime() : new Date(endDate).getTime(),
    new Date(beginDate).getTime()
  );

  const years = dateDifferenceInYears
    ? `${dateDifferenceInYears} year${dateDifferenceInYears > 1 ? 's ' : ' '}`
    : '';

  const months = `${dateDifferenceInMonths % 12} month${
    dateDifferenceInMonths % 12 > 1 ? 's' : ''
  }`;

  return `(${years}${months})`;
};

export default function Experience({ data }) {
  const {
    companyName,
    title,
    description,
    beginDate,
    endDate,
    stillWorking,
    website,
    techStack,
    location,
  } = data;

  const dateDiff = getDateDiff(beginDate, endDate, stillWorking);
  const experienceStartDate = formatDate(beginDate);
  const experienceEndDate = stillWorking ? 'Present' : formatDate(endDate);

  return (
    <div className={styles.container}>
      <h1 className={utilsStyles.heading2Xl}>{companyName}</h1>
      <h1 className={utilsStyles.headingMd}>
        {title} - {location}
      </h1>
      <div className={styles.dates}>
        {`${dateDiff}, ${experienceStartDate} - ${experienceEndDate}`}
      </div>
      <Text>{description}</Text>
      <h1 className={utilsStyles.headingSm}>Tech Stack</h1>
      <ul>
        {techStack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={website}>Go to company&rsquo;s website</Link>
    </div>
  );
}
