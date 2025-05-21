import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${""}`;
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
