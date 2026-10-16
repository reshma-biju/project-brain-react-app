import ProjectCard from "../shared/ProjectCard";
import { getProgress } from "../../utils/getProgress";
import { Link } from "react-router-dom";
import styles from "./FocusProjects.module.css";

const FocusProjects = ({ projects }) => {
    return (
        <section className={styles.section} aria-labelledby="focus-projects-heading">
            <div className={styles.header}>
                <h2 className={styles.heading} id="focus-projects-heading">Focus projects</h2>
                <Link className={styles.viewAll} to="/projects">View all →</Link>
            </div>
            <div className={styles.grid}>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        progress={getProgress(project)}
                    />
                ))}
            </div>
        </section>
    );

}
export default FocusProjects;