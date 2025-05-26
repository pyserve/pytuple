"use client";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useApi = () => {
  const { data: session } = useSession();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 6000,
  });

  api.interceptors.request.use(
    async (request) => {
      console.log("🚀 ~ response:", response.data);
      if (session) {
        request.headers.Authorization = `Token ${session.token}`;
      }
      if (request.data instanceof FormData) {
        delete request.headers["Content-Type"];
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
