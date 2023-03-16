import Layout from '@/components/layout';
import Experience from '@/components/experience';
import styles from '@/styles/experience.module.css';

export async function getServerSideProps() {
  const fetchExperience = fetch(`${__BASE_API_URL__}/experience`).then((res) =>
    res.json()
  );
  const fetchTabs = fetch(`${__BASE_API_URL__}/tabs`).then((res) => res.json());
  const [experiences, tabs] = await Promise.all([fetchExperience, fetchTabs]);

  return {
    props: {
      data: experiences.sort((a, b) => b.order - a.order),
      tabs: tabs.sort((a, b) => a.order - b.order),
    },
  };
}

function Experiences({ data, tabs }) {
  return (
    <Layout pageTitle="My Work Experiences" tabs={tabs}>
      <div className={styles.container}>
        {data.map((experience) => (
          <Experience key={experience._id} data={experience} />
        ))}
      </div>
    </Layout>
  );
}

export default Experiences;
