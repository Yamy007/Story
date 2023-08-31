import { FC, PropsWithChildren } from "react";
import { Paper } from "@mui/material";

import { LoginComponent } from "../components";

export interface LoginPagePropsInterface extends PropsWithChildren {}

export const LoginPage: FC<LoginPagePropsInterface> = () => {
  return (
    <Paper>
      <LoginComponent />
    </Paper>
  );
};
