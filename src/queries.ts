import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser, fetchListings, fetchListingById } from "./Api";

// --- Query keys ---
export const queryKeys = {
  currentUser: () => ["currentUser"] as const,
  listings: () => ["listings"] as const,
  listing: (id: string) => ["listing", id] as const
};

// --- Query options ---
export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.currentUser(),
    queryFn: () => fetchCurrentUser(),
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