export interface IStateTheme {
  name: themes,
  state: themeState,
}

export type themes = "light" | "dark";
export type themeState = "changing" | "set"

const prefix = "[THEME]";

export const CHANGE = `${prefix} CHANGE`;
export const END_CHANGE = `${prefix} END_CHANGE`;

interface IActionChange {
  type: typeof CHANGE,
  payload: {
    name: themes,
  },
}
interface IActionEndChange {
  type: typeof CHANGE,
  payload?: null,
}

export type ThemeActionTypes = IActionChange | IActionEndChange;
