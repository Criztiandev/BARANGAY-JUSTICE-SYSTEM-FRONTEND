import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/login";
import RegisterPage from "./page/register";
import ForgotPasswordPage from "./page/forgot-password";
import NotFoundScreen from "@/common/components/atoms/helper/not-found-scren";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
    children: [
      {
        path: "test",
        element: <div>test</div>,
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <NotFoundScreen />,
  },
]);

export default router;
