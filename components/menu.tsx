import { FC } from 'react';
import Link from 'next/link';
import styles from './menu.module.css';
import { Tab } from '@/types';

const Menu: FC<{ tabs: ReadonlyArray<Tab> }> = ({ tabs }) => (
  <div className={styles.menu}>
    {tabs.map(({ isVisible, key, path, displayText }) =>
      isVisible ? (
        <div className={styles.item} key={key}>
          <Link href={path}>{displayText}</Link>
        </div>
      ) : null
    )}
  </div>
);

export default Menu;
