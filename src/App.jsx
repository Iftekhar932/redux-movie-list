import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
