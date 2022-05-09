import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  let location = useLocation();

  if (!isAuthenticated()) {
    console.log("isAuthenticated: ", isAuthenticated());
    return <Navigate to="/auth" state={{ from: location }} />;
  } else {
    return element;
  }
};
