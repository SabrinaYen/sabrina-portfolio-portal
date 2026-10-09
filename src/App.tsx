import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./auth/auth-provider";
import Wrapper from "./components/wrapper";
import SiteContent from "./pages/site-content";
import Setting from "./pages/setting";
function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Wrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/site-content" element={<SiteContent />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
