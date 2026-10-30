import { useState } from "react";
import { Brain } from "lucide-react";
import { itemTypes } from "../../constants/items";
import styles from "./QuickCapture.module.css";

const QuickCapture = ({ projects, onCapture }) => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("idea");
    const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
    const selectedProjectId = projects.some((project) => project.id === projectId)
        ? projectId
        : projects[0]?.id;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim() || !selectedProjectId) return;

        onCapture({ title: title.trim(), type, projectId: selectedProjectId });
        setTitle("");
    };

    return (
        <section className={styles.card} aria-labelledby="quick-capture-heading">
            <h2 className={styles.label} id="quick-capture-heading">Capture a thought</h2>
            <p className={styles.description}>Ideas come anytime. Save it before it's gone.</p>
            <form className={styles.form} onSubmit={handleSubmit} aria-labelledby="quick-capture-heading">
            <input
                className={styles.titleInput}
                type="text"
                placeholder="What's on your mind?"
                aria-label="What's on your mind?"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <select
                className={styles.select}
                aria-label="Capture type"
                value={type}
                onChange={(event) => setType(event.target.value)}
            >
                {itemTypes.map((itemType) => (
                    <option key={itemType} value={itemType}>
                        {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                    </option>
                ))}
            </select>
            <select
                className={styles.select}
                aria-label="Project"
                value={selectedProjectId}
                onChange={(event) => setProjectId(event.target.value)}
            >
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>
            <button className={styles.captureButton} type="submit" disabled={!title.trim()}>
                <Brain size={16} strokeWidth={2.1} aria-hidden="true" />
                <span>Capture</span>
            </button>
            </form>
        </section>
    );
};

export default QuickCapture;