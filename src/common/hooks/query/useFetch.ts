import { useQuery, UseQueryResult } from "@tanstack/react-query";

type FetchResult<T> = UseQueryResult<T, Error>;

function useFetch<T>(url: string): FetchResult<T> {
  return useQuery<T, Error>({
    queryKey: [url],
    queryFn: async (): Promise<T> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}

export default useFetch;
