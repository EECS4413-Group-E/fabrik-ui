import axios from "axios";
import type { User } from "./models/User";
import type { Listing } from "./models/Listing";
import type { CreateOrderRequest, Order } from "./models/Order";

// Will be using this once the gateway is set up properly
const API_BASE_URL = "http://localhost:xxxx/api";

// Temporary user API URL for testing purposes, replace if needed
// To be removed once the gateway is set up properly
const TEMP_USER_API_URL = "http://localhost:4007/user";

// Temporary order API URL for testing purposes
// To be removed once the gateway is set up properly
const TEMP_ORDER_API_URL = "http://localhost:4004/order";

const TEMP_LISTINGS_API_URL = "http://localhost:4002/listing";

// Helper function to get axios config, to later include any headers, auth, etc.
const getAxiosConfig = () => {
  const config = {};
  return config;
};

const getWithConfig = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url, getAxiosConfig());
  return response.data;
};

const postWithConfig = async <Request, Response>(
  url: string,
  data: Request,
): Promise<Response> => {
  const response = await axios.post<Response>(url, data, getAxiosConfig());
  return response.data;
};

export const fetchUserData = (id: string) => {
  return getWithConfig<User>(`${TEMP_USER_API_URL}/${id}`);
};

export const fetchListings = () => {
  return getWithConfig<Listing[]>(TEMP_LISTINGS_API_URL);
};

export const addOrder = (orderRequest: CreateOrderRequest) => {
  return postWithConfig<CreateOrderRequest, Order>(
    TEMP_ORDER_API_URL,
    orderRequest,
  );
};