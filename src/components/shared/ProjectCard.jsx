
import ProgressBar from "./ProgressBar";
import styles from "./ProjectCard.module.css";
import PinStar from "./PinStar";

const ProjectCard = ({ project, progress }) => (
    <article className={styles.card}>
        <div className={styles.titleRow}>
            <h3 className={styles.name}>{project.name}</h3>
            <PinStar pinned={project.pinned} />
        </div>
        <div className={styles.progressRow}>
            <ProgressBar value={progress} />
            <span className={styles.percentage}>{progress}%</span>
        </div>
    </article>
);

export default ProjectCard;