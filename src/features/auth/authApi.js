import axios from "axios";
export const auth_api = axios.create({
  baseURL: "http://localhost:5000/auth",
  withCredentials: true,
});
