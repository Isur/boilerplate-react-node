export interface IStateNotification {
  [index: string]: {
    message: string,
  },
}

export const ADD = `[NOTIFICATION] ADD`;
export const REMOVE = `[NOTIFICATION] REMOVE`;

interface IActionAdd {
  type: typeof ADD,
  payload: {
    [index: string]: {
      message: string,
    },
  },
}
interface IActionRemove {
  type: typeof REMOVE,
  payload: string,
}

export type NotificationActionTypes = IActionRemove | IActionAdd;

