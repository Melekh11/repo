import React from "react";
import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps
} from "@mui/material";
import { type FormikProps } from "formik";

type TextFieldProps = {
  disabled?: boolean;
  label: string;
  name: string;
  formik: FormikProps<any>;
} & MuiTextFieldProps;

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  formik,
  multiline,
  rows,
  variant = "standard",
  disabled = false,
  type
}: TextFieldProps) => (
  <MuiTextField
    id={name}
    name={name}
    label={label}
    size="medium"
    sx={{ margin: 0 }}
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    disabled={disabled}
    multiline={multiline}
    variant={variant}
    rows={rows}
    type={type}
  />
);
