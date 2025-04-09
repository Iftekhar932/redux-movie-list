import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resInfo, signup, user } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const resMsg = useSelector(resInfo);
  const current_user = useSelector(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
    if (resMsg.status == 200) {
      setFormData({ email: "", password: "" });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1a2a6c]  to-cyan-500 p-4">
      <div className=" rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Signup to KemonDam
        </h1>

        {resMsg?.msg && (
          <h4
            className={`text-center mb-4 text-sm font-medium ${
              resMsg.status === 200 ? "text-green-600" : "text-red-500"
            }`}
          >
            {resMsg.msg}
          </h4>
        )}

        {current_user?.email && (
          <h2 className="text-center text-green-700 text-sm mb-4">
            Welcome, {current_user.email}
          </h2>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]"
          />
          <button
            type="submit"
            className="w-full bg-[#1a2a6c] hover:bg-[#0f1a4d] text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Signup
          </button>
          <Link to="/login" className="underline">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
