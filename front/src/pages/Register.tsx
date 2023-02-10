import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl as MuiFormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField as MuiTextField
} from "@mui/material";
import { type FormikProps, useFormik } from "formik";
import {
  type TextFieldProps as MuiTextFieldProps,
  type FormControlProps as MuiFormControlProps
} from "@mui/material";
import { checkEmail } from "../helpers/checkers/email";
import { checkLogin } from "../helpers/checkers/login";
import { checkName } from "../helpers/checkers/name";
import { checkPassword } from "../helpers/checkers/password";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routerList";
import { userController } from "../controllers/user";
import { useDispatch } from "react-redux";
import { TextField } from "../components/TextField";
import { FormPasswordControl } from "../components/FormPasswordControl";
import { FormPaper } from "../components/FormPaper";

export interface RegisterValues {
  login: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterFields = keyof RegisterValues;

type RegisterErrors = {
  [p in keyof RegisterValues]?: RegisterValues[p];
};

type InputTextProps = MuiTextFieldProps & {
  name: RegisterFields;
  formik: FormikProps<RegisterValues>;
};

type FormControlProps = MuiFormControlProps & {
  name: RegisterFields;
  formik: FormikProps<RegisterValues>;
  isVisible?: boolean;
  handleClick: () => void;
};

const initialValues: RegisterValues = {
  login: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const validate = (values: RegisterValues): RegisterErrors => {
  const errorValues: RegisterErrors = {};

  const loginError = checkLogin(values.login);
  const nameError = checkName(values.name);
  const surnameError = checkName(values.surname);
  const emailError = checkEmail(values.email);
  const passwordError = checkPassword(values.password);
  const confirmPasswordError = checkPassword(values.confirmPassword);

  if (loginError) errorValues.login = loginError;
  if (nameError) errorValues.name = nameError;
  if (surnameError) errorValues.surname = surnameError;
  if (emailError) errorValues.email = emailError;
  if (passwordError) errorValues.password = passwordError;
  if (confirmPasswordError) errorValues.confirmPassword = confirmPasswordError;

  if (values.password !== values.confirmPassword) {
    errorValues.password = "Пароли не должны отличаться";
    errorValues.confirmPassword = "Пароли не должны отличаться";
  }

  return errorValues;
};

export const RegisterPage = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToLogin = () => { navigate(ROUTES.LOGIN); };
  const navigateHome = () => { navigate(ROUTES.HOME); };
  const changePasswordVisible = () => { setPasswordVisible((show) => !show); };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: RegisterValues) => {
      userController
        .register(values, dispatch)
        .then(navigateHome)
        .catch((error) => {
          setFormError(error);
        });
    }
  });

  return (
    <FormPaper handleSubmit={formik.handleSubmit}>
      <TextField name="login" label="Логин" formik={formik} />
      <TextField name="name" label="Имя" formik={formik} />
      <TextField name="surname" label="Фамилия" formik={formik} />
      <TextField name="email" label="Почта" formik={formik} />

      <FormPasswordControl
        title="Пароль"
        name="password"
        formik={formik}
        handleClick={changePasswordVisible}
        isVisible={isPasswordVisible}
      />
      <FormPasswordControl
        title="Повторить пароль"
        name="confirmPassword"
        formik={formik}
        handleClick={changePasswordVisible}
        isVisible={isPasswordVisible}
      />

      {!!formError && <Alert severity="error">{formError}</Alert>}

      <Button fullWidth color="inherit" variant="outlined" type="submit">
        Зарегистрироваться
      </Button>

      <Button fullWidth color="inherit" onClick={navigateToLogin}>
        Войти
      </Button>
    </FormPaper>
  );
};
