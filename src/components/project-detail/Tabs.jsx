import styles from "./Tabs.module.css";

const Tabs = ({ tabs, active, onChange }) => (
    <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
            <button
                key={tab.key}
                className={`${styles.tab} ${active === tab.key ? styles.active : ""}`}
                type="button"
                role="tab"
                aria-selected={active === tab.key}
                onClick={() => onChange(tab.key)}
            >
                {tab.label}
                {tab.count != null && ` (${tab.count})`}
            </button>
        ))}
    </div>
);

export default Tabs;