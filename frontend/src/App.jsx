import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgetPassword from "./components/auth/ForgetPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import Welcome from "./components/user/Welcome";
import AdminDashboard from "./components/admin/AdminDashboard";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import AddUser from "./components/admin/AddUser";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={appStore}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forget-password" element={<ForgetPassword />} />

            <Route path="welcome" element={<Welcome />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="add-user" element={<AddUser />} />

            <Route path="admin" element={<AdminDashboard />} />

            <Route path="unauthorized" element={<div>Unauthorized</div>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
