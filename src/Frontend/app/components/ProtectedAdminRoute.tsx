import { useAuthStore } from "~/stores/authStore";
import { Navigate } from "react-router";
import { decodeToken } from "~/assets/utils/jwtHelper";
import { useEffect, useRef, useState } from "react";

export default function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuthStore();
  const [waited, setWaited] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!token && !loading && !waited) {
      timerRef.current = setTimeout(() => setWaited(true), 3000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [token, loading, waited]);

  if (loading || typeof token === "undefined" || (!token && !waited)) {
    return null; // Ou um spinner, se preferir
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = decodeToken(token);

  if (decoded?.is_admin !== "true") {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}