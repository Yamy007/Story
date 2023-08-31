import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

export const MainLayouts = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
