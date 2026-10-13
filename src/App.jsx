import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";

function App() {

  return (
   <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
