import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users($orderBy: [users_order_by!], $where: users_bool_exp) {
    users(order_by: $orderBy, where: $where) {
      id
      name
      rocket
      twitter
    }
  }
`;
