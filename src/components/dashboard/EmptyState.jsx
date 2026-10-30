import { Plus } from "lucide-react";
import styles from "./EmptyState.module.css";

const EmptyState = ({ onCreateProject }) => (
	<section className={styles.emptyState}>
		<div className={styles.content}>
			<img
				className={styles.icon}
				 src="/images/logo.png"
				alt="Project Brain logo"
				aria-hidden="true"
			/>
			<h1 className={styles.headline}>
				Every great project starts with <span>a single thought.</span>
			</h1>
			<p className={styles.description}>
				Create your first project and give your ideas a home.
			</p>
			<button className={styles.createButton} onClick={onCreateProject}>
				<Plus size={18} strokeWidth={2.25} aria-hidden="true" />
				<span>Create your first project</span>
			</button>
		</div>
	</section>
);

export default EmptyState;