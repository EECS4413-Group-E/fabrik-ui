import axios from 'axios';
import type { User } from './models/User';
import type { Product } from './models/Product';

// Will be using this once the gateway is set up properly
const API_BASE_URL = 'http://localhost:xxxx/api';
// Temporary user API URL for testing purposes, replace if needed
// To be removed once the gateway is set up properly
const TEMP_USER_API_URL = 'http://localhost:4007/user/8ecf8276-e555-41cc-b2ba-e42353dc72b4';

const TEMP_PRODUCT_API_URL = 'http://localhost:4007/products';


// Helper function to get axios config, to later include any headers, auth, etc.
const getAxiosConfig = () => {
    let config = {};
    return config;
};

const getWithConfig = async <T>(url: string): Promise<T> => {
  const resposnse = await axios.get<T>(url, getAxiosConfig());
  return resposnse.data;
};

export const fetchUserData = () => {
  return getWithConfig<User>(`${TEMP_USER_API_URL}`);
}


export const fetchProducts = () => {
  return getWithConfig<Product[]>(`${TEMP_PRODUCT_API_URL}`);
}