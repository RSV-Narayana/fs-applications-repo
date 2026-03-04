import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TodoList = lazy(() => import("./pages/TodoList"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Profile = lazy(() => import("./pages/Profile"));
const PublicHome = lazy(() => import("./pages/PublicHome"));

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, role: userRole } = useSelector((state) => state.user);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/dashboard" />;
  return children;
}

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="todos" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
            <Route path="admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute role="user"><Profile /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
