import React, { useState } from "react";
import LoginContext from "./LoginContext";
function LoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, isadmin, setIsAdmin }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
