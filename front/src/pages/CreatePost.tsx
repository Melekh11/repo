import { useFormik } from "formik";
import React, { useState } from "react";
import { FormPaper } from "../components/FormPaper";
import { TextField } from "../components/TextField";
import { checkAudienceNum } from "../helpers/checkers/checkAudienceNum";
import { checkDeltaTime } from "../helpers/checkers/checkDeltaTime";
import { checkDescription } from "../helpers/checkers/checkDescription";
import { checkName } from "../helpers/checkers/name";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { CalendarPickerView } from "@mui/x-date-pickers";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField as MuiTextField
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "../hooks/useRedux";
import { type UserPosition, userSelector } from "../redux/slices/user";
import { postModel } from "../models/post";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routerList";
import { postController } from "../controllers/post";

export interface PostValues {
  name: string;
  audience: number;
  saveTime: number;
  desc: string;
  orgName: string;
  dateStart: string;
  // date: string;
  // isPrivate
  namePrivate?: string;
  // choose org
}

type PostErrors = {
  [p in keyof PostValues]?: string;
};

const date = new Date();

const initialValues: Omit<PostValues, "dateStart"> = {
  name: "",
  audience: 5,
  saveTime: 5,
  desc: "",
  orgName: ""
};

const validate = (values: PostValues) => {
  const postErrors: PostErrors = {};

  const nameError = checkName(values.name);
  const audienceError = checkAudienceNum(values.audience);
  const saveTimeError = checkDeltaTime(values.saveTime);
  const descError = checkDescription(values.desc);

  if (nameError) postErrors.name = nameError;
  if (audienceError) postErrors.audience = audienceError;
  if (saveTimeError) postErrors.saveTime = saveTimeError;
  if (descError) postErrors.desc = descError;

  return postErrors;
};

export const CreatePostPage = () => {
  const [dateStart, setDateStart] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
  );
  const handleDateStartChange = (val: Dayjs) => { setDateStart(val); };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const moderRoles = user.positions.filter((role: UserPosition) => {
    return role.status === "moder";
  });

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: PostValues) => {
      postController
        .createPost(
          { ...values, startData: dateStart },
          formik.values.orgName,
          dispatch
        )
        .then(() => { navigate(ROUTES.HOME); });
    }
  });

  formik.values.orgName = moderRoles[0].org;

  return (
    <FormPaper handleSubmit={formik.handleSubmit}>
      <TextField label="Название" name="name" formik={formik} />
      <TextField
        type="number"
        label="Аудитория"
        name="audience"
        formik={formik}
      />
      <TextField
        multiline
        variant="outlined"
        label="Описание"
        name="desc"
        formik={formik}
        rows={4}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={dateStart}
          onChange={handleDateStartChange}
          renderInput={(params) => <MuiTextField {...params} />}
        />
      </LocalizationProvider>

      <FormControl>
        <FormLabel color="primary" id="demo-radio-buttons-group-label">
          От лица какой организации
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={moderRoles[0].org}
          name="radio-buttons-group"
          onChange={formik.handleChange}
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
        Создать пост
      </Button>
    </FormPaper>
  );
};
