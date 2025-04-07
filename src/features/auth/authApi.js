import axios from "axios";
export const auth_api = axios.create({
  baseURL: "http://localhost:5000/auth",
  withCredentials: true,
});

export const API_ENDPOINTS = {
  REFRESH_TOKEN: "/refreshJWT",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

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
    console.log("✨ 🌟 line 25 authApi.js response:", response);
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    if (
      error.response.status == 401 && // Unauthorized
      !originalReq._retry && // Check if the request has already been retried
      !originalReq.url.includes(API_ENDPOINTS.REFRESH_TOKEN) // Avoid infinite loop by checking if the request is not the refresh token request
    ) {
      originalReq._retry = true; // Mark the request as retried if refresh token request has already been made once

      try {
        const refreshRes = await auth_api.post(
          API_ENDPOINTS.REFRESH_TOKEN,
          {},
          { withCredentials: true }
        );
        console.log("✨ 🌟 refreshRes: line 43 authApi.js ", refreshRes);
        console.log("✨ 🌟 originalReq: line 44 authApi.js ", originalReq);

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
