import styles from "./StatsCard.module.css";

const StatsCard = ({ label, value, icon: Icon, tone }) => {
    return (
        <article className={`${styles.card} ${styles[tone]}`}>
            <div className={styles.content}>
                <div className={styles.topRow}>
                    <span className={styles.iconBadge}>
                        <Icon size={19} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <p className={styles.value}>{value}</p>
                </div>
                <p className={styles.label}>{label}</p>
            </div>
        </article>
    );
};

export default StatsCard;