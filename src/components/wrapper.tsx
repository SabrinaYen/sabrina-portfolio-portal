// src/components/AppShell.tsx
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/projects", label: "Projects" },
  { to: "/content", label: "Content" },
  { to: "/settings", label: "Settings" },
];

export default function AppShell() {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 240, background: "#182a4e", color: "white" }}>
        <h2>Sabrina Yen</h2>
        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout}>Sign out</button>
      </aside>

      <div style={{ flex: 1 }}>
        <header>
          <span>{user?.username}</span>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}