import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ redirectPath = '/sign-in' }) => {
    const{isAuthenticated} = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;