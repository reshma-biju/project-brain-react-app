import { useState } from "react";
import { Save, X } from "lucide-react";
import { NOTE_BODY_MAX, NOTE_TITLE_MAX } from "../../constants/notes";
import styles from "./NoteEditor.module.css";

const NoteEditor = ({ initial, onSave, onCancel }) => {
	const [title, setTitle] = useState(initial?.title ?? "");
	const [body, setBody] = useState(initial?.body ?? "");
	const [titleError, setTitleError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const trimmedTitle = title.trim();
		if (!trimmedTitle) {
			setTitleError("Title is required.");
			return;
		}

		onSave({ title: trimmedTitle, body });
	};

	return (
		<form className={styles.editor} onSubmit={handleSubmit} noValidate>
			<div className={styles.editorHeader}>
				<h2>{initial ? "Edit note" : "New note"}</h2>
				<div className={styles.actions}>
					<button type="button" className={styles.cancelButton} onClick={onCancel}>
						<X size={16} aria-hidden="true" />
						<span>Cancel</span>
					</button>
					<button type="submit" className={styles.saveButton}>
						<Save size={16} aria-hidden="true" />
						<span>Save</span>
					</button>
				</div>
			</div>
			<label className={styles.fieldLabel}>
				Title
				<input
					className={styles.titleInput}
					type="text"
					value={title}
					onChange={(event) => {
						setTitle(event.target.value);
						setTitleError("");
					}}
					maxLength={NOTE_TITLE_MAX}
					placeholder="Note title"
					aria-invalid={Boolean(titleError)}
					aria-describedby={titleError ? "note-title-error" : undefined}
					autoFocus
				/>
				{titleError && <span id="note-title-error" className={styles.titleError}>{titleError}</span>}
			</label>
			<label className={styles.fieldLabel}>
				Body
				<textarea
					className={styles.bodyInput}
					value={body}
					onChange={(event) => setBody(event.target.value)}
					maxLength={NOTE_BODY_MAX}
					placeholder="Write your note..."
				/>
			</label>
			<div className={styles.characterCount}>{body.length} / {NOTE_BODY_MAX}</div>
		</form>
	);
};

export default NoteEditor;
