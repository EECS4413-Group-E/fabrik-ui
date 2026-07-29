import { queryOptions, skipToken } from '@tanstack/react-query';
import type { Filter } from './models/Filter';

import {
  fetchCurrentUser,
  fetchListingById,
  fetchListings,
  fetchOrderDetails,
  fetchOrders,
  fetchSearchResults,
  fetchWishlist,
} from './Api';

// --- Query keys ---
export const queryKeys = {
  currentUser: () => ['currentUser'] as const,
  listings: () => ['listings'] as const,
  listing: (id: string) => ['listing', id] as const,
  wishlist: () => ['wishlist'] as const,
  orders: () => ['orders'] as const,
  order: (id: string) => ['order', id] as const,
  cart: () => ['cart'] as const,
  search: (keyword: string, filter: Filter) => ['search', keyword, filter] as const,
};

export const optionalCurrentUserQueryOptions = (isLoggedIn: boolean) =>
  queryOptions({
    queryKey: queryKeys.currentUser(),
    queryFn: isLoggedIn ? fetchCurrentUser : skipToken,
  });

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

export const wishlistQueryOptions = (isLoggedIn: boolean) =>
  queryOptions({
    queryKey: queryKeys.wishlist(),
    queryFn: isLoggedIn ? fetchWishlist : skipToken,
  });

export const orderDetailsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.order(id),
    queryFn: () => fetchOrderDetails(id),
  });

export const ordersQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.orders(),
    queryFn: fetchOrders,
  });

export const searchQueryOptions = (
  keyword: string,
  filter: Filter,
  pageNumber: number,
  pageSize: number,
) =>
  queryOptions({
    queryKey: ['search', keyword, filter, pageNumber, pageSize],
    queryFn: () => fetchSearchResults(keyword, filter, pageNumber, pageSize),
  });
