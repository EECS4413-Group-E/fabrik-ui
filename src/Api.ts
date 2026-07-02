import axios from "axios";
import type { User } from "./models/User";

// Will be using this once the gateway is set up properly
const API_BASE_URL = "http://localhost:xxxx/api";
// Temporary user API URL for testing purposes, replace if needed
// To be removed once the gateway is set up properly
const TEMP_USER_API_URL = "http://localhost:4007/user";

// Helper function to get axios config, to later include any headers, auth, etc.
const getAxiosConfig = () => {
  let config = {};
  return config;
};

const getWithConfig = async <T>(url: string): Promise<T> => {
  const resposnse = await axios.get<T>(url, getAxiosConfig());
  return resposnse.data;
};

export const fetchUserData = (id: string) => {
  return getWithConfig<User>(`${TEMP_USER_API_URL}/${id}`);
};
