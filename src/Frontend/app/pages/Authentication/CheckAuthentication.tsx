import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function HomeRedirect() {
  const {isAuthenticated} = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <Navigate to="/authentication" replace />;
}
