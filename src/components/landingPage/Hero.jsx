import styles from "./Hero.module.css";
import AppPreview from "./AppPreview";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
  return (
    <section className={styles.hero}>
    

      <div className={styles.inner}>
        <div className={styles.heroContent}>
          <p className={styles.label}>YOUR PERSONAL PROJECT WORKSPACE</p>

          <h1>Your Second Brain for Personal Projects</h1>

          <p className={styles.description}>
            Capture ideas, track progress, and never lose
            project thoughts again.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryButton}  onClick={() => navigate("/signup")}>Get Started</button>
          </div>
        </div>

        <AppPreview />
      </div>
    </section>
  );
};

export default Hero;
