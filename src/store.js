import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./features/movies/movieSlice";
import authSlice from "./features/auth/authSlice";

export const store = new configureStore({
  reducer: {
    movies: movieSlice,
    auth: authSlice,
  },
});
