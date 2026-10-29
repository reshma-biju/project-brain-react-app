import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetail from "./pages/ProjectDetail";

function App() {

  return (
   <Routes>
{/* Pages outside the dashboard layout */}
<Route path="/" element={<LandingPage />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

  {/* Pages sharing the sidebar layout */}
  {/* Protected pages */}
  <Route element={<ProtectedRoute />}>
  <Route element={<AppLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/:id" element={<ProjectDetail />} />
    <Route path="/settings" element={<Settings />} />
    
    </Route>
  </Route>
</Routes>
  )
}

export default App
