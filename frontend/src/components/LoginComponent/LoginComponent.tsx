import { FC, PropsWithChildren } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import styles from "./LoginComponent.module.scss";
export interface LoginComponentPropsInterface extends PropsWithChildren {}

export const LoginComponent: FC<LoginComponentPropsInterface> = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const userLogin = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.LoginComponent}>
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
        <TextField
          label="Password"
          variant="outlined"
          {...register("password", { required: true })}
        />
        <ButtonGroup>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Sign In
          </Button>
          <Button onClick={() => reset()}>Clear</Button>
        </ButtonGroup>
      </FormControl>
    </div>
  );
};
