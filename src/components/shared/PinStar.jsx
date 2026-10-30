// components/shared/PinStar.jsx
import { Star } from "lucide-react";
import styles from "./PinStar.module.css";

const PinStar = ({ pinned, onToggle, size = 18 }) => {
  const icon = (
    <Star
      className={pinned ? styles.pinned : styles.unpinned}
      size={size}
      fill={pinned ? "currentColor" : "none"}
      aria-hidden="true"
    />
  );

  // read-only (dashboard): only show when pinned
  if (!onToggle) {
    return pinned ? <span role="img" aria-label="Pinned project">{icon}</span> : null;
  }

  // interactive (Projects page): a real button
  return (
    <button type="button" className={styles.button} onClick={onToggle}
            aria-pressed={pinned} aria-label={pinned ? "Unpin project" : "Pin project"}>
      {icon}
    </button>
  );
};

export default PinStar;