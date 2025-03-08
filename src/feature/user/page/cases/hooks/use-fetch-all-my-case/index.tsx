import useSuspenseFetch from "@/common/hooks/query/useSuspenseFetch";
import { CasePaginationResponse } from "../../types/query.types";
import { SuccessResponse } from "@/feature/shared/other/interface/server.interface";
import useAccountStore from "@/feature/public/auth/store/account.store";

const useFetchAllCases = () => {
  const { account } = useAccountStore();

  return useSuspenseFetch<SuccessResponse<CasePaginationResponse>>("/case/all");
};

export default useFetchAllCases;
