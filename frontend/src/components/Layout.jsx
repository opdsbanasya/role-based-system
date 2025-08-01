
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        // alert("Please login");
        navigate("/");
      } else {
        console.log(user);
      }
    };
    checkUser();
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
