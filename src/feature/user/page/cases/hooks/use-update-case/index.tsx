import { useForm } from "react-hook-form";
import { Case } from "../../types/query.types";
import useMutate from "@/common/hooks/query/useMutate";
import api from "@/api/client";

const useUpdateCase = (id: string) => {
  if (!id) {
    throw new Error("ID is required");
  }

  const form = useForm<Case>({});

  const mutation = useMutate({
    mutationKey: [`PUT /case/details/${id}`],
    mutationFn: async (data: Case) =>
      await api.put(`/case/details/${id}`, data),
  });

  return {
    form,
    ...mutation,
  };
};

export default useUpdateCase;
