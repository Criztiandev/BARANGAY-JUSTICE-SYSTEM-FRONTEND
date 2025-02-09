import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/login";
import RegisterPage from "./page/register";
import ForgotPasswordPage from "./page/forgot-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
]);

export default router;
