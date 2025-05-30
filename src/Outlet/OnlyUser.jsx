import LoginContext from "../context/LoginContext";
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tasks from "../components/Tasks";
const OnlyUser = () => {
  let { isadmin, isLogin } = useContext(LoginContext);
  if (!isLogin) return <Navigate to="/" />;
  if (isLogin && isadmin) return <Navigate to="/DashBoard" />;
  if (!isadmin && isLogin) {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }
};

export default OnlyUser;
