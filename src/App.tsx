import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
// import AdminDashboard from "./pages/admin-dashboard";
function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/admin" element={<AdminDashboard />} /> */}
    </Routes>
  )
}

export default App
