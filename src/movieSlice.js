import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

// 1️⃣ Async thunk to fetch movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return await response.json();
});

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addMovie: (state, action) => {
      const movieName = action.payload;
      const newMovie = {
        id: nanoid(),
        name: movieName,
      };
      state.movies.push(newMovie);
    },

    removeMovie: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        watch the last gpt chat 
      });
  },
});

export const { addMovie, removeMovie } = movieSlice.actions;
export const allMovies = (state) => state.movies.movies;
export const currentStatus = (state) => state.movies.status;
export const currentError = (state) => state.movies.error;

export default movieSlice.reducer;
