import { Star } from "lucide-react";
import ProgressBar from "./ProgressBar";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project, progress }) => (
    <article className={styles.card}>
        <div className={styles.titleRow}>
            <h3 className={styles.name}>{project.name}</h3>
            {project.pinned && (
                <Star
                    className={styles.star}
                    size={18}
                    fill="currentColor"
                    aria-label="Pinned project"
                    role="img"
                />
            )}
        </div>
        <div className={styles.progressRow}>
            <ProgressBar value={progress} />
            <span className={styles.percentage}>{progress}%</span>
        </div>
    </article>
);

export default ProjectCard;