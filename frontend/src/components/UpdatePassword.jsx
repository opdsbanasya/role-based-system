import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://your-api.com/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password updated successfully!");
      } else {
        setMessage(data.message || "Error updating password");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleUpdate}>
        <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 mb-3 border"
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-3 border"
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">
          Update
        </button>
        <p className="mt-3 text-center text-green-600">{message}</p>
        <button
          type="button"
          className="text-blue-500 mt-4 block mx-auto"
          onClick={() => navigate("/welcome")}
        >
          Back to Welcome
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
