import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const isDevelopment = import.meta.env.MODE === 'development';
const myBaseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;

console.log("Environment Mode:", import.meta.env.MODE);
console.log("Base URL:", myBaseUrl);

const api = axios.create({
  baseURL: myBaseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default api;
