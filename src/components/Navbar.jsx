import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-gradient-to-r from-[#1a2a6c] to-cyan-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          KemonDam
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-x-6`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
            }
          >
            Home
          </NavLink>
          {userLoggedIn == false && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${
                    isActive ? "border-b-2 border-white" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${
                    isActive ? "border-b-2 border-white" : ""
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>

        {/* Logout Button */}
        {userLoggedIn ? (
          <button
            onClick={() => dispatch(logout())}
            className="hidden md:block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
          >
            Logout
          </button>
        ) : null}
      </div>

      {/* Mobile Logout Button */}

      {userLoggedIn && (
        <div className="md:hidden px-4 py-2">
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 w-full"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
