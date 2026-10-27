import { Check, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import TypeIcon from "../shared/TypeIcon";
import { ITEM_STATUSES } from "../../constants/items";
import styles from "./ItemRowDetailed.module.css";

const ItemRowDetailed = ({ item, onStatusChange, onDelete }) => {
  const isDone = item.status === "done";
  const { color } = ITEM_STATUSES[item.status] ?? ITEM_STATUSES.captured;

  return (
    <li className={styles.row}>
      <button
        className={`${styles.statusCircle} ${isDone ? styles.done : ""}`}
        type="button"
        aria-label="Mark as done"
        aria-pressed={isDone}
        onClick={() => onStatusChange(isDone ? "backlog" : "done")}
      >
        {isDone && <Check size={14} strokeWidth={2.4} aria-hidden="true" />}
      </button>
      <TypeIcon type={item.type} boxed />
      <div className={styles.copy}>
        <h3 className={styles.title}>{item.title}</h3>
        {item.details && <p className={styles.details}>{item.details}</p>}
      </div>
      <select
        className={styles.statusSelect}
        value={item.status}
        style={{ "--status-color": color }}
        aria-label={`Status for ${item.title}`}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        {Object.entries(ITEM_STATUSES).map(([status, { label }]) => (
          <option key={status} value={status}>{label}</option>
        ))}
      </select>
      <span className={styles.date}>
        {formatDate(item.createdAt, { year: true })}
      </span>
      <button
        className={styles.deleteButton}
        type="button"
        aria-label={`Delete ${item.title}`}
        onClick={() => {
          if (window.confirm(`Delete "${item.title}"?`)) onDelete();
        }}
      >
        <Trash2 size={17} aria-hidden="true" />
      </button>
    </li>
  );
};

export default ItemRowDetailed;