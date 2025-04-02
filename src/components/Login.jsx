import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const current_user = useSelector(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div>
      {current_user.email && <h1>Welcome, {current_user.email}</h1>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
