import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import AppLayout from './layout/AppLayout';

function App() {

  return (
   <Routes>
{/* Pages outside the dashboard layout */}
<Route path="/" element={<LandingPage />} />
<Route path="/login" element={<Login />} />

  {/* Pages sharing the sidebar layout */}
  <Route element={<AppLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/create-project" element={<CreateProject />} />
  </Route>
</Routes>
  )
}

export default App
