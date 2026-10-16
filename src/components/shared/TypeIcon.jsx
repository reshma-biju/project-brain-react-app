import { Lightbulb, Bug, BookOpen, Wrench, Puzzle, Pin } from "lucide-react";
import styles from "./TypeIcon.module.css";

const types = {
  idea:     { Icon: Lightbulb, color: "#ffd166" },
  bug:      { Icon: Bug,       color: "#ff6b5a" },
  research: { Icon: BookOpen,  color: "#2dd4bf" },
  refactor: { Icon: Wrench,    color: "#b4a0fa" },
  feature:  { Icon: Puzzle,    color: "#7cff8a" },
};

const TypeIcon = ({ type }) => {
  const { Icon, color } = types[type] ?? { Icon: Pin, color: "#ff8f78" };

  return (
    <span className={styles.icon} style={{ "--glow": color }} role="img" aria-label={type}>
      <Icon size={18} strokeWidth={1.8} />
    </span>
  );
};

export default TypeIcon;