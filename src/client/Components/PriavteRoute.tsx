import React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { IAppState } from "../Redux/store";
import routes from "../Utils/routing";

interface IStateProps {
  loggedIn: boolean,
}

interface IPrivateRoute {
  exact: boolean,
  path: string,
  component: <T>(props: T) => JSX.Element,
}

interface IProps extends IStateProps, IPrivateRoute {}

const PrivateRoute = ({ exact, path, component, loggedIn }: IProps) => {
  if(!loggedIn) return <Redirect to={routes.pages.login} />;
  return <Route exact={exact} path={path} component={component} />;
};

export default connect<IStateProps, {}, IPrivateRoute, IAppState>(
  (state: IAppState) => ({
    loggedIn: state.user.loggedIn,
  }), null,
)(PrivateRoute);

