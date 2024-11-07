import http, { httpForm } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation, useQueries } from "@tanstack/react-query";

interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

interface PaginationOptions {
  dataKey?: string; 
  totalPagesKey?: string; 
  totalItemsKey?: string; 
  currentPageKey?: string; 
}

interface PaginationHookReturn<T> {
  isLoading: boolean;
  data: PaginatedResponse<T> | undefined | any;
  error: unknown;
  isError: boolean;
  refetch: () => void;
}

interface hookReturn {
  isLoading: boolean;
  data: AxiosResponse | undefined;
  error: unknown;
  isError: boolean;
  refetch: () => void;
  isInitialLoading: boolean;
  isFetching: boolean;
}

//for handling GET requests
export const useFetch = (
  key: string,
  url: string,
  success?: (data: AxiosResponse) => void,
  errorfn?: (err: any) => void,
  refetchInterval?: number,
  enabled: boolean = true,
  retry?: boolean | number
): hookReturn => {
  const {
    isLoading,
    isFetching,
    data,
    error,
    isError,
    refetch,
    isInitialLoading,
  } = useQuery([key], async () => http.get(url), {
    onSuccess: success,
    onError: errorfn,
    enabled,
    refetchInterval,
    staleTime: Infinity,
    retry,
  });

  return {
    isLoading,
    data,
    error,
    isError,
    refetch,
    isInitialLoading,
    isFetching,
  };
};


export const usePaginatedFetch = <T>(
  key: string,
  url: string,
  page: number,
  limit: number,
  options?: PaginationOptions,
  success?: (data: AxiosResponse) => void,
  errorfn?: (err: any) => void,
): PaginationHookReturn<T> => {
  const {
    dataKey = "data", 
    totalPagesKey = "totalPages",
    totalItemsKey = "totalItems",
    currentPageKey = "currentPage",
  } = options || {};

  const { isLoading, data, error, isError, refetch } = useQuery(
    [key, page, limit],
    async () => {
      const response = await http.get(url, {
        params: { page, limit },
      });

   
      return {
        data: response.data.data[dataKey],
        totalPages: response.data.data[totalPagesKey], 
        totalItems: response.data.data[totalItemsKey], 
        currentPage: response.data.data[currentPageKey], 
      };
    },
    {
      onSuccess: success,
      onError: errorfn,
      keepPreviousData: true,
    },
  );

  return {
    isLoading,
    data,
    error,
    isError,
    refetch,
  };
};
//for handling PUT, POST, PATCH, DELETE requests
export const useMutate = (
  method: string,
  url: string,
  onSuccess?: (data: AxiosResponse|undefined) => void,
  onMutate?: () => void,
  onError?: (err: AxiosError, variables?: any) => void,
  onSettled?: () => void
) => {
  const { isLoading, data, mutate, error, isError } = useMutation(
    async (body) => {
      if (method === "post") {
        return await http.post(url, body);
      } else if (method === "put") {
        return await http.put(url, body);
      } else if (method === "patch") {
        return await http.patch(url, body);
      } else if (method === "delete") {
        return await http.delete(url);
      }
    },
    { onMutate, onSuccess, onError, onSettled }
  );

  return { isLoading, data, mutate, error, isError };
};

//for handling PUT, POST, PATCH, DELETE requests with formdata
export const useFormDataMutate = (
  method: string,
  url: string,
  onSuccess?: (data: AxiosResponse | undefined) => void,
  onMutate?: () => void,
  onError?: (err: AxiosError) => void,
  onSettled?: () => void,
) => {
  const { isLoading, data, mutate, error, isError } = useMutation(
    async (body:any) => {
        if (method === "post") {
          return await httpForm.post(url, body);
        } else if (method === "put") {
          return await httpForm.put(url, body);
        } else if (method === "patch") {
          return await httpForm.patch(url, body);
        } else if (method === "delete") {
          return await httpForm.delete(url);
        }
      },
    { onMutate, onSuccess, onError, onSettled }
  );

  return { isLoading, data, mutate, error, isError };
};
