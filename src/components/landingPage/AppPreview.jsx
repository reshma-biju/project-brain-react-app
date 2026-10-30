import styles from "./AppPreview.module.css";


const AppPreview = () => (
  <div className={styles.wrap}>
     <div
      className={styles.glow}
       style={{ backgroundImage: 'url("/images/test3.png")' }}
      aria-hidden="true"
    />
    <div className={styles.window}>
      <div className={styles.bar}>
        <span className={styles.dotRed} />
        <span className={styles.dotYellow} />
        <span className={styles.dotGreen} />
      </div>
      <img src="/images/dashboard-preview.png" alt="Project Brain dashboard" className={styles.img} />
    </div>
  </div>
);

export default AppPreview;