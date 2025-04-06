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
