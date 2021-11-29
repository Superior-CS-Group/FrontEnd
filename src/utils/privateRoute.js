import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let auth = localStorage.getItem("token");
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
