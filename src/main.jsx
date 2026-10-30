import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import  {AuthProvider} from './context/AuthContext.jsx';
import UserProjectsProvider from "./components/UserProjectsProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <UserProjectsProvider>
      <App />
    </UserProjectsProvider>
  </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
