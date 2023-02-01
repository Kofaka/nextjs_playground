import { render, within, screen } from 'test-utils';
// Types
import { Users_users } from 'api/users/types/Users';
import { ColumnsType } from 'antd/es/table/interface';
// Helpers
import { generateFakeEntities } from 'helpers/misc';
// Components
import Table from './Table';

const MOCKED_DATA = generateFakeEntities<Users_users>(
  { __typename: 'users' } as Users_users,
  ['name', 'rocket', 'twitter'],
  5
);

describe('ui/Table/Table', () => {
  it('should render basic components', async () => {
    const columns: ColumnsType<Users_users> = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Rocket',
        dataIndex: 'rocket',
        key: 'rocket',
      },
      {
        title: 'Twitter',
        dataIndex: 'twitter',
        key: 'twitter',
      },
    ];

    render(<Table dataSource={MOCKED_DATA} columns={columns} />);

    const columnTitles: string[] = columns.map(({ title }) => title as string);
    const rows = screen.queryAllByRole('row');

    columnTitles.forEach((name) => {
      expect(screen.getByRole('columnheader', { name })).toBeInTheDocument();
    });

    /** Remove first row, coz it contains the column header */
    rows.slice(1).forEach((item, index) => {
      const row = within(item);
      const user = MOCKED_DATA[index];

      [user.name, user.rocket, user.twitter].forEach((i) => {
        expect(
          row.getByRole('cell', { name: i as string })
        ).toBeInTheDocument();

        expect(row.getByText(i as string)).toBeInTheDocument();
      });
    });
  });

  it('should render only header in case no dataSource', async () => {
    const columns: ColumnsType<Users_users> = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Rocket',
        dataIndex: 'rocket',
        key: 'rocket',
      },
      {
        title: 'Twitter',
        dataIndex: 'twitter',
        key: 'twitter',
      },
    ];

    render(<Table columns={columns} />);

    const columnTitles: string[] = columns.map(({ title }) => title as string);
    const rows = screen.queryAllByRole('row');

    columnTitles.forEach((name) => {
      expect(screen.getByRole('columnheader', { name })).toBeInTheDocument();
    });

    expect(rows).toHaveLength(2);
    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });
});
