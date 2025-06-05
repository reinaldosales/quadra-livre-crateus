import axiosInstance from "../services/axiosInstance";

export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error instanceof Error || "Erro ao fazer login";
  }
}

export async function getUserData() {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error instanceof Error || "Erro ao buscar dados do usuário";
  }
}

export async function logout() {
  try {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (error) {
    throw error instanceof Error || "Erro ao fazer logout";
  }
}
