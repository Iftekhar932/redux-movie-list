import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1a2a6c] to-cyan-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-[#1a2a6c]">KemonDam</span>
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Your all-in-one platform for{" "}
          <span className="font-semibold text-black">product insights</span>,{" "}
          <span className="font-semibold text-black">price tracking</span>, and{" "}
          <span className="font-semibold text-black">automation</span>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-[#1a2a6c] hover:bg-[#0f1a4d] text-white py-3 px-6 rounded-lg transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
