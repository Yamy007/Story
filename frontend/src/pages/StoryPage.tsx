import { FC, PropsWithChildren, useEffect } from "react";
import Paper from "@mui/material/Paper";

import { Stories } from "../components";
import { useAppDispatch } from "../hooks";
import { storyActions } from "../redux";

export interface StoryPagePropsInterface extends PropsWithChildren {}

export const StoryPage: FC<StoryPagePropsInterface> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(storyActions.getAll());
  }, [dispatch]);
  return (
    <Paper sx={{ padding: "2rem", margin: "2rem" }}>
      <Stories />
    </Paper>
  );
};
