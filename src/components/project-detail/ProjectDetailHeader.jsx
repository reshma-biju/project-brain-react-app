import { CalendarDays, MoreVertical } from "lucide-react";
import styles from "./ProjectDetailHeader.module.css";
import PinStar from "../shared/PinStar";
import CategoryIcon from "../shared/CategoryIcon";
import CategoryPill from "../shared/CategoryPill";
import { formatDate } from "../../utils/formatDate";

const ProjectDetailHeader = ({ project, onTogglePin }) => (
    
        <header className={styles.header}>
            <CategoryIcon category={project.category} size={104} iconSize={44} />
            <div className={styles.projectIdentity}>
                <div className={styles.titleRow}>
                    <h2 className={styles.name}>{project.name}</h2>
                    <PinStar pinned={project.pinned} onToggle={onTogglePin} size={24} />
                </div>
                <CategoryPill category={project.category} />
                {project.description && (
                    <p className={styles.description}>{project.description}</p>
                )}
                <div className={styles.updated}>
                    <CalendarDays size={18} aria-hidden="true" />
                    {/*with time*/}
                    <time dateTime={project.updatedAt}>
                        Updated {formatDate(project.updatedAt, { year: true })}
                    </time>
                    {/*without time
                    <span>Updated {formatDate(project.updatedAt, { year: true })}</span>*/}
                </div>
            </div>
            <button
                className={styles.menuButton}
                type="button"
                aria-label="More project actions"
            >
                <MoreVertical size={20} aria-hidden="true" />
            </button>
        </header>

);

export default ProjectDetailHeader;