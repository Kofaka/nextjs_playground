import { NextPage } from 'next';
// Hocks
import withApollo from 'hocs/withApollo';
// Components
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';

const _404: NextPage = () => {
  return <NotFoundPage />;
};

export default withApollo(_404);
