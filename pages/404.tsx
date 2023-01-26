import { NextPage } from 'next';
// Hocks
import withApollo from 'hocs/withApollo';
// Components
import NotFound from 'components/NotFound/NotFound';

const _404Page: NextPage = () => {
  return <NotFound />;
};

export default withApollo(_404Page);
