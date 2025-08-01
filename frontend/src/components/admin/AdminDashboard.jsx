import { useEffect, useState } from "react";
import {
  getUsersAPI,
  deleteUserAPI,
  updateUserRoleAPI,
} from "../../utills/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await getUsersAPI();
    setUsers(res);
    console.log(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUserAPI(id);
    fetchUsers();
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRoleAPI(id, { role });
    fetchUsers();
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          type="button"
          onClick={()=> navigate("/")}
          className="mr-10 px-4 py-2 bg-blue-500 text-white"
        >
          Add
        </button>
      </div>
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
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1"
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
                  className="bg-blue-500 text-white px-2 py-1 ml-2"
                >
                  Change Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
