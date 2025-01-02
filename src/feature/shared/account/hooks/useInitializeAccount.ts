import useAuthStore from "@/feature/public/auth/store/auth.store";
import { LocalStorageCredentials } from "@/feature/public/auth/types/auth.interface";
import { useEffect } from "react";

const useInitializeAccount = () => {
  const { credentials, setCredentials } = useAuthStore();
  useEffect(() => {
    if (!credentials) {
      setCredentials({
        UID: "1",
        role: "user",
        token: "123123",
      } as LocalStorageCredentials);
    }
  }, []);

  return {
    credentials,
  };
};

export default useInitializeAccount;
