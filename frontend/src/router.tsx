import { Navigate, createBrowserRouter } from "react-router-dom";

import { MainLayouts } from "./layout";
import { HomePage, LoginPage, RegisterPage, StoryPage } from "./pages";
import { cookieService } from "./services";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayouts />,
    // loader: () => cookieService.cookie(),
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
