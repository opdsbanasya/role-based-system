import { useState } from "react";
import { addUserAPI } from "../../utills/api";
import { Link } from "react-router-dom";

const AddUser = ({ onUserAdded }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await addUserAPI(form);
      setSuccess("User added successfully!");
      if (onUserAdded) onUserAdded();
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "student",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add user. Please try again."
      );
      console.error("Add user error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded shadow-md w-96 mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl mb-4 font-bold text-center">Add User</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="First Name"
        required
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Last Name"
        required
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Email"
        required
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Password"
        required
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        className="w-full mb-3 p-2 border rounded"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex items-center justify-between">
        <button
          className={`px-4 py-2 text-white rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding User..." : "Add User"}
        </button>
        <Link to={"admin"} className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600">Go to Dashboard</Link>
      </div>
    </form>
  );
};

export default AddUser;
