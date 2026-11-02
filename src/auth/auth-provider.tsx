import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { api, API_URL } from "../api";
import LoadingScreen from "../components/loading";

interface User {
    username: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        try {
            const req = await api.post(API_URL.Checkpoint);
            setUser(req.data?.username ? { username: req.data.username } : null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    async function login(token: string) {
        localStorage.setItem("access_token", token);
        await loadUser();
    }
    function logout() {
        localStorage.removeItem("access_token");
        setUser(null);
    }
    useEffect(() => {
        if (localStorage.getItem("access_token")) loadUser();
        else setLoading(false);
    }, []); // login() loads the user itself

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
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
    if (loading) return <LoadingScreen label="Checking your login..." />;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
