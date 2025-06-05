import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
