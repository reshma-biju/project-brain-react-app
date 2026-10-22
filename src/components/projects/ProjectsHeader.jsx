import { Plus } from "lucide-react";
import styles from "./ProjectsHeader.module.css";

const ProjectsHeader = ({ onCreateProject }) => (
	<div className={styles.outerContainer}>
		<div>
			<h1 className={styles.heading}>Projects</h1>
			<p className={styles.subtitle}>All your ideas, organized in one place.</p>
		</div>
		<button className={styles.createButton} onClick={onCreateProject}>
			<Plus size={18} strokeWidth={2.25} aria-hidden="true" />
			<span>New project</span>
		</button>
	</div>
);

export default ProjectsHeader;
