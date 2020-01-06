import React, { useState } from "react";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { useForm, FormContext } from "react-hook-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";

import { addNotification } from "../../Redux/Notifications/actions";
import routes from "../../Utils/routing";
import { IAppState, QThunkDispatch } from "../../Redux/store";
import { ILoginData } from "../../Redux/Users/types";
import { login } from "../../Redux/Users/actions";
import LogoText from "../../Components/LogoText";
import CustomInput from "../../Components/Inputs/Input";
import "./LoginPage.scss";

interface IDispatchProps {
  redirect: (url: string) => void,
  login: (loginData: ILoginData) => Promise<void>,
  addNotif: (message: string) => Promise<void>,
}

interface IFormData {
  username: string,
  password: string,
}
const LoginPage = (props: IDispatchProps) => {
  const [error, setError] = useState<string>("");
  const formMethods = useForm<IFormData>();
  const onSubmit = async (data: IFormData) => {
    try {
      await props.login(data);
      props.redirect(routes.pages.home);
      props.addNotif(lang.dictionary("notifications.login"));
    } catch(e) {
      setError(lang.dictionary("errors.loginfailed"));
      props.addNotif(lang.dictionary("notifications.login-failed"));
    }
  };

  const loginValidation = {
    required: lang.dictionary("errors.required"),
  };
  const passwordValidation = {
    required: lang.dictionary("errors.required"),
  };
  return (
    <div className="LoginPage Page">
      <LogoText />
      <FormContext {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="loginForm">
          <CustomInput type="text" label={lang.dictionary("labels.login")} validationSchema={loginValidation} name="username" />
          <CustomInput type="password" label={lang.dictionary("labels.password")} name="password" validationSchema={passwordValidation} />
          <p className="error">{error}</p>
          <ButtonGroup size="large" orientation="vertical" fullWidth className="buttons">
            <Button variant="contained" type="submit" color="primary">
              {lang.dictionary("buttons.login")}
            </Button>
            <Button variant="contained" component={Link} to={routes.pages.register} color="secondary">
              {lang.dictionary("buttons.register")}
            </Button>
          </ButtonGroup>
        </form>
      </FormContext>
    </div>
  );
};

export default connect<{}, IDispatchProps, {}, IAppState>(
  null,
  (dispatch: QThunkDispatch) => ({
    redirect: url => dispatch(push(url)),
    login: loginData => dispatch(login(loginData)),
    addNotif: message => dispatch(addNotification(message)),
  }))(LoginPage);
