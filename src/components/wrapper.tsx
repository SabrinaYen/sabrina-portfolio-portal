// src/components/AppShell.tsx
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/projects", label: "Projects" },
  { to: "/content", label: "Content" },
  { to: "/settings", label: "Settings" },
];

export default function AppShell() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-[240px] bg-[#182a4e] text-white flex flex-col justify-between">
        <div>
          <div className="flex gap-3 items-center border-b-1 border-b-[#ffffff14] p-4">
            <span className="p-3 border rounded-2xl border-none bg-[#E8452C]">SY</span>
            <div className="flex flex-col">
              <h2 className="text-base">Sabrina Yen</h2>
              <h5 className="text-xs uppercase text-[#a8b9d4]">Portfolio CMS</h5>
            </div>
          </div>
          <ul className="p-3">
            {links.map((i, index) => {
              const isActiveTab = location.pathname == i.to;
              return (
                <NavLink to={i.to} key={index}>
                  <li  className={`py-2 text-[13.5px] border-none rounded-lg px-2 ${isActiveTab && 'bg-[#1e4179]'}`}>{i.label}</li>
                </NavLink>)
            })}


          </ul>
        </div>
        <div className="p-3">
          <button className="border rounded-lg border-[#a8b9d4] w-[100%] py-2 text-[#a8b9d4] text-[13px]" onClick={logout}>Sign out</button>
        </div>
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