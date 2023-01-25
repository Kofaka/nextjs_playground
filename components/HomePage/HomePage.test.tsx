import {
  wait,
  render,
  screen,
  userEvent,
  generateMockEntities,
} from 'test-utils';
// Api
import { GET_SHIPS } from 'api/ships/queries';
// Types
import { Ships_ships } from 'api/ships/types/Ships';
// Components
import HomePage from './HomePage';

const MOCKED_GET_SHIPS_REQUEST = {
  request: {
    query: GET_SHIPS,
    variables: {
      sort: 'year_built',
      order: 'descending',
    },
  },
  result: {
    data: {
      ships: [
        {
          id: 'art45yrtbsdrtw45y',
          name: 'The first ship',
          year_built: 2007,
          image: 'https://some-site.com/ships/images/art45yrtbsdrtw45y,jpg',
          status: 'paused',
          active: true,
          home_port: 'New York',
          attempted_landings: 16,
          successful_landings: 4,
          weight_kg: 45890,
          missions: null,
          __typename: 'Ship',
        },
        {
          id: 'sergy4wr579wgew4b87',
          name: 'The winner',
          year_built: 2014,
          image: 'https://some-site.com/ships/images/sergy4wr579wgew4b87,jpg',
          status: 'delivered',
          active: true,
          home_port: 'Monte Carlo',
          attempted_landings: 2,
          successful_landings: 2,
          weight_kg: 34523,
          missions: [
            {
              flight: 'Tro-lo-lo',
              name: 'Dow town',
              __typename: 'ShipMission',
            },
            {
              flight: 'Prom pom pom',
              name: 'Oh-la-la',
              __typename: 'ShipMission',
            },
          ],
          __typename: 'Ship',
        },
      ],
    },
  },
};

const MOCKED_GET_SHIPS_REQUEST_WITH_DELAY = {
  ...MOCKED_GET_SHIPS_REQUEST,
  delay: 300,
};

const MOCKED_GET_SHIPS_REQUEST_NO_SHIPS = {
  ...MOCKED_GET_SHIPS_REQUEST,
  result: {
    data: {
      ships: null,
    },
  },
};

const MOCKED_GET_SHIPS_REQUEST_WITH_LOT_OF_ITEMS = {
  ...MOCKED_GET_SHIPS_REQUEST,
  result: {
    data: {
      ships: generateMockEntities<Ships_ships>(
        {
          id: 'art45yrtbsdrtw45y',
          name: 'The first ship',
          year_built: 2007,
          image: 'https://some-site.com/ships/images/art45yrtbsdrtw45y,jpg',
          status: 'paused',
          active: true,
          home_port: 'New York',
          attempted_landings: 16,
          successful_landings: 4,
          weight_kg: 45890,
          missions: null,
          __typename: 'Ship',
        },
        'name',
        15
      ),
    },
  },
};

describe('components/HomePage/HomePage', () => {
  it('should render basic components', async () => {
    render(<HomePage />, {
      wrapperProps: {
        mocks: [MOCKED_GET_SHIPS_REQUEST],
      },
    });
    await wait();
    await wait();

    expect(screen.getByText(/The list of SpaseX ships/i)).toBeInTheDocument();

    // ShipsList
    MOCKED_GET_SHIPS_REQUEST.result.data.ships.forEach(({ name }) => {
      expect(
        screen.getByRole('img', { name: name as string })
      ).toBeInTheDocument();
    });

    // Pagination
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { name: /Previous Page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { name: /Next Page/i })
    ).toBeInTheDocument();
  });

  it('should render the loader while GET_SHIPS query processing', async () => {
    render(<HomePage />, {
      wrapperProps: {
        mocks: [MOCKED_GET_SHIPS_REQUEST_WITH_DELAY],
      },
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // ShipsList
    MOCKED_GET_SHIPS_REQUEST.result.data.ships.forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });
  });

  it('should render the empty placeholder if no ships in GET_SHIPS query response', async () => {
    render(<HomePage />, {
      wrapperProps: {
        mocks: [MOCKED_GET_SHIPS_REQUEST_NO_SHIPS],
      },
    });
    await wait();
    await wait();

    expect(screen.getByText('No data')).toBeInTheDocument();

    // Pagination
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('listitem', { name: /Previous Page/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('listitem', { name: /Next Page/i })
    ).not.toBeInTheDocument();
  });

  it('should properly handle the page pagination by page number', async () => {
    render(<HomePage />, {
      wrapperProps: {
        mocks: [MOCKED_GET_SHIPS_REQUEST_WITH_LOT_OF_ITEMS],
      },
    });
    await wait();
    await wait();

    const ships = MOCKED_GET_SHIPS_REQUEST_WITH_LOT_OF_ITEMS.result.data.ships;

    const pageTwoButton = screen.getByRole('listitem', { name: '2' });

    ships.slice(0, 2).forEach(({ name }) => {
      expect(
        screen.getByRole('img', { name: name as string })
      ).toBeInTheDocument();
    });
    ships.slice(3).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });

    await userEvent.click(pageTwoButton);

    ships.slice(0, 2).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });
    ships.slice(3, 5).forEach(({ name }) => {
      expect(
        screen.getByRole('img', { name: name as string })
      ).toBeInTheDocument();
    });
    ships.slice(6).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });
  }, 9000);

  it('should properly handle the page pagination by page size', async () => {
    render(<HomePage />, {
      wrapperProps: {
        mocks: [MOCKED_GET_SHIPS_REQUEST_WITH_LOT_OF_ITEMS],
      },
    });
    await wait();
    await wait();

    const ships = MOCKED_GET_SHIPS_REQUEST_WITH_LOT_OF_ITEMS.result.data.ships;

    const pageTwoButton = screen.getByRole('listitem', { name: '2' });
    const pageSizeButton = screen.getByText('3 / page');

    ships.slice(0, 2).forEach(({ name }) => {
      expect(
        screen.getByRole('img', { name: name as string })
      ).toBeInTheDocument();
    });
    ships.slice(3).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });

    await userEvent.click(pageSizeButton);
    await userEvent.click(screen.getByRole('option', { name: '6 / page' }));

    ships.slice(0, 5).forEach(({ name }) => {
      expect(
        screen.getByRole('img', { name: name as string })
      ).toBeInTheDocument();
    });
    ships.slice(6).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });

    await userEvent.click(pageTwoButton);

    ships.slice(0, 5).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });
    ships.slice(6, 11).forEach(({ name }) => {
      expect(
        screen.getByRole('img', { name: name as string })
      ).toBeInTheDocument();
    });
    ships.slice(12).forEach(({ name }) => {
      expect(
        screen.queryByRole('img', { name: name as string })
      ).not.toBeInTheDocument();
    });
  }, 18000);
});
