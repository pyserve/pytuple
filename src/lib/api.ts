import axios from "axios";

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
    try {
      const res = await axios.get("/api/auth/session");
      if (res.data?.token) {
        request.headers.Authorization = `Token ${res.data?.token}`;
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }

    if (request.data instanceof FormData) {
      delete request.headers["Content-Type"];
    }

    return request;
  },
  (error) => Promise.reject(error)
);

export default api;
