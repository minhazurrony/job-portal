import { createBrowserRouter } from "react-router-dom";
import { Home, SignIn, SignUp } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
