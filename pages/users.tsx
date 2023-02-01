import { NextPage } from 'next';
// Hocks
import withApollo from 'hocs/withApollo';
// Components
import Users from 'components/Users/Users';

const UsersPage: NextPage = () => {
  return <Users />;
};

export default withApollo(UsersPage);
