import styles from "./GlowBackground.module.css";

const GlowBackground = () => (
  <div className={styles.glow} aria-hidden="true">
    <div
  className={styles.art}
  style={{ backgroundImage: 'url("/images/neon-frame.png")' }}
/>
  </div>
);

export default GlowBackground;