import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

export interface UserSettingComponentPropsInterface extends PropsWithChildren {}

export const UserSettingComponent: FC<
  UserSettingComponentPropsInterface
> = () => {
  return <Box>
    <img src="" alt="user image" />
    <FormControl component="form">
      <TextField label=""></TextField>

    </FormControl>
  </Box>;
};
