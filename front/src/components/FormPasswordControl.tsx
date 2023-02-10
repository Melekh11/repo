import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  type FormControlProps as MuiFormControlProps,
  FormControl as MuiFormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material";
import { type FormikProps } from "formik";
import React from "react";

type FormControlProps = MuiFormControlProps & {
  name: string;
  title: string;
  formik: FormikProps<any>;
  isVisible?: boolean;
  handleClick: () => void;
};

export const FormPasswordControl = ({
  name,
  title,
  formik,
  isVisible,
  handleClick
}: FormControlProps) => (
  <MuiFormControl
    sx={{ width: "25ch", margin: "1 auto" }}
    variant="standard"
    size="medium"
  >
    <InputLabel
      error={formik.touched[name] && Boolean(formik.errors[name])}
      htmlFor={name}
    >
      {title}
    </InputLabel>
    <Input
      id={name}
      name={name}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      type={isVisible ? "text" : "password"}
      onChange={formik.handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClick}
          >
            {isVisible ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
    {formik.touched[name] && formik.errors[name] && (
      <FormHelperText
        error={formik.touched[name] && Boolean(formik.errors[name])}
      >
        {formik.errors[name]}
      </FormHelperText>
    )}
  </MuiFormControl>
);
