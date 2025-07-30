import { useAuthStore } from "~/stores/authStore";
import { Navigate } from "react-router";
import { decodeToken } from "~/assets/utils/jwtHelper";

export default function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" />;
  }

  const decoded = decodeToken(token);

  if (decoded?.is_admin !== "true") {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
