import styles from './ProgressBar.module.css';

const ProgressBar = ({ value }) => {
    const percent = Math.min(100, Math.max(0, value));

    return (
        <div
            className={styles.track}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
    );
};

export default ProgressBar;