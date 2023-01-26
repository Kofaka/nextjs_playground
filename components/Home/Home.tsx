import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {
  Spin,
  Space,
  Empty,
  Typography,
  Pagination,
  PaginationProps,
} from 'antd';
// Api
import { GET_SHIPS } from 'api/ships/queries';
// Types
import { Ships, Ships_ships, ShipsVariables } from 'api/ships/types/Ships';
// Components
import ShipsList from 'components/Home/components/ShipsList/ShipsList';
// Styles
import styles from './Home.module.scss';

dayjs.extend(localizedFormat);

const { Title } = Typography;

const getExistingShipsList = (
  data: (Ships_ships | null)[] | null | undefined
): Ships_ships[] => {
  const ships: Ships_ships[] = [];

  data?.map((ship) => ship && ships.push(ship));

  return ships;
};

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 3;

const Home = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const { data, loading } = useQuery<Ships, ShipsVariables>(GET_SHIPS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      sort: 'year_built',
      order: 'descending',
    },
  });

  const onPaginationChange: PaginationProps['onChange'] = (page, size) => {
    if (page > 0 && currentPage !== page) {
      setCurrentPage(page);
    }

    if (pageSize !== size) {
      setPageSize(size);
    }
  };

  const ships = getExistingShipsList(data?.ships);

  /**
   * We should handle the pagination on the frontend side,
   * coz there's no way to get the total number of ships,
   * and thus - make the proper pagination
   **/
  const paginatedShipsList = useMemo((): Ships_ships[] => {
    const from =
      currentPage > DEFAULT_CURRENT_PAGE ? (currentPage - 1) * pageSize : 0;
    const to = currentPage * pageSize;

    return ships.slice(from, to);
  }, [ships, currentPage, pageSize]);

  const pageSizeOptions = [
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE * 2,
    DEFAULT_PAGE_SIZE * 3,
    DEFAULT_PAGE_SIZE * 4,
    DEFAULT_PAGE_SIZE * 8,
  ];

  return (
    <Spin className={styles.root} spinning={loading} tip="Loading...">
      <Space className={styles.content} direction="vertical" size="middle">
        <Title>The list of SpaseX ships</Title>

        {!loading && paginatedShipsList.length <= 0 ? (
          <Space
            className={styles.emptyWrapper}
            direction="vertical"
            align="center"
          >
            <Empty />
          </Space>
        ) : (
          <>
            <ShipsList ships={paginatedShipsList} />

            <Pagination
              onChange={onPaginationChange}
              pageSizeOptions={pageSizeOptions}
              defaultCurrent={DEFAULT_CURRENT_PAGE}
              defaultPageSize={DEFAULT_PAGE_SIZE}
              total={ships.length}
              disabled={!ships.length || loading}
              showSizeChanger
              showQuickJumper
            />
          </>
        )}
      </Space>
    </Spin>
  );
};

export default Home;
