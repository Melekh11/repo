import { Paper, type PaperProps } from "@mui/material";
import React from "react";

type FormPaperProps = { handleSubmit: () => void } & PaperProps;

export const FormPaper: React.FC<FormPaperProps> = ({
  children,
  handleSubmit
}) => {
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        alignSelf: "center",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: "10px 0", width: "25ch" },
        "& .MuiFormControl-root": { m: "10px 0", width: "25ch" },
        "& .MuiButton-root": { m: "10px 0" },
        backgroundColor: "#F9F9F9",
        p: 5,
        borderRadius: 6
      }}
      noValidate
      autoComplete="off"
    >
      {children}
    </Paper>
  );
};
