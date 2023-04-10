// /pages/index.tsx
import type { NextPage, GetServerSideProps } from 'next';
import { ApiResponse } from '../interfaces/interfaces';
import { fetchData } from '../utils/fetchData';
import DynamicTable from '../components/DynamicTable';

interface HomeProps {
  apiData1: ApiResponse;
  apiData2: ApiResponse;
}

const Home: NextPage<HomeProps> = ({ apiData1, apiData2 }) => {
  return (
    <div>
      <h2>Salesforce</h2>
      <p>https://salesforce.wd1.myworkdayjobs.com/en-US/Futureforce_NewGradRoles</p>
      <DynamicTable apiData={apiData1} />
      <h2>Fidelity</h2>
      <p>https://wd1.myworkdaysite.com/en-US/recruiting/fmr/FidelityCareers</p>
      <DynamicTable apiData={apiData2} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const apiData1 = await fetchData('/api/salesforce'); // Replace with your first endpoint
  const apiData2 = await fetchData('/api/fidelity'); // Replace with your second endpoint

  return {
    props: {
      apiData1,
      apiData2,
    },
  };
};

export default Home;
