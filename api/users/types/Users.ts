/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { users_order_by, users_bool_exp } from "./../../graphql-global-types";

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users {
  __typename: "users";
  id: any;
  name: string | null;
  rocket: string | null;
  twitter: string | null;
}

export interface Users {
  /**
   * fetch data from the table: "users"
   */
  users: Users_users[];
}

export interface UsersVariables {
  orderBy?: users_order_by[] | null;
  where?: users_bool_exp | null;
}
