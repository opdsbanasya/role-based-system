import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import ForgetPassword from "./components/ForgetPassword";
import UpdatePassword from "./components/UpdatePassword";

const App = () => {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to="/welcome" /> : <Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/welcome" element={isAuth ? <Welcome /> : <Navigate to="/login" />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
    </Routes>
  );
};

export default App;
