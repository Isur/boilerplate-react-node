import { Dispatch } from "redux";
import apiRequest from "../../Utils/ApiRequest";
import routes from "../../Utils/routing";
import { IMe } from "../../../server/Components/users/userCommon";
import { LOGIN, LOGOUT, GET_DATA, UserActionTypes, ILoginData, LOADING } from "./types";

export const login = (data: ILoginData) => async (dispatch: Dispatch<UserActionTypes>) => {
  const response = await apiRequest<IMe>({
    method: "POST",
    url: routes.api.login,
    data,
  });

  dispatch({
    type: LOGIN,
    payload: response,
  });
};

export const logout = () => async (dispatch: Dispatch<UserActionTypes>) => {
  const response = await apiRequest({
    method: "GET",
    url: routes.api.logout,
  });
  dispatch({
    type: LOGOUT,
  });
};

export const getUserData = () => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: LOADING,
    payload: {
      loading: true,
    },
  });
  try {
    const user = await apiRequest<IMe>({
      method: "GET",
      url: routes.api.getLocalUser,
    });
    dispatch({
      type: LOGIN,
    });
    dispatch({
      type: GET_DATA,
      payload: user,
    });
    dispatch({
      type: LOADING,
      payload: {
        loading: false,
      },
    });
  } catch{
    dispatch({
      type: GET_DATA,
      payload: {
        email: "",
        id: "",
        username: "",
      },
    });
    dispatch({
      type: LOADING,
      payload: {
        loading: false,
      },
    });
  }
};
