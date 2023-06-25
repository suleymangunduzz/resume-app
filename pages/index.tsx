import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';

import Layout from '@/components/layout';
import {
  DESCRIPTION,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
  PAGES,
} from '@/constants';
import { fetchTabs } from '@/service';
import utilStyles from '@/styles/utils.module.css';
import styles from '@/styles/home.module.css';
import { Tab } from '@/types';

export async function getServerSideProps() {
  let tabs: Tab[] = [];

  try {
    tabs = [...(await fetchTabs)].sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      tabs,
    },
  };
}

const Home: FC<{ tabs: Array<Tab> }> = ({ tabs }) => {
  return (
    <Layout pageTitle={PAGES.ABOUT_ME} tabs={tabs}>
      <section className={utilStyles.headingMd}>
        <div className={styles.imageContainer}>
          <Image
            alt={NAME}
            height={150}
            width={150}
            src="/images/profile.jpg"
            className={`${styles.headerHomeImage} ${styles.borderCircle}`}
          />
        </div>
        <h1 className={utilStyles.heading2Xl}>{NAME}</h1>
        <p>{DESCRIPTION}</p>
        <p>
          You can contact me on <Link href={LINKEDIN_URL}>LinkedIn.</Link>
        </p>
        <p>
          My github <Link href={GITHUB_URL}>profile.</Link>
        </p>
      </section>
    </Layout>
  );
};

export default Home;
