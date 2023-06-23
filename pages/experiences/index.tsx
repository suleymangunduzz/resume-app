import { FC } from 'react';
import Layout from '@/components/layout';
import ExperienceComponent from '@/components/experience';
import { fetchTabs, fetchExperience } from '@/service';
import styles from '@/styles/experience.module.css';
import { Experience, Tab } from '@/types';

export async function getServerSideProps() {
  const [experiences, tabs] = await Promise.all([fetchExperience, fetchTabs]);

  return {
    props: {
      experienceList: [...experiences].sort((a, b) => b.order - a.order),
      tabs: tabs.sort((a, b) => a.order - b.order),
    },
  };
}

const Experiences: FC<{
  experienceList: Array<Experience>;
  tabs: Array<Tab>;
}> = ({ experienceList, tabs }) => {
  return (
    <Layout pageTitle="My Work Experiences" tabs={tabs}>
      <div className={styles.container}>
        {experienceList.map((experience) => (
          <ExperienceComponent key={experience._id} data={experience} />
        ))}
      </div>
    </Layout>
  );
};

export default Experiences;
