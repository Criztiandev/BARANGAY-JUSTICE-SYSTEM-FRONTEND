import { IAccountSchema } from "@/feature/shared/account/account.interface";

export interface ILoginValue
  extends Pick<IAccountSchema, "email" | "password"> {}
