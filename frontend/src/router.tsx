import { Navigate, createBrowserRouter } from "react-router-dom";

import { MainLayouts } from "./layout";
import { HomePage, LoginPage, RegisterPage, StoryPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Navigate to={"home"} />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "stories",
        element: <StoryPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
