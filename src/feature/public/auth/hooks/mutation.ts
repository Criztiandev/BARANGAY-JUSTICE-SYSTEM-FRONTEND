import api from "@/api/client";
import useMutate from "@/common/hooks/query/useMutate";
import { useForm } from "react-hook-form";
import { ILoginValue } from "../types/login.interface";
import { IRegisterValue } from "../types/register.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginValidation from "../validation/login.validation";
import RegisterValidation from "../validation/register.validation";

export const useLogin = () => {
  const form = useForm<ILoginValue>({
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

  return { form, mutate };
};

export const useRegister = () => {
  const form = useForm<IRegisterValue>({
    resolver: zodResolver(RegisterValidation),
  });

  const mutate = useMutate({
    mutationKey: ["/POST /auth/register"],
    mutationFn: async () => await api.post("/"),
  });

  return { form, mutate };
};
