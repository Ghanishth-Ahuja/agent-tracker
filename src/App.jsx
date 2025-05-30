import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import DashBoard from "./components/DashBoard";
import OnlyAdmin from "./Outlet/OnlyAdmin";
import OnlyUser from "./Outlet/OnlyUser";
import Tasks from "./components/Tasks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<OnlyUser />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>
          <Route element={<OnlyAdmin />}>
            <Route path="DashBoard" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
