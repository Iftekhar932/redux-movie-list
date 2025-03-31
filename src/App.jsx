import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addMovie,
  removeMovie,
  fetchMovies,
  currentError,
  currentStatus,
  allMovies,
} from "./movieSlice";

function App() {
  const movies = useSelector(allMovies);
  const status = useSelector(currentStatus);
  const error = useSelector(currentError);
  const dispatch = useDispatch();
  const [movieName, setMovieName] = useState("");

  return (
    <>
      <h1>Movies</h1>

      <button onClick={() => dispatch(fetchMovies())}>Fetch Movies</button>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>
            Title: {movie.title} (ID: {movie.userId})
          </h2>
          <p>Body: {movie.body}</p>
          <button onClick={() => dispatch(removeMovie(movie.id))}>
            Delete
          </button>
        </div>
      ))}

      <input
        type="text"
        onChange={(e) => setMovieName(e.target.value)}
        value={movieName}
      />
      <button
        onClick={() => {
          dispatch(addMovie(movieName));
          setMovieName("");
        }}
      >
        Add Movie
      </button>
    </>
  );
}

export default App;
