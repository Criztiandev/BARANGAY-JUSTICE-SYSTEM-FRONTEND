import authRoutes from "@/feature/public/auth/auth.routes";
import { LocalStorageCredentials } from "@/feature/public/auth/types/auth.interface";
import { AccountSchema } from "@/feature/shared/account/interfaces/account.interface";

export const getRouteByRole = (
  credentials: LocalStorageCredentials | null,
  roleMap: Record<AccountSchema["role"], any>
) => {
  if (!credentials?.role) return authRoutes;

  const userRoles = Array.isArray(credentials.role)
    ? credentials.role
    : [credentials.role];

  // Check if role exists in roleMap
  const selectedRole =
    userRoles.find((role) => role in roleMap) || userRoles[0];
  return roleMap[selectedRole as AccountSchema["role"]] || authRoutes;
};
