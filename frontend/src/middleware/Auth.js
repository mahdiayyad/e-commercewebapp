import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const RequireAuth = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

const AnonymousRoute = () => {
  const user = useAuth();

  if (user.token) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export { RequireAuth, AnonymousRoute };
