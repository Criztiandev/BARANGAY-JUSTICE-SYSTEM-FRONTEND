import { IAccountSchema } from "@/feature/shared/account/account.interface";

export interface IRegisterValue extends IAccountSchema {
  toa: boolean;
}
