/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShipsFind } from "./../../graphql-global-types";

// ====================================================
// GraphQL query operation: Ships
// ====================================================

export interface Ships_ships_missions {
  __typename: "ShipMission";
  flight: string | null;
  name: string | null;
}

export interface Ships_ships {
  __typename: "Ship";
  id: string | null;
  name: string | null;
  year_built: number | null;
  image: string | null;
  status: string | null;
  active: boolean | null;
  home_port: string | null;
  attempted_landings: number | null;
  successful_landings: number | null;
  weight_kg: number | null;
  missions: (Ships_ships_missions | null)[] | null;
}

export interface Ships {
  ships: (Ships_ships | null)[] | null;
}

export interface ShipsVariables {
  order?: string | null;
  sort?: string | null;
  offset?: number | null;
  limit?: number | null;
  find?: ShipsFind | null;
}
