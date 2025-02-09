import api from "@/api/client";
import useMutate from "@/common/hooks/query/useMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginValidation from "../../validation/login.validation";
import { useForm } from "react-hook-form";
import { LoginRequestValue } from "../../types/login.interface";

export const useLogin = () => {
  const form = useForm<LoginRequestValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginValidation),
  });

  const mutate = useMutate({
    mutationKey: ["/POST /auth/login"],
    mutationFn: async () => await api.post("/"),
  });

  return { form, ...mutate };
};

export default useLogin;
