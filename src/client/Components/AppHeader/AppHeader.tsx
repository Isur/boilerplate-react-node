import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { AppBar, Toolbar } from "@material-ui/core";
import { connect } from "react-redux";

import routing from "../../Utils/routing";
import { addNotification } from "../../Redux/Notifications/actions";
import { themes, themeState } from "../../Redux/Themes/types";
import { IAppState, QThunkDispatch } from "../../Redux/store";
import { changeTheme } from "../../Redux/Themes/actions";
import { logout } from "../../Redux/Users/actions";
import { LanguageDictionary } from "../../locales/locales";
import { AppHeaderDropdownMenu } from "./AppHeaderMenu";

import "./AppHeader.scss";

interface IStateProps {
  loggedIn: boolean,
  location: string,
  theme: {
    name: themes,
    state: themeState,
  },
}

interface IDispatchProps {
  selectTheme: (name: themes) => void,
  redirect: (url: string) => void,
  logout: () => void,
  addNotif: (message: string) => void,
}

interface IAppHeader extends IStateProps, IDispatchProps {}

const AppHeader = ({ theme, selectTheme, redirect, location, loggedIn, logout, addNotif }: IAppHeader) => {
  const handleThemeChange = () => {
    selectTheme(theme.name === "light" ? "dark" : "light");
  };

  const handleLanguageChange = () => {
    if(lang.current === "en") {
      redirect(location.replace("/en/", "/pl/"));
    } else {
      redirect(location.replace("/pl/", "/en/"));
    }
    window.lang = new LanguageDictionary().getDictionary();
  };

  const handleLogout = () => {
    logout();
    addNotif(lang.dictionary("notifications.logout"));
  };

  return (
    <AppBar className="AppHeader">
      <Toolbar variant="dense">
        <div className="mini-logo" onClick={() => redirect(routing.pages.home)}>
          <img src="/public/images/QuestionAir.svg" /> Question-Air
        </div>
        <AppHeaderDropdownMenu loggedIn={loggedIn}
                               handleLanguageChange={handleLanguageChange}
                               handleThemeChange={handleThemeChange}
                               handleLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default connect<IStateProps, IDispatchProps, {}, IAppState>(
  (state: IAppState) => ({
    loggedIn: state.user.loggedIn,
    location: state.router.location.pathname,
    theme: state.theme,
  }),
  (dispatch: QThunkDispatch) => ({
    selectTheme: name => dispatch(changeTheme(name)),
    redirect: url => dispatch(push(url)),
    logout: () => dispatch(logout()),
    addNotif: message => dispatch(addNotification(message)),
  }))(AppHeader);
