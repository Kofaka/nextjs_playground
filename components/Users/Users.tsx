import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
// Api
import { GET_USERS } from 'api/users/queries';
// Types
import {
  Users_users,
  UsersVariables,
  Users as UsersType,
} from 'api/users/types/Users';
// Helpers
import { generateFakeEntities } from 'helpers/misc';
// Ui
import Table from 'ui/Table/Table';

export const fakeUsers: Users_users[] = generateFakeEntities<Users_users>(
  { __typename: 'users' } as Users_users,
  ['name', 'rocket', 'twitter'],
  40
);

const Users = (): JSX.Element => {
  const { data, loading, error } = useQuery<UsersType, UsersVariables>(
    GET_USERS
  );

  /**
   * Use the fakeUsers until api returns
   * "Cannot return null for non-nullable field Query.users." error
   * Don't(!) use such approach in a production
   * */
  const users: Users_users[] =
    error?.message === 'Cannot return null for non-nullable field Query.users.'
      ? fakeUsers
      : data?.users || [];

  const columns: ColumnsType<Users_users> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
      fixed: true,
      ellipsis: true,
    },
    {
      title: 'Rocket',
      dataIndex: 'rocket',
      key: 'rocket',
      width: 250,
      align: 'center',
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter',
      key: 'twitter',
      width: 250,
      align: 'center',
    },
  ];

  return (
    <Spin spinning={loading} size="large" tip="Loading...">
      <Table<Users_users>
        dataSource={users}
        columns={columns}
        scroll={{ x: 650 }}
        bordered
      />
    </Spin>
  );
};

export default Users;
