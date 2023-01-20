import { NextPage } from 'next';
// Hocks
import withApollo from 'hocs/withApollo';
// Components
import HomePage from 'components/HomePage/HomePage';

const Home: NextPage = () => {
  return <HomePage />;
};

export default withApollo(Home);
