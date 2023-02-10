import { Typography, CardContent, CardActions, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routerList";

interface CardShortProps {
  orgName: string;
  canSelect: boolean;
  desc: string;
  name: string;
  btnText: string;
  postId: number;
}

export const CardShortDesc: React.FC<CardShortProps> = ({
  orgName,
  canSelect,
  desc,
  name,
  btnText,
  postId
}) => {
  const navigate = useNavigate();

  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {orgName}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          просит помощи с:
        </Typography>
        <Typography variant="body2">{desc}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => { navigate(`${ROUTES.REVIEW_CREATE}/${postId}`); }}
          color="primary"
          disabled={!canSelect}
          size="small"
        >
          {btnText}
        </Button>
      </CardActions>
    </>
  );
};
