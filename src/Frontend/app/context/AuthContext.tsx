import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  login as loginService,
  getUserData,
  logout as logoutService,
} from "../services/authService";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!user;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  async function fetchUser() {
    try {
      const data = await getUserData();
      setUser(data);
    } catch (error) {
      logout();
    }
  }

  async function login(email: string, password: string) {
    try {
      const data = await loginService(email, password);
      localStorage.setItem("token", data.token);
      fetchUser();
      navigate("/app");
    } catch (error) {
      alert("Erro ao fazer login");
    }
  }

  function logout() {
    logoutService();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("The user needs to be authenticated");
  }
  return context;
}
