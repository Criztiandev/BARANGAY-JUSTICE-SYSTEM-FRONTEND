import useSuspenseFetch from "@/common/hooks/query/useSuspenseFetch";
import { CasePaginationResponse } from "../../types/query.types";
import { SuccessResponse } from "@/feature/shared/other/interface/server.interface";

const useFetchAllCases = () => {
  return useSuspenseFetch<SuccessResponse<CasePaginationResponse>>("/case/all");
};

export default useFetchAllCases;
