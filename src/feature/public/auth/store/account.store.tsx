import { Account } from "@/feature/shared/account/interfaces/account.interface";
import { create } from "zustand";

interface AccountStoreBlueprint {
  account: Account | null;
  setAccount: (account: Account) => void;
  removeAccount: () => void;
  getAccount: () => Account | null;
}

const useAccountStore = create<AccountStoreBlueprint>((set, get) => ({
  account: null,
  setAccount: (account: Account) => set({ account }),
  removeAccount: () => set({ account: null }),
  getAccount: () => get().account,
}));

export default useAccountStore;
