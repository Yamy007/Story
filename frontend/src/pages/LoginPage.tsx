import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";

import { LoginComponent } from "../components";

export interface LoginPagePropsInterface extends PropsWithChildren {}

export const LoginPage: FC<LoginPagePropsInterface> = () => {
  return (
    <Box>
      <LoginComponent />
    </Box>
  );
};
