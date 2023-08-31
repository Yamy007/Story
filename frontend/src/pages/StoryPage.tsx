import { FC, PropsWithChildren } from "react";
import { Paper } from "@mui/material";

import { Stories } from "../components";

export interface StoryPagePropsInterface extends PropsWithChildren {}

export const StoryPage: FC<StoryPagePropsInterface> = () => {
  return (
    <Paper sx={{ padding: "2rem", margin: "2rem" }}>
      <Stories />
    </Paper>
  );
};
