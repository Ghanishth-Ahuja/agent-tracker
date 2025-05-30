import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
function LoginForm() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { isLogin, setIsLogin, setIsAdmin } = useContext(LoginContext);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });
      console.log(response.status);
      console.log(response.isadmin);
      let jsonresponse = await response.json();
      console.log(jsonresponse);

      if (response.ok) {
        console.log("Successfully logged in");
        setIsLogin(true);
        navigate("/tasks");
        if (jsonresponse.isadmin) {
          setIsLogin(true);
          setIsAdmin(true);
          navigate("/DashBoard");
        }
      } else {
        setMessage(jsonresponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                required
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
            <p className=" text-center mt-4 text-amber-700">{message}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
