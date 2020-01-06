import { IStateNotification, NotificationActionTypes, ADD, REMOVE } from "./types";

const initialState: IStateNotification = {

};

export const notificationReducer = (state = initialState, action: NotificationActionTypes): IStateNotification => {
  switch(action.type) {
    case ADD:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE:
      const newState = state;
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};
