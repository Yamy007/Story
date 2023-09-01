import { FC, PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import styles from "./Header.module.scss";
import { Typography } from "@mui/material";

export interface HeaderPropsInterface extends PropsWithChildren {}

export const Header: FC<HeaderPropsInterface> = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#2a3447",
        borderBottom: "1px solid #ddd",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          justifyContent: "start",
          justifyItems: "center",
          alignItem: "center",
        }}
      >
        <Typography sx={{ color: "#fff" }} variant="h4">
          LOGO
        </Typography>
      </Box>
    </AppBar>
  );
};
