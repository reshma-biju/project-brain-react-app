import {
    ArrowRight,
    CalendarDays,
    List,
    MoreVertical
} from "lucide-react";
import { categoryStyles } from "../../constants/categories";
import { getProgress } from "../../utils/getProgress";
import { formatDate } from "../../utils/formatDate";
import styles from "./ProjectListCard.module.css";
import ProgressBar from "../shared/ProgressBar";
import PinStar from "../shared/PinStar";
import { Link } from "react-router-dom";

const CategoryPill = ({ category, color }) => (
    <span className={styles.category} style={{ "--category-color": color }}>
        {category}
    </span>
);

const ProjectListCard = ({ project, onTogglePin}) => {
    const { Icon, color } = categoryStyles[project.category] ?? categoryStyles.default;
    // above line look up by key: categoryStyles["Web App"] → { Icon: FolderOpen, color: e0966c" } if that lookup found nothing (undefined), use the fallback entry and destructuring: pull the two fields out into variables Icon, color
    const progress = getProgress(project);
    const itemCount = project.items.length;

    return (
        <article className={styles.card}>
            <div className={styles.topRow}>
                <span
                    className={styles.categoryIcon}
                    style={{ "--category-color": color }}
                    aria-hidden="true"
                >
                    <Icon size={26} strokeWidth={1.8} />
                </span>
                <div className={styles.actions}>
                   <PinStar pinned={project.pinned} onToggle={onTogglePin} />
                    <button className={styles.menuButton} type="button" aria-label="More project actions">
                        <MoreVertical size={19} aria-hidden="true" />
                    </button>
                </div>
            </div>

            <h3 className={styles.name}>{project.name}</h3>
            <CategoryPill category={project.category} color={color} />

            {project.description && (
                <p className={styles.description}>{project.description}</p>
            )}

            <div className={styles.updated}>
                <CalendarDays size={17} aria-hidden="true" />
                <span>
                    Updated {formatDate(project.updatedAt)}
                </span>
            </div>

            <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
             <ProgressBar value={progress} />
            </div>

            <footer className={styles.footer}>
                <div className={styles.itemCount}>
                    <List size={18} aria-hidden="true" />
                    <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
                </div>
                <Link to={`/projects/${project.id}`} className={styles.openLink} aria-label={`Open ${project.name}`}>
  <ArrowRight size={19} aria-hidden="true" />
</Link>
            </footer>
        </article>
    );
};

export default ProjectListCard;