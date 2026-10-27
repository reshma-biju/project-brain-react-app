import { Check, Circle, Lightbulb, LoaderCircle } from "lucide-react";
import { getProgress } from "../../utils/getProgress";
import ProgressBar from "../shared/ProgressBar";
import styles from "./ProjectSummary.module.css";

// Constant data: defined once, outside the component
const STATS = [
    { label: "Captured",    status: "captured",    color: "#f5c451", icon: Lightbulb },
    { label: "Backlog",     status: "backlog",     color: "#ff7a1a", icon: Circle },
    { label: "In progress", status: "in-progress", color: "#2dd4bf", icon: LoaderCircle },
    { label: "Done",        status: "done",        color: "#4ade80", icon: Check },
];

const ProjectSummary = ({ project }) => {
   
    const progress = getProgress(project);

    return (
        <section className={styles.summary} aria-label="Project progress and item counts">
            <div className={styles.progressSection}>
                <h2 className={styles.title}>Project progress</h2>
                <div className={styles.progressRow}>
                    <ProgressBar value={progress} />
                    <span className={styles.progressValue}>{progress}% complete</span>
                </div>
            </div>
            <div className={styles.stats}>
                {STATS.map(({ label, status, color, icon: Icon }) => {
                    const value = project.items.filter((item) => item.status === status).length;

                    return (
                        <div
                            className={styles.stat}
                            key={status}
                            style={{ "--stat-color": color }}
                        >
                            <div className={styles.statValue}>
                                <span className={styles.statIcon}>
                                    <Icon size={14} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <span>{value}</span>
                            </div>
                            <span className={styles.statLabel}>{label}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectSummary;