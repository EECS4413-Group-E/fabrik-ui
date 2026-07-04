import axios from "axios";
import type { User } from "./models/User";
import type { Order, PlaceOrderRequest } from "./models/Order";

// Temporary user API URL for testing purposes, replace if needed
// To be removed once the gateway is set up properly
const TEMP_USER_API_URL = "http://localhost:4007/user";

// Temporary order API URL for testing purposes
// To be removed once the gateway is set up properly
const TEMP_ORDER_API_URL = "http://localhost:4004/order";

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
