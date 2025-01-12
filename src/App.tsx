import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRouteByRole } from "./utils/other/getRouteByRole";
import userRoutes from "./feature/user/user.routes";
import adminRoutes from "./feature/admin/admin.routes";
import { AccountSchema } from "./feature/shared/account/interfaces/account.interface";
import useInitializeAccount from "./feature/shared/account/hooks/useInitializeAccount";
import LoadingScreen from "./common/components/template/helper/loading-screen";

const roleMap: Record<AccountSchema["role"], any> = {
  user: userRoutes,
  admin: adminRoutes,
};

const App = () => {
  const { credentials } = useInitializeAccount();
  const [router, setRouter] = useState<any | null>(null);

  useEffect(() => {
    if (credentials) {
      const _preferredRoute = getRouteByRole(credentials, roleMap);
      setRouter(_preferredRoute);
    }
  }, [credentials]);

  if (!router) return <LoadingScreen />;
  return <RouterProvider router={router} />;
};

export default App;
