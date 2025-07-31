import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForget = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://your-api.com/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Reset link sent to your email.");
      } else {
        setMessage(data.message || "Error sending email.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleForget}>
        <h2 className="text-2xl font-bold mb-4 text-center">Forget Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-3 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-indigo-600 text-white px-4 py-2 w-full" type="submit">
          Send Reset Link
        </button>
        <p className="mt-3 text-center text-green-600">{message}</p>
        <button
          type="button"
          className="text-blue-500 mt-4 block mx-auto"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
