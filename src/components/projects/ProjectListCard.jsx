import {
    ArrowRight,
    CalendarDays,
    List,
    Star
} from "lucide-react";
import { getProgress } from "../../utils/getProgress";
import { formatDate } from "../../utils/formatDate";
import styles from "./ProjectListCard.module.css";
import ProgressBar from "../shared/ProgressBar";
import PinStar from "../shared/PinStar";
import ActionMenu from "../shared/ActionMenu";
import { Link } from "react-router-dom";
import CategoryPill from "../shared/CategoryPill";
import CategoryIcon from "../shared/CategoryIcon";

const ProjectListCard = ({
    project,
    compact = false,
    onTogglePin,
    onEditProject,
    onDeleteProject,
}) => {
    //const { Icon, color } = categoryStyles[project.category] ?? categoryStyles.default;
    //old code now moved to category icon compo- above line look up by key: categoryStyles["Web App"] → { Icon: FolderOpen, color: e0966c" } if that lookup found nothing (undefined), use the fallback entry and destructuring: pull the two fields out into variables Icon, color
    //const { color } = categoryStyles[project.category] ?? categoryStyles.default;

    const progress = getProgress(project);
    const itemCount = project.items.length;
    const showMenu = !compact && Boolean(onEditProject && onDeleteProject);

    return (
        <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
            {compact ? (
                <div className={styles.compactHeader}>
                    <CategoryIcon category={project.category} size={40} iconSize={20} />
                    <div className={styles.compactText}>
                        <h3 className={styles.name} title={project.name}>{project.name}</h3>
                        {project.description && (
                            <p className={styles.description}>{project.description}</p>
                        )}
                    </div>
                    <PinStar pinned={project.pinned} onToggle={onTogglePin} />
                </div>
            ) : (
                <>
                    <div className={styles.topRow}>
                        <CategoryIcon category={project.category} />
                        <div className={styles.actions}>
                            <PinStar pinned={project.pinned} onToggle={onTogglePin} />
                            {showMenu && (
                                <ActionMenu
                                    label="Project actions"
                                    items={[
                                        {
                                            key: "toggle-pin",
                                            label: project.pinned ? "Unpin project" : "Pin project",
                                            icon: <Star aria-hidden="true" />,
                                            onClick: onTogglePin,
                                        },
                                        {
                                            key: "edit-project",
                                            label: "Edit project",
                                            onClick: () => onEditProject(project),
                                        },
                                        {
                                            key: "delete-project",
                                            label: "Delete project",
                                            danger: true,
                                            onClick: () => onDeleteProject(project),
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    </div>
                    <h3 className={styles.name}>{project.name}</h3>
                    <CategoryPill category={project.category} />
                    {project.description && (
                        <p className={styles.description}>{project.description}</p>
                    )}
                    <div className={styles.updated}>
                        <CalendarDays size={17} aria-hidden="true" />
                        <span>Updated {formatDate(project.updatedAt)}</span>
                    </div>
                </>
            )}

            {compact ? (
                <div className={styles.compactProgress}>
                    <ProgressBar value={progress} />
                    <span className={styles.compactPercent}>{progress}%</span>
                </div>
            ) : (
                <div className={styles.progressSection}>
                    <div className={styles.progressLabel}>
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <ProgressBar value={progress} />
                </div>
            )}

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