import { queryOptions } from '@tanstack/react-query';

import {
  fetchCart,
  fetchCurrentUser,
  fetchListings,
  fetchListingById,
  fetchWishlist,
  fetchOrderDetails,
  fetchOrders,
  fetchSearchResults,
} from './Api';
import type { Filter } from './models/Filter';

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

export const cartQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.cart(),
    queryFn: fetchCart,
  });

export const searchQueryOptions = (keyword: string, filter: Filter) =>
  queryOptions({
    queryKey: ['search', keyword, filter],
    queryFn: () => fetchSearchResults(keyword, filter),
  }); 
