import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";
import Tasks from "../components/Tasks";
function Parent() {
  const { isLogin, isadmin } = useContext(LoginContext);
  console.log(isadmin);
  if (!isLogin) {
    console.log("not login ke andar");

    return <Navigate to="/" />;
  }
  if (isLogin && !!isadmin) {
    console.log("login par not admin ke andar");
    return (
      <>
        <Navbar />
        <Tasks />
        <Footer />
      </>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Parent;
