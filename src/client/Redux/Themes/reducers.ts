import { IStateTheme, ThemeActionTypes, CHANGE, END_CHANGE } from "./types";

const initialState: IStateTheme = {
  name: "light",
  state: "set",
};

export const themeReducer = (state = initialState, action: ThemeActionTypes): IStateTheme => {
  switch(action.type) {
    case CHANGE:
      return {
        ...state,
        name: action.payload.name,
        state: "changing",
      };
    case END_CHANGE:
      return {
        ...state,
        state: "set",
      };
    default:
      return state;
  }
};
