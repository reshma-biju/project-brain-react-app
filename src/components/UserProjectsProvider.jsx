import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { ProjectsProvider } from "../context/ProjectsContext.jsx";

function UserProjectsProvider({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <ProjectsProvider key={user?.id}>
      {children}
    </ProjectsProvider>
  );
}

export default UserProjectsProvider;