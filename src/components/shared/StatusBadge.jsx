import styles from "./StatusBadge.module.css";
import { ITEM_STATUSES } from "../../constants/items";

const StatusBadge = ({ status }) => {
  const { label, color } = ITEM_STATUSES[status] ?? ITEM_STATUSES.captured;

  return (
    <span className={styles.badge} style={{ "--status-color": color }}>
      {label}
    </span>
  );
};

export default StatusBadge;