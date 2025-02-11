import { Account } from "@/feature/shared/account/interfaces/account.interface";
import { Pagination } from "@/feature/shared/other/interface/server.interface";

export interface Case {
  _id?: string;
  title: string;
  caseNumber: string;
  type: string;
  complinant: Account;
  defendant: Account;
  description: string;
  status: string;
  createdBy: string;
  updatedBy: string;
}

export interface CasePaginationResponse {
  data: Case[];
  pagination: Pagination;
}
