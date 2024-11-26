import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated, logout, getUserInfo } from "../Services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUserInfo());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
