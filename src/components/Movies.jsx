import { useEffect, useState } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addMovie,
  removeMovie,
  fetchMovies,
  currentError,
  currentStatus,
  allMovies,
} from "../features/movies/movieSlice";
import { user } from "../features/auth/authSlice";
import { product_api } from "../features/auth/productApi";

function Movies() {
  const movies = useSelector(allMovies);
  const status = useSelector(currentStatus);
  const error = useSelector(currentError);
  const currentUser = useSelector(user);
  const dispatch = useDispatch();
  const [movieName, setMovieName] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the token
    product_api
      .get("/hello", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Send the token in the request
        },
      })
      .then((response) => {
        console.log("Response from /hello", response.data);
      })
      .catch((error) => {
        console.error(
          "Error from /hello",
          error.response?.data || error.message
        );
      });
  }, []);

  return (
    <>
      {currentUser.email}
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

export default Movies;
