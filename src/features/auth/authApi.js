import axios from "axios";
export const auth_api = axios.create({
  baseURL: "http://localhost:5000/auth",
  withCredentials: true,
});

// ! needs testing
auth_api.interceptors.request.use((config) => {
  try {
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

auth_api.interceptors.response.use(
  (response) => {
    console.log("line 24 auth_api.js", response);
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    if (
      error.response.status == 401 && // Unauthorized
      !originalReq._retry && // Check if the request has already been retried
      !originalReq.url.includes("/refreshJWT") // Avoid infinite loop by checking if the request is not the refresh token request
    ) {
      originalReq._retry = true; // Mark the request as retried if refresh token request has already been made once

      try {
        const refreshRes = await auth_api.post(
          "/refreshJWT",
          {},
          { withCredentials: true }
        );
        const { accessToken } = refreshRes.data;
        localStorage.setItem("accessToken", accessToken);
        originalReq.headers["Authorization"] = `Bearer ${accessToken}`;
        return auth_api(originalReq);
      } catch (refreshError) {
        console.log("authApi.js ~ 🟥 refreshError:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
