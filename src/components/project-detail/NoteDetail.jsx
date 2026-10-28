import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import styles from "./NoteDetail.module.css";

const NoteDetail = ({ note, onEdit, onDelete }) => (
	<article className={styles.detail}>
		<header className={styles.header}>
			<h2>{note.title || "Untitled note"}</h2>
			<time dateTime={note.updatedAt}>
	{formatDate(note.updatedAt, { year: true })}
</time>
		</header>
		<div className={styles.body}>{note.body || "No content"}</div>
		<footer className={styles.actions}>
			<button type="button" className={styles.actionButton} onClick={onEdit}>
				<Pencil size={15} aria-hidden="true" />
				<span>Edit</span>
			</button>
			<button type="button" className={`${styles.actionButton} ${styles.deleteButton}`} onClick={onDelete}>
				<Trash2 size={15} aria-hidden="true" />
				<span>Delete</span>
			</button>
		</footer>
	</article>
);

export default NoteDetail;
