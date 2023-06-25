import { FC } from 'react';
import Layout from '@/components/layout';
import ExperienceComponent from '@/components/experience';
import { fetchTabs, fetchExperience } from '@/service';
import styles from '@/styles/experience.module.css';
import { Experience, Tab } from '@/types';
import { PAGES } from '@/constants';

export async function getServerSideProps() {
  let props: {
    experienceList: ReadonlyArray<Experience>;
    tabs: ReadonlyArray<Tab>;
  } = { experienceList: [], tabs: [] };
  try {
    const [experiences, tabs] = await Promise.all([fetchExperience, fetchTabs]);

    props = {
      experienceList: [...experiences].sort((a, b) => b.order - a.order),
      tabs: [...tabs].sort((a, b) => a.order - b.order),
    };
  } catch (error) {
    console.error(error);
  }

  return { props };
}

const Experiences: FC<{
  experienceList: Array<Experience>;
  tabs: Array<Tab>;
}> = ({ experienceList, tabs }) => {
  return (
    <Layout pageTitle={PAGES.MY_WORK_EXPERIENCE} tabs={tabs}>
      <div className={styles.container}>
        {experienceList.map((experience) => (
          <ExperienceComponent key={experience._id} data={experience} />
        ))}
      </div>
    </Layout>
  );
};

export default Experiences;
