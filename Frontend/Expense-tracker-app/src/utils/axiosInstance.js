import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add JWT token to request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login"; // Or use react-router for SPA redirect
      } else if (error.response.status === 500) {
        console.error("🚨 Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("⏱ Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
