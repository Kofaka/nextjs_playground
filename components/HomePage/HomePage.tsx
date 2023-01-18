import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Spin, Space, Typography } from 'antd';
// Api
import { GET_SHIPS } from 'api/ships/queries';
// Types
import { Ships, Ships_ships, ShipsVariables } from 'api/ships/types/Ships';
// Components
import ShipsList from 'components/HomePage/components/ShipsList/ShipsList';
// Styles
import styles from './HomePage.module.scss';

dayjs.extend(localizedFormat);

const { Title } = Typography;

const getExistingShipsList = (
  data: (Ships_ships | null)[] | null | undefined
): Ships_ships[] => {
  const ships: Ships_ships[] = [];

  data?.map((ship) => ship && ships.push(ship));

  return ships;
};

const HomePage = (): JSX.Element => {
  const { data, loading } = useQuery<Ships, ShipsVariables>(GET_SHIPS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      sort: 'year_built',
      order: 'descending',
    },
  });

  const ships = getExistingShipsList(data?.ships);

  return (
    <Spin tip="Loading..." spinning={loading} className={styles.loader}>
      <Space direction="vertical" size="middle">
        <Title>The list of SpaseX ships</Title>

        <ShipsList ships={ships} />
      </Space>
    </Spin>
  );
};

export default HomePage;
