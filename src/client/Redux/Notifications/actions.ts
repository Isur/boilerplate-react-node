import { Dispatch } from "redux";
import uuid from "uuid/v4";
import { NotificationActionTypes, ADD, REMOVE } from "./types";

export const addNotification = (message: string) => async (dispatch: Dispatch<NotificationActionTypes>) => {
  const id = uuid();
  dispatch({
    type: ADD,
    payload: {
      [id]: {
        message,
      },
    },
  });
};

export const removeNotification = (id: string) => async (dispatch: Dispatch<NotificationActionTypes>) => {
  dispatch({
    type: REMOVE,
    payload: id,
  });
};
