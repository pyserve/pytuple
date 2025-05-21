import axios from "axios";
import { getServerSession } from "next-auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  function (config) {
    const session = getServerSession();
    config.headers.Authorization = `Token ${session?.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 403) alert("Access denied!");
    return Promise.reject(err);
  }
);

export default api;
