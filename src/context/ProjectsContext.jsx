import { createContext, useState } from "react";
import { projects as sampleProjects } from "../data/projects";

const ProjectsContext = createContext();

function ProjectsProvider({ children }) {
const [projectList, setProjectList] = useState(sampleProjects);

  // addProject and addItem go here (move your handlers in)
  const addProject = ({ name, description = "", category = "Other" }) => {
    const today = new Date().toISOString().slice(0, 10);
    const newProject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      category: category.trim() || "Other",
      pinned: false,
      createdAt: today,
      updatedAt: today,
      items: [],
      notes: [],
    };
    setProjectList((prev) => [...prev, newProject]);
    return newProject.id;
  };

  const addItem = ({ title, type, projectId, status = "captured", details = "" }) => {
    const now = new Date().toISOString();
    const newItem = {
      id: crypto.randomUUID(),
      title,
      type,
      status,
      details,
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

  const updateItemStatus = (projectId, itemId, status) => {
    const now = new Date().toISOString();
    setProjectList((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              items: project.items.map((item) =>
                item.id === itemId ? { ...item, status, updatedAt: now } : item,
              ),
              updatedAt: now,
            }
          : project,
      ),
    );
  };

  const deleteItem = (projectId, itemId) => {
    const now = new Date().toISOString();
    setProjectList((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              items: project.items.filter((item) => item.id !== itemId),
              updatedAt: now,
            }
          : project,
      ),
    );
  };

  //logic to pin and unpin proj
  const togglePin = (id) =>
  setProjectList((prev) => prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p)));

  // temporary dev helpers (delete later)
  const clearProjects = () => setProjectList([]);
  const resetProjects = () => setProjectList(sampleProjects);

  return (
    <ProjectsContext.Provider value={{ projectList, addProject, addItem, updateItemStatus, deleteItem, clearProjects, resetProjects, togglePin }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export { ProjectsProvider };
export default ProjectsContext;