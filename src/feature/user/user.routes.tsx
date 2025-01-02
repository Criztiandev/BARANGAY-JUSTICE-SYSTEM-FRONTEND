import { createBrowserRouter } from "react-router-dom";
import UserDashboard from "./page/dashboard";
import NotFoundScreen from "@/common/components/helper/no-found";
import BaseLayout from "@/common/components/layout/base-layout";
import userSidebarConfig from "./config/sidebar.config";
import userMenuGroups from "./config/menu.config";
import CaseScreen from "./page/cases";

const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout
        sidebarConfig={userSidebarConfig}
        menuGroups={userMenuGroups}
      />
    ),
    children: [
      { path: "", element: <UserDashboard /> },
      { path: "cases", element: <CaseScreen /> },
    ],
  },
  { path: "*", element: <NotFoundScreen /> },
]);

export default userRoutes;
