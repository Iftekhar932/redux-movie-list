import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";

export const store = new configureStore({
  reducer: {
    movies: movieSlice,
  },
});
