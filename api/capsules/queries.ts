import { gql } from '@apollo/client';

export const GET_CAPSULES = gql`
  query Capsules(
    $order: String
    $sort: String
    $offset: Int
    $limit: Int
    $find: CapsulesFind
  ) {
    capsules(
      order: $order
      sort: $sort
      offset: $offset
      limit: $limit
      find: $find
    ) {
      id
      type
      landings
      original_launch
    }
  }
`;
