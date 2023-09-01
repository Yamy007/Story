import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export interface UserSettingComponentPropsInterface extends PropsWithChildren {}

export const UserSettingComponent: FC<
  UserSettingComponentPropsInterface
> = () => {
  return (
    <Box>
      <img src="" alt="user image" />
      <FormControl component="form">
        <TextField label="Username"/>
        <TextField label="First name"/>
        <TextField label="Last name"/>
        <TextField label="Email"/>
        <TextField label="Phone"/>
        <TextField label="Phone"/>
        <TextField label="Address"/>
        <TextField label="BIO"/>
      </FormControl>
      
    </Box>
  );
};
