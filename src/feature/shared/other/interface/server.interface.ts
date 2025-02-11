export interface ErrorResponse {
  error: string;
  status: number;
}

export interface SuccessResponse<T> {
  payload: T;
  message: string;
}

export interface Pagination {
  page: number;
  pages: number;
  limit: number;
  total: number;
}
