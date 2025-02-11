import useMutate from "@/common/hooks/query/useMutate";
import { Case } from "../../types/query.types";
import api from "@/api/client";
import { toast } from "@/common/components/atoms/ui/sonner";
import { useForm } from "react-hook-form";

const useCreateCase = () => {
  const form = useForm();

  const mutation = useMutate({
    mutationKey: ["/POST /case/create"],
    mutationFn: async (data: Case) => await api.post("/case/create", data),

    onSuccess: () => {
      toast.success("Case created successfully");
      form.reset();
    },

    onError: () => {
      toast.error("Failed to create case");
    },
  });

  return { form, ...mutation };
};

export default useCreateCase;
