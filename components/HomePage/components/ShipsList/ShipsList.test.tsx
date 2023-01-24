import { render, screen } from 'test-utils';
// Types
import { Ships_ships } from 'api/ships/types/Ships';
// Components
import ShipsList from './ShipsList';

describe('components/HomePage/components/ShipsList/ShipsList', () => {
  it('should return null if no ships passed', () => {
    const { container } = render(<ShipsList />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render basic components', () => {
    const ships: Ships_ships[] = [
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
        id: 'sergy4wr579wgeribw4b87',
        name: 'The winner',
        year_built: 2014,
        image: 'https://some-site.com/ships/images/sergy4wr579wgeribw4b87,jpg',
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
    ];

    render(<ShipsList ships={ships} />);

    ships.forEach(({ name, image, status }) => {
      const img = screen.getByRole('img', { name: name as string });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', name);
      expect(img).toHaveAttribute('src', image);
      expect(screen.getByText(status as string)).toBeInTheDocument();
    });
  });

  it('should have the fallback image alt in case no ship name', () => {
    render(
      <ShipsList
        ships={[
          {
            id: 'art45yrtbsdrtw45y',
            name: null,
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
        ]}
      />
    );

    expect(screen.getByRole('img', { name: /The ship/i })).toBeInTheDocument();
  });

  it('should have the empty string as a fallback of image source in case no ship image', () => {
    render(
      <ShipsList
        ships={[
          {
            id: 'art45yrtbsdrtw45y',
            name: 'The first ship',
            year_built: 2007,
            image: null,
            status: 'paused',
            active: true,
            home_port: 'New York',
            attempted_landings: 16,
            successful_landings: 4,
            weight_kg: 45890,
            missions: null,
            __typename: 'Ship',
          },
        ]}
      />
    );

    expect(screen.getByRole('img', { name: 'The first ship' })).toHaveAttribute(
      'src',
      ''
    );
  });
});
