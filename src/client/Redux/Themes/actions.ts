import { Dispatch } from "redux";
import { sleep } from "../../Utils/utils";
import { IStateTheme, CHANGE, ThemeActionTypes, themes, END_CHANGE } from "./types";

export const changeTheme = (name: themes) => async (dispatch: Dispatch<ThemeActionTypes>) => {
  dispatch({
    type: CHANGE,
    payload: {
      name,
    },
  });
  await sleep(1000);
  dispatch({
    type: END_CHANGE,
  });
};
