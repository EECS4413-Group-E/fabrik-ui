import axios from "axios";
import type { LoginRegisterRequest, User } from "./models/User";
import type { Listing } from "./models/Listing";
import type { Order, PlaceOrderRequest } from "./models/Order";

import { tokenStore } from "./tokenStore";
import type { AccessTokenResponse } from "./models/AccessTokenResponse";

import type { WishListItem } from "./models/WishList";

// Will be using this once the gateway is set up properly
const API_BASE_URL = "http://localhost:5000/api";

// Temporary order API URL for testing purposes
// To be removed once the gateway is set up properly
const TEMP_ORDER_API_URL = "http://localhost:4004/order";

const TEMP_LISTINGS_API_URL = "http://localhost:4002/listing";


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle expired access token: refresh once, retry original request
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthCall = originalRequest.url?.includes("/auth");

    // On error, if we get a 401 and have not retried yet, try to refresh the token and retry the original request
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true;
      try {
        const { data } = await apiClient.post<AccessTokenResponse>("/auth/refresh");
        tokenStore.set(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        tokenStore.set(null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const getWithConfig = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};

const postWithConfig = async <Request, Response>(url: string, data?: Request): Promise<Response> => {
  const response = await apiClient.post<Response>(url, data);
  return response.data;
};

const putWithConfig = async <Request, Response>(url: string, data: Request): Promise<Response> => {
  const response = await apiClient.put<Response>(url, data);
  return response.data;
};

const deleteWithConfig = async <Response>(url: string): Promise<Response> => {
  const response = await apiClient.delete<Response>(url);
  return response.data;
};

export const registerUser = (data: LoginRegisterRequest) => {
  return postWithConfig<LoginRegisterRequest, AccessTokenResponse>("/user/register", data);
}

export const loginUser = (data: LoginRegisterRequest) => {
  return postWithConfig<LoginRegisterRequest, AccessTokenResponse>("/auth/login", data);
}

export const fetchCurrentUser = () => {
  return getWithConfig<User>("/user");
};

export const fetchListings = () => {
  return getWithConfig<Listing[]>(TEMP_LISTINGS_API_URL);
};


export const placeOrder = async (orderRequest: PlaceOrderRequest) => {
  const response = await postWithConfig<PlaceOrderRequest, string | Order>(
    TEMP_ORDER_API_URL,
    orderRequest,
  );

  if (typeof response === "string") {
    return response;
  }

  return response.id;
};


export const fetchListingById = (id: string) => {
  return getWithConfig<Listing>(`${TEMP_LISTINGS_API_URL}/${id}`);
};

export const fetchWishlist = () => {
  return getWithConfig<WishListItem[]>(TEMP_WISHLIST_API_URL);
};

export const removeWishlistItem = async (listingId: string) => {
  await axios.delete(`${TEMP_WISHLIST_API_URL}/${listingId}`, getAxiosConfig());
};

