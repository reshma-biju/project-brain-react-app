import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.label}>YOUR PERSONAL PROJECT WORKSPACE</p>

        <h1>Your Second Brain for Personal Projects</h1>

        <p className={styles.description}>
          Capture ideas, track progress, and never lose
          project thoughts again.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryButton}>
            Get Started
          </button>

          <button className={styles.secondaryButton}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
