import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Create an axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor to add Authorization header with token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return config; // Return config to proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Reject if error occurs
  }
);

export default api;
