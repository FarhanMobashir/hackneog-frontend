import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useData } from "./DataContext";

export const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useLocalStorage("authToken", null);

  const { dispatch: globalDisptach } = useData();
  const isAuthenticated = () => {
    // console.log("isAuthenticated: ", authToken);
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const login = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.clear("authToken");
    setAuthToken(null);
    globalDisptach({
      type: "clearState",
    });
  };

  const value = {
    login,
    logout,
    isAuthenticated,
    authToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
