import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-100">
      <div className="text-center bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="mb-4">You are logged in successfully.</p>
        <button onClick={() => navigate("/update-password")} className="bg-blue-500 text-white px-4 py-2 mr-2">Update Password</button>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2">Logout</button>
      </div>
    </div>
  );
};

export default Welcome;
