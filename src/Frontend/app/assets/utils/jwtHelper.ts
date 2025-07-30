import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  is_admin?: string;
  exp?: number;
  [key: string]: any;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    return null;
  }
}
