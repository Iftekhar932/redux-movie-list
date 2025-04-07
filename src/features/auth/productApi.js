import axios from "axios";
import { API_ENDPOINTS, auth_api } from "./authApi"; // Import the auth_api instance

export const product_api = axios.create({
  baseURL: "http://localhost:5000/products",
  withCredentials: true,
});

product_api.interceptors.request.use((config) => {
  try {
    console.log("✨ 🌟 line 10 authApi.js config:", config);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return Promise.reject(error);
  }
});
product_api.interceptors.response.use(
  (response) => {
    return response; // Pass successful responses as-is
  },
  async (error) => {
    const originalReq = error.config;

    // Start a console group for the error
    console.group("🚨 API Error Details");
    console.error("❌ Error Message:", error.message);
    console.error("❌ Error Response:", error.response);
    console.error("❌ Request Config:", error.config);
    console.groupEnd(); // End the group

    if (
      error.response.status === 401 && // Unauthorized
      !originalReq._retry && // Check if the request has already been retried
      !originalReq.url.includes("/refreshJWT") // Avoid infinite loop by checking if the request is not the refresh token request
    ) {
      originalReq._retry = true; // Mark the request as retried

      try {
        console.group("🔄 Token Refresh Attempt");
        const refreshRes = await auth_api.post(
          API_ENDPOINTS.REFRESH_TOKEN,
          {},
          { withCredentials: true }
        );
        console.log("✅ Token Refresh Response:", refreshRes);
        console.groupEnd();

        const { accessToken } = refreshRes.data;
        localStorage.setItem("accessToken", accessToken);
        originalReq.headers["Authorization"] = `Bearer ${accessToken}`;
        return product_api(originalReq); // Retry the original request
      } catch (refreshError) {
        console.group("❌ Token Refresh Failed");
        console.error("❌ Refresh Error:", refreshError);
        console.groupEnd();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject the error if it's not handled
  }
);
export default product_api;
