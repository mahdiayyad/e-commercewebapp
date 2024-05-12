import React from "react";
import { useAuth } from "../hooks/AuthProvider";

export const Dashboard = () => {
  const auth = useAuth();
  return (
    <div>
      Welcome to Dashboard, {auth.user?.firstName + ' ' + auth.user?.lastName}
    </div>
  );
};
