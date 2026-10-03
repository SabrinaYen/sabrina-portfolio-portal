import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { api, API_URL } from "../api";

interface User {
    username: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        try {

            setUser(await api.post(API_URL.Checkpoint, { username: localStorage.getItem("username") }));
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    function logout() {
        localStorage.removeItem("access_token");
    }
    useEffect(() => {
        if (localStorage.getItem("token")) loadUser();
        else setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
