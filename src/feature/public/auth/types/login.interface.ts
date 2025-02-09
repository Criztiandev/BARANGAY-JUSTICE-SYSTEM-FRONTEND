import { AccountSchema } from "@/feature/shared/account/interfaces/account.interface";

export interface ILoginValue
  extends Pick<AccountSchema, "email" | "password"> {}
