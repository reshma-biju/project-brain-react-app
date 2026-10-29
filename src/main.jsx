import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthContext, {AuthProvider} from './context/AuthContext.jsx';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import "react-toastify/dist/ReactToastify.css";

function UserProjectsProvider({ children }) {
  const { user } = useContext(AuthContext);
  return <ProjectsProvider key={user?.id}>{children}</ProjectsProvider>;
}

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
