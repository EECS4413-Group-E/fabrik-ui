import { queryOptions } from "@tanstack/react-query";

import {
  fetchCart,
  fetchCurrentUser,
  fetchListingById,
  fetchListings,
  fetchWishlist,
} from "./Api";

export const queryKeys = {
  currentUser: () => ["currentUser"] as const,
  listings: () => ["listings"] as const,
  listing: (id: string) => ["listing", id] as const,
  wishlist: () => ["wishlist"] as const,
  cart: () => ["cart"] as const,
};

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.currentUser(),
    queryFn: fetchCurrentUser,
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

export const wishlistQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.wishlist(),
    queryFn: fetchWishlist,
  });

export const cartQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.cart(),
    queryFn: fetchCart,
  });