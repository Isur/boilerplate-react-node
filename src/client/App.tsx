import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { LanguageDictionary } from "./locales/locales";
import routes from "./Utils/routing";

import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import HomePage from "./Pages/ErrorPage";

import PriavteRoute from "./Components/PriavteRoute";
import Notification from "./Components/Notification";
import LoaderComponent from "./Components/Loading";
import { IAppState, QThunkDispatch } from "./Redux/store";
import { themes, themeState } from "./Redux/Themes/types";
import { IStateUser } from "./Redux/Users/types";
import { getUserData } from "./Redux/Users/actions";
import "./App.scss";

interface IStateProps {
  theme: {
    name: themes,
    state: themeState,
  },
  user: IStateUser,
  location: string,
}

interface IDispatchProps {
  getUserData: () => void,
}

interface IAppProps extends IStateProps, IDispatchProps {}

const App = (props: IAppProps) => {
  const { theme, getUserData, user } = props;
  useEffect(() => {
    getUserData();
  }, [user.id]);
  if(!window.lang) {
    const lang = new LanguageDictionary();
    window.lang = lang.getDictionary();
  }
  document.documentElement.setAttribute("theme", theme.name);
  let content;
  if(user.loading) {
    content = <LoaderComponent />;
  } else {
    content = <Switch>
      <Route path={routes.pages.login} exact component={LoginPage} />
      <Route path={routes.pages.register} exact component={RegisterPage} />
      <PriavteRoute path={routes.pages.home} exact component={HomePage} />
      <Redirect to={routes.pages.home} />
    </Switch>;
  }
  return (
    <div className={`App ${theme.name}-theme ${theme.state === "changing" ? "theme-transition" : ""}`}>
      <Notification />
      {content}
    </div>
  );
};

export default connect<IStateProps, IDispatchProps, {}, IAppState>(
  (state: IAppState) => ({
    theme: state.theme,
    user: state.user,
    location: state.router.location.pathname,
  }),
  (dispatch: QThunkDispatch) => ({
    getUserData: () => dispatch(getUserData()),
  }))(App);
