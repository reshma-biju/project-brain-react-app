import { useState } from "react";
import { FileText, Plus, Search, X } from "lucide-react";
import NoteDetail from "./NoteDetail";
import NoteEditor from "./NoteEditor";
import NoteListItem from "./NoteListItem";
import styles from "./NotesTab.module.css";

const NotesTab = ({ projectId, notes, onAdd, onUpdate, onDelete }) => {
	const [searchText, setSearchText] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [mode, setMode] = useState("view");
    
	const isLocked = mode !== "view";
	const normalizedSearch = searchText.trim().toLowerCase();
	const sortedNotes = [...notes].sort(
		(first, second) => new Date(second.updatedAt) - new Date(first.updatedAt),
	);
	const visibleNotes = sortedNotes.filter((note) =>
		`${note.title ?? ""}\n${note.body ?? ""}`.toLowerCase().includes(normalizedSearch),
	);
	const selectedNote =
		visibleNotes.find((note) => note.id === selectedId) ?? visibleNotes[0] ?? null;

    const hasNoMatches = notes.length > 0 && visibleNotes.length === 0;
    
	const handleSave = (data) => {
		if (mode === "create") {
			const newId = onAdd(projectId, data);
			setSelectedId(newId);
			setMode("view");
			return;
		}

		onUpdate(projectId, selectedNote.id, data);
		setMode("view");
	};

	const handleDelete = () => {
		if (window.confirm("Delete this note?")) {
			onDelete(projectId, selectedNote.id);
		}
	};

	if (notes.length === 0 && mode !== "create") {
		return (
			<div className={styles.empty}>
				<FileText size={28} aria-hidden="true" />
				<h2>No notes yet</h2>
                <p>Jot down decisions, links and thoughts for this project.</p>
				<button className={styles.addButton} type="button" onClick={() => setMode("create")}>
					<Plus size={17} aria-hidden="true" />
					<span>Add Note</span>
				</button>
			</div>
		);
	}

	return (
		<div className={styles.notesLayout}>
			<aside className={`${styles.sidebar} ${isLocked ? styles.locked : ""}`}>
				<div className={styles.sidebarHeader}>
					<label className={styles.searchBox}>
						<Search size={17} aria-hidden="true" />
						<input
							type="search"
							value={searchText}
							onChange={(event) => setSearchText(event.target.value)}
							placeholder="Search notes..."
							aria-label="Search notes"
							disabled={isLocked}
						/>
						{searchText && (
							<button
								type="button"
								className={styles.clearSearch}
								aria-label="Clear search"
								onClick={() => setSearchText("")}
								disabled={isLocked}
							>
								<X size={15} aria-hidden="true" />
							</button>
						)}
					</label>
					<button
						className={styles.addButton}
						type="button"
						onClick={() => setMode("create")}
						disabled={isLocked}
					>
						<Plus size={17} aria-hidden="true" />
						<span>Add Note</span>
					</button>
				</div>

				{hasNoMatches && (
					<div className={styles.noMatches}>
						<h2>No notes match</h2>
						<button type="button" onClick={() => setSearchText("")} disabled={isLocked}>
							Clear
						</button>
					</div>
				)}

				{visibleNotes.length > 0 && (
					<ul className={styles.noteList}>
						{visibleNotes.map((note) => (
							<NoteListItem
								key={note.id}
								note={note}
								isSelected={selectedNote?.id === note.id}
								disabled={isLocked}
								onSelect={() => {
									setSelectedId(note.id);
									setMode("view");
								}}
							/>
						))}
					</ul>
				)}
			</aside>

			<section className={styles.contentPanel} >
				{mode === "create" ? (
					<NoteEditor onSave={handleSave} onCancel={() => setMode("view")} />
				) : mode === "edit" && selectedNote ? (
					<NoteEditor
						key={selectedNote.id}
						initial={selectedNote}
						onSave={handleSave}
						onCancel={() => setMode("view")}
					/>
				) : selectedNote ? (
					<NoteDetail
						note={selectedNote}
						onEdit={() => setMode("edit")}
						onDelete={handleDelete}
					/>
				) : (
					<div className={styles.selectPrompt}>Select a note to read it</div>
				)}
			</section>
		</div>
	);
};

export default NotesTab;
