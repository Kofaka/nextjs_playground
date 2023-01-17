import { gql } from '@apollo/client';

export const GET_SHIPS = gql`
  query Ships(
    $order: String
    $sort: String
    $offset: Int
    $limit: Int
    $find: ShipsFind
  ) {
    ships(
      order: $order
      sort: $sort
      offset: $offset
      limit: $limit
      find: $find
    ) {
      id
      name
      year_built
      image
      status
      active
      home_port
      attempted_landings
      successful_landings
      weight_kg
      missions {
        flight
        name
      }
    }
  }
`;
