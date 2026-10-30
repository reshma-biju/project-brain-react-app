import ProjectListCard from "../projects/ProjectListCard";
import { Link } from "react-router-dom";
import styles from "./FocusProjects.module.css";

const FocusProjects = ({ projects, totalCount }) => {
    const hasMore = totalCount > projects.length;

    return (
        <section className={styles.section} aria-labelledby="focus-projects-heading">
            <div className={styles.header}>
                <h2 className={styles.heading} id="focus-projects-heading">Focus projects</h2>
                {hasMore && (
                    <Link className={styles.viewAll} to="/projects">
                        View all ({totalCount}) →
                    </Link>
                )}
            </div>
            <div className={styles.grid}>
                {projects.map((project) => (
                    <ProjectListCard key={project.id} project={project} compact />
                ))}
            </div>
        </section>
    );
};

export default FocusProjects;