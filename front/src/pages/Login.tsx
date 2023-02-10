import { Alert, Button } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { checkLogin } from "../helpers/checkers/login";
import { checkPassword } from "../helpers/checkers/password";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routerList";
import { userController } from "../controllers/user";
import { useDispatch } from "../hooks/useRedux";
import { FormPaper } from "../components/FormPaper";
import { TextField } from "../components/TextField";
import { FormPasswordControl } from "../components/FormPasswordControl";

export interface LoginValues {
  login: string;
  password: string;
}

type LoginErrors = {
  [P in keyof LoginValues]?: LoginValues[P];
};

const validate = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = {};
  const loginError = checkLogin(values.login);
  const passwordError = checkPassword(values.password);
  if (loginError) errors.login = loginError;
  if (passwordError) errors.password = passwordError;
  return errors;
};

const initialValues: LoginValues = {
  login: "",
  password: ""
};

export const LoginPage = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePasswordVisible = () => { setPasswordVisible((show) => !show); };
  const navigateToRegister = () => { navigate(ROUTES.REGISTER); };
  const navigateHome = () => { navigate(ROUTES.HOME); };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: LoginValues) => {
      userController
        .login(values, dispatch)
        .then(navigateHome)
        .catch((error) => {
          console.log(error);
          setFormError(error);
        });
    }
  });

  return (
    <FormPaper handleSubmit={formik.handleSubmit}>
      <TextField name="login" label="Login" formik={formik} />

      <FormPasswordControl
        title="Пароль"
        name="password"
        formik={formik}
        handleClick={changePasswordVisible}
        isVisible={isPasswordVisible}
      />

      {!!formError && <Alert severity="error">{formError}</Alert>}

      <Button fullWidth color="inherit" type="submit" variant="outlined">
        Войти
      </Button>

      <Button fullWidth color="inherit" onClick={navigateToRegister}>
        Зарегистрироваться
      </Button>
    </FormPaper>
  );
};
