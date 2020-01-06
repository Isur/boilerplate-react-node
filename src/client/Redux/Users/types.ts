import { IMe } from "../../../server/Components/users/userCommon";

export interface IStateUser {
  loggedIn: boolean,
  username: string,
  id: string,
  email: string,
  loading: boolean,
}
const prefix = "[USER]";

export const LOGIN  = `${prefix} LOGIN`;
export const LOGOUT = `${prefix} LOGOUT`;
export const GET_DATA = `${prefix} GET_DATA`;
export const LOADING = `${prefix} LOADING`;

interface IActionLogin {
  type: typeof LOGIN,
  payload: IMe,
}

interface IActionLogout {
  type: typeof LOGOUT,
  payload?: null,
}

interface IActionGetData {
  type: typeof GET_DATA,
  payload: IMe,
}

interface IActionLoading {
  type: typeof LOADING,
  payload: {
    loading: boolean,
  },
}

export type UserActionTypes = IActionLogin | IActionLogout | IActionGetData | IActionLoading;

export interface ILoginData {
  username: string,
  password: string,
}
