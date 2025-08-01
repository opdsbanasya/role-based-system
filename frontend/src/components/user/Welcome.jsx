import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/userSlice";
import axios from "axios";
import { getUsersAPI } from "../../utills/api";

const Welcome = () => {
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-100">
      <div className="text-center bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="mb-4">You are logged in successfully.</p>
        <button
          onClick={() => navigate("/update-password")}
          className="bg-blue-500 text-white px-4 py-2 mr-2"
        >
          Update Password
        </button>
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-purple-500 text-white px-4 py-2 mr-2"
          >
            Admin Dashboard
          </button>
        )}
        <button
          onClick={() => handleLogout()}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
