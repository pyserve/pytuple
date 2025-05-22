"use client";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

export const setAuthToken = (token: string | null) => {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
};

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
