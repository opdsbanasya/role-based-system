import React, { useState } from "react";
import { loginAPI } from "./api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAPI(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/welcome");
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

        <input
          className="w-full mb-3 p-2 border"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="w-full mb-3 p-2 border"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="bg-green-500 text-white px-4 py-2 w-full" type="submit">
          Login
        </button>

        {/* Extra links */}
        <div className="text-sm text-center mt-4 space-y-1">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          </p>
          <p>
            <Link to="/forget-password" className="text-red-500 hover:underline">Forgot Password?</Link>
          </p>
          <p>
            <Link to="/update-password" className="text-purple-600 hover:underline">Update Password</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
