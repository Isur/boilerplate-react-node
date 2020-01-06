import { IStateUser, LOGIN, UserActionTypes, LOGOUT, GET_DATA, LOADING } from "./types";

const initialState: IStateUser = {
  loggedIn: false,
  username: "",
  email: "",
  id: "",
  loading: true,
};

export const userReducer = (state = initialState, action: UserActionTypes): IStateUser => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        ...action.payload,
      };
    case LOGOUT:
      return {
        username: "",
        email: "",
        id: "",
        loggedIn: false,
        loading: false,
      };
    case GET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
