import { useContext,useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProjectDetailHeader from "../components/project-detail/ProjectDetailHeader";
import ProjectSummary from "../components/project-detail/ProjectSummary";
import ProjectsContext from "../context/ProjectsContext";
import styles from "./ProjectDetail.module.css";
import Tabs from "../components/project-detail/Tabs";
import ItemsTab from "../components/project-detail/ItemsTab";

const ProjectDetail = () => {
     const { id } = useParams();     // URL is /projects/p1  →  id is "p1"
    const { projectList, togglePin, updateItemStatus, deleteItem, addItem } = useContext(ProjectsContext);
 
  const project = projectList.find((p) => p.id === id);//we lookup proj from context on every render
  const [activeTab, setActiveTab] = useState("items");

  if (!project) {
    return (
      <section className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Project not found</h1>
        <p className={styles.notFoundMessage}>It may have been deleted.</p>
        <Link to="/projects" className={styles.backButton}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Back to projects</span>
        </Link>
      </section>
    );
  }

  const tabs = [
    { key: "items", label: "Items", count: project.items.length },
    { key: "notes", label: "Notes", count: project.notes.length },
  ];

  return (
    <div className={styles.detailPage}>
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeft size={18} aria-hidden="true" />
        <span>Projects</span>
      </Link>
      <section className={styles.projectCard} aria-label={`${project.name} overview`}>
        <ProjectDetailHeader
          project={project}
          onTogglePin={() => togglePin(project.id)}
        />
        <ProjectSummary project={project} />
      </section>
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      <div role="tabpanel">
        {activeTab === "items" ? (
          <ItemsTab
            projectId={project.id}
            items={project.items}
            onAdd={(item) => addItem({ ...item, projectId: project.id })}
            onStatusChange={updateItemStatus}
            onDelete={deleteItem}
          />
        ) : <p>Notes tab</p>}
      </div>
    </div>
  );
};

export default ProjectDetail;