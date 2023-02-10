import { Alert, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormPaper } from "../components/FormPaper";
import { TextField } from "../components/TextField";
import { orgController } from "../controllers/org";
import { checkDescription } from "../helpers/checkers/checkDescription";
import { checkName } from "../helpers/checkers/name";
import { useDispatch, useSelector } from "../hooks/useRedux";
import { userSelector } from "../redux/slices/user";
import { ROUTES } from "../router/routerList";

export interface OrgValues {
  name: string;
  contacts: string;
}

type OrgErrors = {
  [p in keyof OrgValues]?: OrgValues[p];
};

const initialValues: OrgValues = {
  name: "",
  contacts: ""
};

const validate = (values: OrgValues) => {
  const orgErrors: OrgErrors = {};

  const nameError = checkName(values.name);
  const contactsError = checkDescription(values.contacts);

  if (nameError) orgErrors.name = nameError;
  if (contactsError) orgErrors.contacts = contactsError;

  return orgErrors;
};

export const CreateOrgPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const [formError, setFormError] = useState('');

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: OrgValues) => {
      orgController.createOrg(values, user.id, dispatch)
        .then(() => {
          navigate(ROUTES.HOME);
        })
        .catch(err => {
          setFormError(err);
        })
    }
  });
  return (
    <FormPaper handleSubmit={formik.handleSubmit}>
      <TextField label="Название" name="name" formik={formik} />
      <TextField label="Контактная информация" name="contacts" formik={formik} variant='outlined' rows={6} multiline />

      {!!formError && <Alert severity="error">{formError}</Alert>}

      <Button fullWidth color="inherit" type="submit" variant="outlined">
        Создать проект
      </Button>
    </FormPaper>
  );
};
