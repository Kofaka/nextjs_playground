/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CapsulesFind } from "./../../graphql-global-types";

// ====================================================
// GraphQL query operation: Capsules
// ====================================================

export interface Capsules_capsules {
  __typename: "Capsule";
  id: string | null;
  type: string | null;
  landings: number | null;
  original_launch: any | null;
}

export interface Capsules {
  capsules: (Capsules_capsules | null)[] | null;
}

export interface CapsulesVariables {
  order?: string | null;
  sort?: string | null;
  offset?: number | null;
  limit?: number | null;
  find?: CapsulesFind | null;
}
