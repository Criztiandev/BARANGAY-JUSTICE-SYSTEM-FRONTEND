import applicationConfig from "@/config/application.config";
import axios from "axios";

const api = axios.create({
  baseURL: applicationConfig.VITE_DEV_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
