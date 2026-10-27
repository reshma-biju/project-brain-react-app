import { useState } from "react";
import { categories } from "../../constants/categories";
import Modal from "../shared/Modal";
import styles from "../project-detail/AddItemModal.module.css";

const NewProjectModal = ({ onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [nameError, setNameError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("Enter a name for this project.");
      return;
    }

    onCreate({ name: trimmedName, description: description.trim(), category });
    onClose();
  };

  return (
    <Modal title="New project" onClose={onClose}>
      <form noValidate className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field} htmlFor="new-project-name">
          <span>Name <span className={styles.required}>*</span></span>
          <input
            id="new-project-name"
            autoFocus
            type="text"
            maxLength={60}
            required
            value={name}
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? "new-project-name-error" : undefined}
            onChange={(event) => {
              setName(event.target.value);
              if (nameError) setNameError("");
            }}
          />
          {nameError && <span className={styles.error} id="new-project-name-error">{nameError}</span>}
        </label>

        <label className={styles.field} htmlFor="new-project-description">
          <span>Description <span className={styles.optional}>Optional</span></span>
          <textarea
            id="new-project-description"
            rows={3}
            maxLength={200}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label className={styles.field} htmlFor="new-project-category">
          <span>Category</span>
          <select id="new-project-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((projectCategory) => (
              <option key={projectCategory} value={projectCategory}>{projectCategory}</option>
            ))}
          </select>
        </label>

        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
          <button className={styles.submitButton} type="submit">Create project</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewProjectModal;