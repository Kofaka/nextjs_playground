import { NextPage } from 'next';
// Hocks
import withApollo from 'hocs/withApollo';
// Components
import Home from 'components/Home/Home';

const HomePage: NextPage = () => {
  return <Home />;
};

export default withApollo(HomePage);
