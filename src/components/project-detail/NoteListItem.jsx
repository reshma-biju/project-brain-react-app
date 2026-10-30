import { formatDate } from "../../utils/formatDate";
import styles from "./NoteListItem.module.css";

const NoteListItem = ({ note, isSelected, disabled, onSelect }) => {
	const date = formatDate(note.updatedAt, { year: true });
	const hasBody = Boolean(note.body?.trim());

	return (
		<li className={styles.listItem}>
			<button
				type="button"
				className={`${styles.noteItem} ${isSelected ? styles.selected : ""}`}
				onClick={onSelect}
				disabled={disabled}
				aria-current={isSelected ? "true" : undefined}
			>
				<span className={styles.noteTitle}>{note.title || "Untitled note"}</span>
				{hasBody && <span className={styles.notePreview}>{note.body}</span>}
				<time className={styles.noteDate} dateTime={note.updatedAt}>
					{date}
				</time>
			</button>
		</li>
	);
};

export default NoteListItem;
