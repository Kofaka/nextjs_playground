/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * column ordering options
 */
export enum order_by {
  asc = "asc",
  asc_nulls_first = "asc_nulls_first",
  asc_nulls_last = "asc_nulls_last",
  desc = "desc",
  desc_nulls_first = "desc_nulls_first",
  desc_nulls_last = "desc_nulls_last",
}

export interface CapsulesFind {
  id?: string | null;
  landings?: number | null;
  mission?: string | null;
  original_launch?: any | null;
  reuse_count?: number | null;
  status?: string | null;
  type?: string | null;
}

export interface ShipsFind {
  id?: string | null;
  name?: string | null;
  model?: string | null;
  type?: string | null;
  role?: string | null;
  active?: boolean | null;
  imo?: number | null;
  mmsi?: number | null;
  abs?: number | null;
  class?: number | null;
  weight_lbs?: number | null;
  weight_kg?: number | null;
  year_built?: number | null;
  home_port?: string | null;
  status?: string | null;
  speed_kn?: number | null;
  course_deg?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  successful_landings?: number | null;
  attempted_landings?: number | null;
  mission?: string | null;
}

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'.
 */
export interface users_bool_exp {
  _and?: (users_bool_exp | null)[] | null;
  _not?: users_bool_exp | null;
  _or?: (users_bool_exp | null)[] | null;
  id?: uuid_comparison_exp | null;
  name?: String_comparison_exp | null;
  rocket?: String_comparison_exp | null;
  timestamp?: timestamptz_comparison_exp | null;
  twitter?: String_comparison_exp | null;
}

/**
 * ordering options when selecting data from "users"
 */
export interface users_order_by {
  id?: order_by | null;
  name?: order_by | null;
  rocket?: order_by | null;
  timestamp?: order_by | null;
  twitter?: order_by | null;
}

/**
 * expression to compare columns of type uuid. All fields are combined with logical 'AND'.
 */
export interface uuid_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
