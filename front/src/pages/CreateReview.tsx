import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormPaper } from "../components/FormPaper";
import { TextField } from "../components/TextField";
import { checkDescription } from "../helpers/checkers/checkDescription";
import { useSelector } from "../hooks/useRedux";
import { rewModal } from "../models/rew";
import { type UserPosition, userSelector } from "../redux/slices/user";
import { ROUTES } from "../router/routerList";

interface TimeOption {
  title: string;
  value: string;
}

const timeOptions: TimeOption[] = [
  { title: "Согласен", value: "ok" },
  { title: "Не согласен", value: "no" },
  { title: "Под вопросом", value: "so-so" }
];

export interface ReviewValues {
  helpDesc: string;
  timeOption: string;
  contacts: string;
  orgName: string;
}

type ReviewErrors = {
  [p in keyof ReviewValues]?: ReviewValues[p];
};

const initialValues: ReviewValues = {
  helpDesc: "",
  timeOption: "",
  contacts: "",
  orgName: ""
};

const validate = (values: ReviewValues) => {
  const reviewsError: ReviewErrors = {};

  const descError = checkDescription(values.helpDesc);
  const contactsError = checkDescription(values.contacts);

  if (descError) reviewsError.helpDesc = descError;
  if (contactsError) reviewsError.contacts = contactsError;
  return reviewsError;
};

export const CreateReviewPage = () => {
  const { postId } = useParams();

  const user = useSelector(userSelector);
  const moderRoles = user.positions.filter((role: UserPosition) => {
    return role.status === "moder";
  });
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      rewModal.createRew(values, (postId as unknown as number)).then(() => { navigate(ROUTES.HOME); })
    }
  });

  formik.values.orgName = moderRoles[0].org;
  formik.values.timeOption = timeOptions[0].value;

  const handleChangeOrgName = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.values.orgName = e.target.value;
  }

  return (
    <FormPaper handleSubmit={formik.handleSubmit}>
      <TextField
        multiline
        variant="outlined"
        label="Описание помощи"
        name="helpDesc"
        formik={formik}
        rows={3}
      />

      <TextField
        multiline
        variant="outlined"
        label="Ваши контакты"
        name="contacts"
        formik={formik}
        rows={3}
      />

      <FormControl>
        <FormLabel color="primary" id="timeOption">
          Устраивает ли вас время проведения?
        </FormLabel>
        <RadioGroup
          aria-labelledby="timeOption"
          defaultValue={timeOptions[0].value}
          name="timeOption"
          onChange={formik.handleChange}
        >
          {timeOptions.map((option: TimeOption, index: number) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color="default" />}
              label={option.title}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel color="primary" id="orgName">
          От лица какой организации
        </FormLabel>
        <RadioGroup
          aria-labelledby="orgName"
          defaultValue={moderRoles[0].org}
          name="orgName"
          value={formik.values.orgName}
          onChange={handleChangeOrgName}
        >
          {moderRoles.map((pos: UserPosition, index: number) => (
            <FormControlLabel
              key={index}
              value={pos.org}
              control={<Radio color="default" />}
              label={pos.org}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button fullWidth color="inherit" type="submit" variant="outlined">
        Отправить заявку
      </Button>
    </FormPaper>
  );
};
