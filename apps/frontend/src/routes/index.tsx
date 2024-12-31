import { createBrowserRouter } from "react-router-dom";
import { Home, JobDetails, SignIn, SignUp } from "../pages";
import { PrivateRoute } from "../components";

export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  jobDetails: "/jobs/:jobId",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.signUp,
    element: <SignUp />,
  },

  {
    path: ROUTES.signIn,
    element: <SignIn />,
  },
  {
    path: ROUTES.home,
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.jobDetails,
    element: <JobDetails />,
  },
]);
