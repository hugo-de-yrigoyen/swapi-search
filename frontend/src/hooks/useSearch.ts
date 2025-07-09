import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../lib/api";
import { useDebounce } from "./useDebounce";

export const useSearch = (query: string, type?: string) => {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ["search", debouncedQuery, type],
    queryFn: () => searchApi.search(debouncedQuery, type),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDetails = (type: string, id: string) => {
  return useQuery({
    queryKey: ["details", type, id],
    queryFn: () => searchApi.getDetails(type, id),
    enabled: !!type && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
