import styles from "./StatsRow.module.css";
import { Check, Folder, Lightbulb, LoaderCircle } from "lucide-react";

import StatsCard from "./StatsCard";

const StatsRow = ({ stats }) => {
    const cards = [
        { label: "Projects", value: stats.projects, icon: Folder, tone: "amber" },
        { label: "Captured items", value: stats.captured, icon: Lightbulb, tone: "teal" },
        { label: "In Progress", value: stats.inProgress, icon: LoaderCircle, tone: "coral" },
        { label: "Completed", value: stats.done, icon: Check, tone: "sage" },
    ];

    return (
        <section className={styles.row} aria-label="Project statistics">
            {cards.map((card) => (
                <StatsCard key={card.label} {...card} />
            ))}
        </section>
    );
};

export default StatsRow;