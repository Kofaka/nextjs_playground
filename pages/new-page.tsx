import { NextPage } from 'next';
// Hocks
import withApollo from 'hocs/withApollo';

const NewPage: NextPage = () => {
  return <div>This is some new page</div>;
};

export default withApollo(NewPage);
