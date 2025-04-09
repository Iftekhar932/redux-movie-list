import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";

import { useSelector } from "react-redux";

function App() {
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
