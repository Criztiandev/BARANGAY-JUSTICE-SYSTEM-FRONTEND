import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminDashboard from "./page/dashboard";

const adminRoutes = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace /> },
  { path: "/", element: <AdminDashboard /> },
]);

export default adminRoutes;
