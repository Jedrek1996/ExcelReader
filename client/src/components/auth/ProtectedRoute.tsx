import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
