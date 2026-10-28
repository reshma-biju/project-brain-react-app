import { useState } from "react";
import { ITEM_STATUSES, itemTypes } from "../../constants/items";
import Modal from "../shared/Modal";
import styles from "./AddItemModal.module.css";

const AddItemModal = ({ initial, onSave, onClose }) => {
  const isEdit = Boolean(initial);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState(initial?.type ?? "idea");
  const [status, setStatus] = useState(initial?.status ?? "captured");
  const [details, setDetails] = useState(initial?.details ?? "");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Enter a title for this item.");
      return;
    }

    onSave({ title: trimmedTitle, type, status, details: details.trim() });
    onClose();
  };

  return (
    <Modal title={isEdit ? "Edit item" : "Add item"} onClose={onClose}>
      <form noValidate className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field} htmlFor="add-item-title">
          <span>Title <span className={styles.required}>*</span></span>
          <input
            id="add-item-title"
            autoFocus
            type="text"
            maxLength={100}
            required
            value={title}
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "add-item-title-error" : undefined}
            onChange={(event) => {
              setTitle(event.target.value);
              if (titleError) setTitleError("");
            }}
          />
          {titleError && <span className={styles.error} id="add-item-title-error">{titleError}</span>}
        </label>

        <div className={styles.selectRow}>
          <label className={styles.field} htmlFor="add-item-type">
            <span>Type</span>
            <select id="add-item-type" value={type} onChange={(event) => setType(event.target.value)}>
              {itemTypes.map((itemType) => (
                <option key={itemType} value={itemType}>
                  {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field} htmlFor="add-item-status">
            <span>Status</span>
            <select id="add-item-status" value={status} onChange={(event) => setStatus(event.target.value)}>
              {Object.entries(ITEM_STATUSES).map(([value, itemStatus]) => (
                <option key={value} value={value}>{itemStatus.label}</option>
              ))}
            </select>
          </label>
        </div>

        <label className={styles.field} htmlFor="add-item-details">
          <span>Details <span className={styles.optional}>Optional</span></span>
          <textarea
            id="add-item-details"
            rows={4}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </label>

        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
          <button className={styles.submitButton} type="submit">
            {isEdit ? "Save changes" : "Add item"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItemModal;