import { FC, PropsWithChildren } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import styles from "./LoginComponent.module.scss";
export interface LoginComponentPropsInterface extends PropsWithChildren {}

interface FormInputInteface {
  username: string;
  password: string;
}

export const LoginComponent: FC<LoginComponentPropsInterface> = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputInteface>();

  const userLogin = (data: any) => {
    console.log(data);
  };

  return (
    <Box className={styles.LoginComponent}>
      <Typography component="p" variant="h4">
        Sing In
      </Typography>
      <Typography className={styles.textText}>Create an account?</Typography>
      <FormControl component="form" onSubmit={handleSubmit(userLogin)}>
        <TextField
          label="Username"
          variant="outlined"
          {...register("username", { required: true })}
        />
        {errors.username && <Typography>{errors.username.message}</Typography>}
        <TextField
          label="Password"
          variant="outlined"
          {...register("password", { required: true })}
        />
        {errors.password && <Typography>{errors.password.message}</Typography>}
        <ButtonGroup component="div" size="large">
          <Button variant="contained" type="submit" disabled={!isValid}>
            Sign In
          </Button>
          <Button onClick={() => reset()}>Clear</Button>
        </ButtonGroup>
      </FormControl>
    </Box>
  );
};
