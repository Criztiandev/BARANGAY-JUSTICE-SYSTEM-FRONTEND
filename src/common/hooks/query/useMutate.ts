import { AxiosError } from "axios";
import {
  MutationOptions,
  QueryKey,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { ErrorResponse } from "@/feature/shared/other/interface/server.interface";

type ExtendedError = Error & {
  status?: number;
  statusText?: string;
  code?: string;
  details?: {
    message: string;
  }[];
};

interface UseMutateOptions<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
> extends MutationOptions<TData, ExtendedError, TVariables, TContext> {
  queryKey?: QueryKey;
  customErrorHandler?: (error: ExtendedError) => void;
  retryOnNetworkError?: boolean;
  timeout?: number;
}

/**
 * Enhanced mutation hook with improved error handling and type safety
 * @template TData The type of successful response data
 * @template TVariables The type of variables passed to the mutation function
 * @template TContext The type of context
 */
const useMutate = <TData = unknown, TVariables = unknown, TContext = unknown>(
  options: UseMutateOptions<TData, TVariables, TContext>
): UseMutationResult<TData, ExtendedError, TVariables, TContext> => {
  const {
    customErrorHandler,
    retryOnNetworkError = false,
    timeout = 30000,
    ...mutationOptions
  } = options;

  return useMutation<TData, ExtendedError, TVariables, TContext>({
    ...mutationOptions,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError) {
        // Only retry on network errors if enabled
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          return retryOnNetworkError && failureCount < 3;
        }
        // Don't retry on client or server errors
        return false;
      }
      return false;
    },
    onError: (
      error: unknown,
      variables: TVariables,
      context: TContext | undefined
    ) => {
      let finalError: ExtendedError;

      if (error instanceof AxiosError) {
        if (error.response) {
          // Server returned an error response
          const { error: errorMessage } = error.response.data as ErrorResponse;
          finalError = new Error(
            errorMessage || "Server error"
          ) as ExtendedError;

          const firstError =
            error.response.data.details?.[0].message.toString() ||
            error.response.data?.error ||
            "Server error";

          const upperCaseError =
            firstError[0].toUpperCase() + firstError.slice(1).toLowerCase();

          finalError.details = error.response.data.details;

          finalError.status = error.response.status;
          finalError.statusText = error.response.statusText;
          finalError.message = upperCaseError;
          finalError.details = error.response.data.details;
        } else if (error.request) {
          // Request was made but no response received
          finalError = new Error(
            error.code === "ECONNABORTED"
              ? `Request timeout after ${timeout}ms`
              : error.message || "No response received from the server"
          ) as ExtendedError;
          finalError.code = error.code;
        } else {
          // Error in request configuration
          finalError = new Error(
            error.message || "Request configuration error"
          ) as ExtendedError;
        }
      } else {
        finalError = new Error(
          (error as Error)?.message || "An unknown error occurred"
        ) as ExtendedError;
      }

      // Call custom error handler if provided
      if (customErrorHandler) {
        customErrorHandler(finalError);
      }

      if (options.onError) {
        options.onError(finalError, variables, context);
      }

      throw finalError;
    },
  });
};

export default useMutate;
