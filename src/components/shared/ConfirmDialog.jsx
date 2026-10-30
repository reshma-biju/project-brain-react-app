import Modal from "./Modal";
import styles from "./ConfirmDialog.module.css";

const ConfirmDialog = ({ title, message, confirmLabel, onConfirm, onCancel }) => (
  <Modal title={title} onClose={onCancel}>
    <div className={styles.content}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button className={styles.cancelButton} type="button" autoFocus onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.confirmButton} type="button" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;