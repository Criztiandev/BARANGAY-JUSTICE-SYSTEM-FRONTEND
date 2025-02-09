export interface ErrorResponse {
  error: string;
  status: number;
}

export interface SuccessResponse<T> {
  payload: T;
  message: string;
}
