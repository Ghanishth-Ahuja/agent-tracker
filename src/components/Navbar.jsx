import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  let navigate = useNavigate();
  async function handleLogout() {
    const response = await fetch("http://localhost:8080/logout", {
      method: "POST",
    });
    if (response.ok) navigate("/");
  }
  return (
    <header className="bg-gray-100 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8 text-gray-800 text-lg font-medium">
          <NavLink
            to="/DashBoard"
            className={({ isActive }) =>
              `hover:text-indigo-600 transition ${
                isActive ? "text-indigo-600 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 hover:cursor-pointer hover:scale-104 ease-in-out"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
