import { CalendarDays, ChevronDown, ChevronUp, Star } from "lucide-react";
import styles from "./ProjectDetailHeader.module.css";
import PinStar from "../shared/PinStar";
import CategoryIcon from "../shared/CategoryIcon";
import CategoryPill from "../shared/CategoryPill";
import ActionMenu from "../shared/ActionMenu";
import { formatDate } from "../../utils/formatDate";

const ProjectDetailHeader = ({ project, isOpen, onToggle, onTogglePin, onEditProject, onDeleteProject }) => (
        <header className={styles.header}>
            <CategoryIcon category={project.category} size= {88} iconSize={ 40 } />
            <div className={styles.projectIdentity}>
                <div className={styles.titleRow}>
                    <h2 className={styles.name}>{project.name}</h2>
                    <PinStar pinned={project.pinned} onToggle={onTogglePin} size={24} />
                </div>
                <CategoryPill category={project.category} />
                {project.description && (
                    <p className={styles.description}>{project.description}</p>
                )}
                {isOpen && <div className={styles.updated}>
                    <CalendarDays size={18} aria-hidden="true" />
                    {/*with time*/}
                    <time dateTime={project.updatedAt}>
                        Updated {formatDate(project.updatedAt, { year: true })}
                    </time>
                    {/*without time
                    <span>Updated {formatDate(project.updatedAt, { year: true })}</span>*/}
                </div>}
            </div>
            <div className={styles.headerActions}>
                <button
                    className={styles.menuButton}
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Collapse project overview" : "Expand project overview"}
                    onClick={onToggle}
                >
                    {isOpen ? <ChevronUp size={20} aria-hidden="true" /> : <ChevronDown size={20} aria-hidden="true" />}
                </button>
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
                            onClick: onEditProject,
                        },
                        {
                            key: "delete-project",
                            label: "Delete project",
                            danger: true,
                            onClick: onDeleteProject,
                        },
                    ]}
                />
            </div>
        </header>
);

export default ProjectDetailHeader;