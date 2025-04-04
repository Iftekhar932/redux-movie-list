import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resInfo, signup, user } from "../features/auth/authSlice";

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
    <div>
      {current_user.email}
      <h1>Signup Here</h1>
      {<h4>{resMsg.msg}</h4>}
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
