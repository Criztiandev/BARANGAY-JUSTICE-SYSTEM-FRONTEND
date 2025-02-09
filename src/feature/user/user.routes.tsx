import { createBrowserRouter } from "react-router-dom";
import UserDashboard from "./page/dashboard";
import BaseLayout from "@/common/components/template/layout/base-layout";
import userSidebarConfig from "./config/sidebar.config";
import userMenuGroups from "./config/menu.config";
import UserCaseScreen from "./page/cases";
import UserDocumentScreen from "./page/documents";
import ActivityScreen from "./page/activity";
import CaseDetailsScreen from "./page/case-details";
import NotFoundScreen from "@/common/components/atoms/helper/not-found-scren";
import ProfileScreen from "../shared/account/page/profile";

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
      { path: "cases", element: <UserCaseScreen /> },
      { path: "documents", element: <UserDocumentScreen /> },
      { path: "cases/:id", element: <CaseDetailsScreen /> },
      { path: "activity", element: <ActivityScreen /> },
      { path: "profile", element: <ProfileScreen /> },
    ],
  },
  { path: "*", element: <NotFoundScreen /> },
]);

export default userRoutes;
