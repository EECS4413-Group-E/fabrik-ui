import { queryOptions } from "@tanstack/react-query";
import { fetchUserData } from "./Api";

// --- Query keys ---
export const queryKeys = {
  user: (id: string) => ["user", id] as const,
};

// --- Query options ---
export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUserData(id),
  });
