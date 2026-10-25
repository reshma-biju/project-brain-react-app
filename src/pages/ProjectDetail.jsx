import { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProjectDetailHeader from "../components/project-detail/ProjectDetailHeader";
import ProjectSummary from "../components/project-detail/ProjectSummary";
import ProjectsContext from "../context/ProjectsContext";
import styles from "./ProjectDetail.module.css";

const ProjectDetail = () => {
     const { id } = useParams();     // URL is /projects/p1  →  id is "p1"
    const { projectList, togglePin } = useContext(ProjectsContext);
 
  const project = projectList.find((p) => p.id === id);//we lookup proj from context on every render

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
    </div>
  );
};

export default ProjectDetail;