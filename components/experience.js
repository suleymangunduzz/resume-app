import Link from 'next/link';
import {
  getMonth,
  getYear,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

import Text from './text';
import styles from './experience.module.css';
import utilsStyles from '../styles/utils.module.css';

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDate = (date) => {
  const month = monthList[getMonth(new Date(date))];
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

  const yearsText = dateDifferenceInYears
    ? `${dateDifferenceInYears} year${dateDifferenceInYears > 1 ? 's' : ''}`
    : '';

  return `(${yearsText} ${dateDifferenceInMonths % 12} months)`;
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

  return (
    <div className={styles.container}>
      <h1 className={utilsStyles.heading2Xl}>{companyName}</h1>
      <h1 className={utilsStyles.headingMd}>
        {title} - {location}
      </h1>
      <div className={styles.dates}>
        {getDateDiff(beginDate, endDate, stillWorking)} {formatDate(beginDate)}{' '}
        - {stillWorking ? 'Present' : formatDate(endDate)}
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
