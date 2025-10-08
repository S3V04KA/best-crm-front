import { OpenAPI } from "./core/OpenAPI";

// Configure the base URL for the API
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || "";

// Add JWT token to requests if available
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || "";
};

// Configure credentials to include cookies if needed
OpenAPI.CREDENTIALS = "include";

// Helper function to handle API errors
export const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  throw error;
};
