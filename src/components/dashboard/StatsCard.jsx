import styles from "./StatsCard.module.css";

const StatsCard = ({ label, value, icon: Icon, tone }) => {
    return (
        <article className={`${styles.stat} ${styles[tone]}`}>
            <div>
                <div className={styles.topRow}>
                    <span className={styles.icon}>
                        <Icon size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <p className={styles.value}>{value}</p>
                </div>
                <p className={styles.label}>{label}</p>
            </div>
        </article>
    );
};

export default StatsCard;