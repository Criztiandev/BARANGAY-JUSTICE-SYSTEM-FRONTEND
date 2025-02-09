import { RouterProvider, RouterProviderProps } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRouteByRole } from "./utils/other/getRouteByRole";
import userRoutes from "./feature/user/user.routes";
import adminRoutes from "./feature/admin/admin.routes";
import { AccountSchema } from "./feature/shared/account/interfaces/account.interface";
import useInitializeAccount from "./feature/shared/account/hooks/useInitializeAccount";
import LoadingScreen from "./common/components/atoms/helper/loading-screen/index.tsx";
import authRoutes from "@/feature/public/auth/auth.routes.tsx";

const roleMap: Record<AccountSchema["role"], any> = {
  user: userRoutes,
  admin: adminRoutes,
};

const App = () => {
  const { credentials } = useInitializeAccount();
  const [router, setRouter] = useState<RouterProviderProps["router"] | null>(
    null
  );

  useEffect(() => {
    if (credentials) {
      const _preferredRoute = getRouteByRole(credentials, roleMap);
      setRouter(_preferredRoute);
    }
  }, [credentials]);

  if (!router) return <LoadingScreen />;

  return <RouterProvider router={authRoutes} />;
};

export default App;
