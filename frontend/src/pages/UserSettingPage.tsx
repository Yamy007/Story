import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";

import { UserSettingComponent } from "../components";

export interface UserSettingPagePropsInterface extends PropsWithChildren {}

export const UserSettingPage: FC<UserSettingPagePropsInterface> = () => {
  return (
    <Box>
      <UserSettingComponent />
    </Box>
  );
};
