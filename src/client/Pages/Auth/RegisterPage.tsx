import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { useForm, FormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import apiRequest from "../../Utils/ApiRequest";
import routes from "../../Utils/routing";
import CustomInput from "../../Components/Inputs/Input";
import { validateLength, validatePassword } from "../../Utils/validation";
import LogoText from "../../Components/LogoText";
import "./RegisterPage.scss";

interface IFormData {
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const formMethods = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    if(data.password !== data.passwordConfirm) {
      formMethods.setError("password", "notMatch", lang.dictionary("errors.passwordsIdentical"));
      return;
    }
    try {
      await apiRequest({
        method: "POST",
        url: routes.api.register,
        data,
      });
      setError("");
    } catch{
      setError(lang.dictionary("errors.register-failed"));
    }
  };

  const usernameValidation = {
    required: lang.dictionary("errors.required"),
    validate: {
      minLength: (value: string) => validateLength(value, { min: 4 }) || "min 4...",
    },
  };
  const emailValidation = {
    required: lang.dictionary("errors.required"),
  };
  const passwordValidation = {
    required: lang.dictionary("errors.required"),
    validate: {
      pattern: (value: string) => validatePassword(value) || lang.dictionary("errors.passwordOptions"),
    },
  };

  return (
    <div className="RegisterPage Page">
      <LogoText />
      <FormContext {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="registerForm">
          <CustomInput name="username" label={lang.dictionary("labels.username")} validationSchema={usernameValidation} />
          <CustomInput name="email" type="email" label={lang.dictionary("labels.email")} validationSchema={emailValidation} />
          <CustomInput name="password" type="password" validationSchema={passwordValidation} label={lang.dictionary("labels.password")} />
          <CustomInput name="passwordConfirm" type="password" validationSchema={passwordValidation} label={lang.dictionary("labels.passwordConfirm")} />
          <p className="error">{error}</p>
          <ButtonGroup size="large" orientation="vertical" fullWidth className="buttons">
            <Button type="submit" color="primary" variant="contained">
              {lang.dictionary("buttons.register")}
            </Button>
            <Button component={Link} to={routes.pages.login} color="secondary" variant="contained">
              {lang.dictionary("buttons.login")}
            </Button>
          </ButtonGroup>
        </form>
      </FormContext>
    </div>
  );
};

export default RegisterPage;

