import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ redirectPath = "/sign-in" }) => {
  const { isAuthenticated, signInStatus } = useAuth();

  if (!signInStatus) {
    return <Navigate to={redirectPath} replace/>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
