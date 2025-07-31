import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "./api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signupAPI(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/welcome");
    } else {
      alert(res.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold text-center">Signup</h2>
        <input className="w-full mb-3 p-2 border" placeholder="Name" required
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full mb-3 p-2 border" placeholder="Email" required type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full mb-3 p-2 border" placeholder="Password" required type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 w-full" type="submit">Signup</button>
        <p className="text-center mt-2">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
