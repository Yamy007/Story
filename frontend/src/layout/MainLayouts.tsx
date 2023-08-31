import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const MainLayouts = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
