import { FC, PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from "@mui/material";

export interface RegisterComponentPropsInterface extends PropsWithChildren {}

export const RegisterComponent: FC<RegisterComponentPropsInterface> = () => {
  const { register, handleSubmit, reset } = useForm();
  return (
    <Paper>
      <TextField label="Username" variant="outlined" />
      <TextField label="Email" variant="outlined" />
      <TextField label="Password" variant="outlined" />
      <TextField label="Re-password" variant="outlined" />
      <Button variant="contained">Sing UP</Button>
    </Paper>
  );
};
