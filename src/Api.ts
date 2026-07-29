import axios from 'axios';
import type { LoginRegisterRequest, User } from './models/User';
import type { Listing, ListingItem } from './models/Listing';
import type { Order, PlaceOrderRequest } from './models/Order';

import { tokenStore } from './tokenStore';
import type { AccessTokenResponse } from './models/AccessTokenResponse';

import type { WishListItem } from './models/WishList';

import type {
  AddCartItemRequest,
  CartItem,
  RemoveCartItemRequest,
  UpdateCartItemQuantityRequest,
} from './models/CartItem';
import type { PageableResponse } from './models/PageableResponse';
import type { Filter } from './models/Filter';

import type { AddReviewRequest, ReviewPage } from './models/Review';

const API_BASE_URL = 'http://localhost:5000/api';

// Temporary direct URL until the frontend order request is fully moved
// to the Gateway.
const TEMP_ORDER_API_URL = 'http://localhost:4004/order';

type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;

export const registerUnauthorizedHandler = (handler: UnauthorizedHandler) => {
  onUnauthorized = handler;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.peek();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthCall = originalRequest.url?.includes('/auth');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true;

      try {
        const { data } = await apiClient.post<AccessTokenResponse>('/auth/refresh');
        tokenStore.set(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        tokenStore.set(null);
        onUnauthorized?.();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const getWithConfig = async <Response>(url: string): Promise<Response> => {
  const response = await apiClient.get<Response>(url);
  return response.data;
};

const putWithConfig = async <Request, Response>(url: string, data?: Request): Promise<Response> => {
  const response = await apiClient.put<Response>(url, data);
  return response.data;
};

const postWithConfig = async <Request, Response>(
  url: string,
  data?: Request,
): Promise<Response> => {
  const response = await apiClient.post<Response>(url, data);
  return response.data;
};

const deleteWithConfig = async <Response>(url: string): Promise<Response> => {
  const response = await apiClient.delete<Response>(url);
  return response.data;
};

export const registerUser = (data: LoginRegisterRequest) => {
  return postWithConfig<LoginRegisterRequest, AccessTokenResponse>('/user/register', data);
};

export const loginUser = (data: LoginRegisterRequest) => {
  return postWithConfig<LoginRegisterRequest, AccessTokenResponse>('/auth/login', data);
};

export const refreshUser = () => {
  return postWithConfig<undefined, AccessTokenResponse>('/auth/refresh');
};

export const logoutUser = () => {
  return postWithConfig<undefined, AccessTokenResponse>('/auth/logout');
};

export const fetchCurrentUser = () => {
  return getWithConfig<User>('/user');
};

export const fetchListings = () => {
  return getWithConfig<ListingItem[]>('/catalogue/listings');
};

export const fetchOrders = () => {
  return getWithConfig<Order[]>('/order/user');
};

export const fetchOrderDetails = (orderId: string) => {
  return getWithConfig<Order>(`/order/${orderId}`);
};

export const placeOrder = async (orderRequest: PlaceOrderRequest) => {
  const response = await postWithConfig<PlaceOrderRequest, string | Order>(
    TEMP_ORDER_API_URL,
    orderRequest,
  );

  if (typeof response === 'string') {
    return response;
  }

  return response.id;
};

export const fetchListingById = (listingid: string) => {
  return getWithConfig<Listing>(`/catalogue/listing/${listingid}`);
};

export const fetchSearchResults = (keyword: string, filter: Filter, pageNumber: number, pageSize: number) => {
  return postWithConfig<Filter, PageableResponse<ListingItem>>(`/catalogue/listings/search?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`, filter);
};

export const fetchWishlist = () => {
  return getWithConfig<WishListItem[]>('/user/wishlist');
};

export const addWishlistItem = (listingId: string) => {
  return postWithConfig<undefined, void>(`/user/wishlist/${listingId}`);
};

export const removeWishlistItem = (listingId: string) => {
  return deleteWithConfig<void>(`/user/wishlist/${listingId}`);
};

/*
 * These cart URLs are based on Farhad's completed User Service contract
 * and the existing Gateway /api/user pattern. Change only this section
 * if Ronald chooses different Gateway paths.
 */

export const fetchCart = () => {
  return getWithConfig<CartItem[]>('/user/cart');
};

export const addCartItem = (request: AddCartItemRequest) => {
  return postWithConfig<AddCartItemRequest, void>('/user/cart', request);
};

export const updateCartItemQuantity = async (request: UpdateCartItemQuantityRequest) => {
  const response = await apiClient.patch<void>('/user/cart', request);
  return response.data;
};

export const replaceCart = (request: AddCartItemRequest[]) => {
  return putWithConfig<AddCartItemRequest[], void>('/user/cart', request);
};

export const removeCartItem = (request: RemoveCartItemRequest) => {
  const productId = encodeURIComponent(request.productId);
  const size = encodeURIComponent(request.size);

  return deleteWithConfig<void>(`/user/cart/${productId}/${size}`);
};

export const clearCart = () => {
  return deleteWithConfig<void>('/user/cart');
};

export const fetchReviews = async (listingId: string) => {
  return getWithConfig<ReviewPage>(`/catalogue/listing/${listingId}/review`);
};

export const addReview = async (listingId: string, data: AddReviewRequest) => {
  return postWithConfig<AddReviewRequest, void>(`/catalogue/listing/${listingId}/review`, data); 
};
