import { FC, PropsWithChildren } from "react";
import { RegisterComponent } from "../components";

export interface RegisterPagePropsInterface extends PropsWithChildren {}

export const RegisterPage: FC<RegisterPagePropsInterface> = () => {
  return <RegisterComponent />;
};
