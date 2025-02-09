import applicationConfig from "@/config/application.config";
import axios from "axios";

const api = axios.create({
  baseURL: applicationConfig.VITE_DEV_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(
        `${response.config.method?.toUpperCase()} ${response.config.url}:`,
        response.status
      );
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          try {
            // Clear local storage
            localStorage.removeItem("app:credentials");

            console.log(document.cookie);

            window.location.href = "/";
          } catch (logoutError) {
            console.error("Error during logout:", logoutError);
            window.location.href = "/";
          }
          break;
        }
        case 403: {
          console.warn("Access forbidden");
          break;
        }
        case 404: {
          console.warn("Resource not found:", error.config.url);
          break;
        }
        case 500: {
          console.error("Server error:", error.response.data);
          break;
        }
        default: {
          console.error("API Error:", error.response.data);
          break;
        }
      }

      const event = new CustomEvent("api-error", {
        detail: {
          status: error.response.status,
          message: error.response.data?.message || "An error occurred",
        },
      });
      window.dispatchEvent(event);
    } else if (error.request) {
      console.error("Network error - no response received");
      window.dispatchEvent(new CustomEvent("api-network-error"));
    }

    return Promise.reject(
      error instanceof Error ? error : new Error(error?.message || "API Error")
    );
  }
);

export default api;
