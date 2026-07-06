import { queryOptions } from "@tanstack/react-query";
import { fetchUserData, fetchListings, fetchListingById } from "./Api";

// --- Query keys ---
export const queryKeys = {
  user: (id: string) => ["user", id] as const,
  listings: () => ["listings"] as const,
  listing: (id: string) => ["listing", id] as const
};

// --- Query options ---
export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUserData(id),
  });

  export const listingsQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.listings(),
    queryFn: fetchListings,
  });


  export const singleListingQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.listing(id),
    queryFn: () => fetchListingById(id),
  });