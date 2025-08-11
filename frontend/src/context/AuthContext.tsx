import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const register = async (email: string, password: string) => {
    await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
    });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
