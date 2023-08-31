import { FC, PropsWithChildren } from "react";
import { AppBar } from "@mui/material";

import styles from "./Header.module.scss";

export interface HeaderPropsInterface extends PropsWithChildren {}

export const Header: FC<HeaderPropsInterface> = () => {
  return (
    <AppBar
      className={styles.Header}
      sx={{ bgcolor: styles.Header }}
      position="sticky"
    >
      SOME TEXT
    </AppBar>
  );
};
