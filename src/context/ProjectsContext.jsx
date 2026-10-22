import { createContext, useState } from "react";
import { projects as sampleProjects } from "../data/projects";

const ProjectsContext = createContext();

function ProjectsProvider({ children }) {
const [projectList, setProjectList] = useState(sampleProjects);

  // addProject and addItem go here (move your handlers in)
  const addProject = () => {
    const today = new Date().toISOString().slice(0, 10);
    const newProject = {
      id: crypto.randomUUID(),
      name: "New Project",
      description: "",
      category: "Other",
      pinned: false,
      createdAt: today,
      updatedAt: today,
      items: [],
      notes: [],
    };
    setProjectList((prev) => [...prev, newProject]);
  };

  const addItem = ({ title, type, projectId }) => {
    const now = new Date().toISOString();
    const newItem = {
      id: crypto.randomUUID(),
      title,
      type,
      status: "captured",
      details: "",
      createdAt: now,
      updatedAt: now,
    };
    setProjectList((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, items: [...project.items, newItem], updatedAt: now }
          : project
      )
    );
  };

  //logic to pin and unpin proj
  const togglePin = (id) =>
  setProjectList((prev) => prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p)));

  // temporary dev helpers (delete later)
  const clearProjects = () => setProjectList([]);
  const resetProjects = () => setProjectList(sampleProjects);

  return (
    <ProjectsContext.Provider value={{ projectList, addProject, addItem, clearProjects, resetProjects, togglePin }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export { ProjectsProvider };
export default ProjectsContext;