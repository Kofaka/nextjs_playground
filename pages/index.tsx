import { NextPage } from 'next';
// Layout
import Head from 'layouts/Head/Head';
// Components
import HomePage from 'components/HomePage/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <Head
        title="Create Next App"
        description="Generated by create next app"
      />

      <HomePage />
    </>
  );
};

export default Home;
