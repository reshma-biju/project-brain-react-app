import {getGreetings} from "../utils/getGreetings";
import EmptyState from "../components/dashboard/EmptyState";
import styles from "./Dashboard.module.css";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsRow from "../components/dashboard/StatsRow";
import FocusProjects from "../components/dashboard/FocusProjects";
import ItemListCard from "../components/dashboard/ItemListCard";
import QuickCapture from "../components/dashboard/QuickCapture";
import { useContext, useState } from "react";
import ProjectsContext from "../context/ProjectsContext";
import NewProjectModal from "../components/projects/NewProjectModal";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
 // const [projectList, setProjectList] = useState(projects);
 const { projectList, addProject, addItem, clearProjects, resetProjects } =
    useContext(ProjectsContext);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateProject = (projectData) => {
    const projectId = addProject(projectData);
    navigate(`/projects/${projectId}`);
  };

  const projLen = projectList.length;
  const hasProjects = projectList.length > 0;//just for readability

  //stats row calcu
  const allItems = projectList.flatMap(p =>
    p.items.map(item => ({ ...item, projectName: p.name }))
  );
const doneCount = allItems.filter(i => i.status === "done").length;
  const inProgressCount = allItems.filter(i => i.status === "in-progress").length;
  const capturedCount = allItems.filter(i => i.status === "captured").length;

  const stats = { projects: projLen, captured: capturedCount, inProgress: inProgressCount, done: doneCount };

  //CONTINUE WORKING AND RECENT CAPTURES
  const inProgressItems = allItems.filter(item => item.status === "in-progress");
  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);



  //Focus or pinned imp project
  const focusProjects = [...projectList]
  .sort((a, b) => (b.pinned - a.pinned) || (new Date(b.updatedAt) - new Date(a.updatedAt)))
  .slice(0, 3);


  /* Moved to ProjectContext
  const handleCreateProject = () => {
    const today = new Date().toISOString().slice(0, 10);
    const newProject = {
      id: crypto.randomUUID(),//built-in browser function that generates a random, unique ID 
      name: "New Project",
      description: "",
      category: "Other",
      pinned: false,
      createdAt: today,
      updatedAt: today,
      items: [],
      notes: [],
    };

    setProjectList((existingProjects) => [...existingProjects, newProject]);
    //here we set/update the state using updater fn which is the used to get latest state value
  };

  const handleCapture = ({ title, type, projectId }) => {
    const today = new Date().toISOString();
    const newItem = {
      id: crypto.randomUUID(),
      title,
      type,
      status: "captured",
      details: "",
      createdAt: today,
      updatedAt: today,
    };

    setProjectList((existingProjects) => existingProjects.map((project) =>
      project.id === projectId
        ? { ...project, items: [...project.items, newItem], updatedAt: today }
        : project
    ));
  };
  */

  return (
    <>
      <div className={styles.outerContainer}>
        {hasProjects ? (
          <>
            <DashboardHeader onCreateProject={() => setIsNewOpen(true)} greetingMsg={getGreetings()}/>
                 <QuickCapture projects={projectList} onCapture={addItem} />
            <StatsRow stats={stats} />
            <FocusProjects projects={focusProjects} />
             <div className={styles.columns}>
          <ItemListCard title="Continue working" items={inProgressItems} emptyText="Nothing in progress yet." />
          <ItemListCard title="Recent captures" items={recentItems} emptyText="Capture your first thought." />
        </div>
           
          </>
        ) : (
          <EmptyState onCreateProject={() => setIsNewOpen(true)}/>
        )}
       
      </div>

      {isNewOpen && (
        <NewProjectModal
          onSave={handleCreateProject}
          onClose={() => setIsNewOpen(false)}
        />
      )}

      {/* dev buttons: outside the condition, so they show in both states */}
      <div className={styles.btnContainer}>

        <button className={styles.btn} onClick={clearProjects}>
          Delete all projects
        </button>
        <button className={styles.btn} onClick={resetProjects}>
          Reset sample data
        </button>
      </div>
    </>
  );
};

export default Dashboard;