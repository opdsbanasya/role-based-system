import { useEffect, useState } from "react";
import {
  getUsersAPI,
  deleteUserAPI,
  updateUserRoleAPI,
} from "../../utills/api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector(store => store.user)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getUsersAPI();
      setUsers(res);
      console.log(res);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setError("");
      await deleteUserAPI(id);
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error("Delete user error:", err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      setError("");
      await updateUserRoleAPI(id, { role });
      fetchUsers();
    } catch (err) {
      setError("Failed to update user role. Please try again.");
      console.error("Update role error:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="flex items-center gap-5">
          {user?.role === "admin" && <h2 className="font-semibold">{user?.firstName} {user?.lastName}</h2>}
          <button
            type="button"
            onClick={() => navigate("/add-user")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Add User
          </button>
          <Link to="/welcome" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Go to Home</Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading users...</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Index</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border p-4 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user._id,
                          user.role === "admin" ? "student" : "admin"
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      {user.role === "admin" ? "Make Student" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
