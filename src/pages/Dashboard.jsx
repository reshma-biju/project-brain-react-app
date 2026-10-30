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
 const { projectList, addProject, addItem} =
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
    p.items.map(item => ({ ...item, projectId: p.id, projectName: p.name }))
  );
const doneCount = allItems.filter(i => i.status === "done").length;
  const inProgressCount = allItems.filter(i => i.status === "in-progress").length;
  const capturedCount = allItems.filter(i => i.status === "captured").length;

  const stats = { projects: projLen, captured: capturedCount, inProgress: inProgressCount, done: doneCount };

  //CONTINUE WORKING AND RECENT CAPTURES
  const inProgressItems = allItems
    .filter(item => item.status === "in-progress")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);
  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);



  //Focus or pinned imp project
  const focusProjects = [...projectList]
  .sort((a, b) => (b.pinned - a.pinned) || (new Date(b.updatedAt) - new Date(a.updatedAt)))
  .slice(0, 3);

  return (
    <>
      <div className={styles.outerContainer}>
        {hasProjects ? (
          <>
            <DashboardHeader onCreateProject={() => setIsNewOpen(true)} greetingMsg={getGreetings()}/>
                 <QuickCapture projects={projectList} onCapture={addItem} />
            <StatsRow stats={stats} />
            <FocusProjects projects={focusProjects} totalCount={projectList.length} />
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
    </>
  );
};

export default Dashboard;