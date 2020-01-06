import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, RouterState, CallHistoryMethodAction, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { userReducer } from "./Users/reducers";
import { IStateUser, UserActionTypes } from "./Users/types";
import { themeReducer } from "./Themes/reducers";
import { IStateTheme, ThemeActionTypes } from "./Themes/types";
import { notificationReducer } from "./Notifications/reducers";
import { IStateNotification } from "./Notifications/types";

export const rootReducer = (history: History) => combineReducers({
  user: userReducer,
  theme: themeReducer,
  notifications: notificationReducer,
  router: connectRouter(history),
});

export interface IAppState {
  user: IStateUser,
  router: RouterState,
  theme: IStateTheme,
  notifications: IStateNotification,
}

export type ActionTypes = ThemeActionTypes | UserActionTypes;
export type QThunkDispatch = ThunkDispatch<IAppState, undefined, ActionTypes | CallHistoryMethodAction>

export const StoreConfig = (history: History) => {
  const historyMiddlewar = routerMiddleware(history);
  const middlewares = [thunk, historyMiddlewar];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer(history),
    composeWithDevTools(middlewareEnhancer),
  );

  return store;
};
