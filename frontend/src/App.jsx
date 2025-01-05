import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout";

// Clears localStorage and redirects to Register page
function RegisterAndLogout() {
  localStorage.clear(); // Clear localStorage
  return <Register />; // Render Register page
}

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Set up Browser Router */}
      <Routes>
        {" "}
        {/* Define routes */}
        {/* Protected route for Home page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home /> {/* Render Home only if authorized */}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/logout" element={<Logout />} /> {/* Logout page */}
        <Route path="/register" element={<RegisterAndLogout />} />{" "}
        {/* Register page with logout */}
        <Route path="*" element={<NotFound />}></Route>{" "}
        {/* 404 page for unmatched routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
