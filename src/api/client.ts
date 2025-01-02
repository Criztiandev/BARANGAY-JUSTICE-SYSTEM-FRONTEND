import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_DEV_ENVIRONMENT === "test"
      ? import.meta.env.VITE_DEV_TEST_URI
      : import.meta.env.VITE_DEV_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
