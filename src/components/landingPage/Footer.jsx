
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
           <div className={styles.brandHeader}>
    <img src="/images/logo.png" alt="Project Brain logo" />
    <h3>Project Brain</h3>
  </div>
          <p>Your second brain for personal projects.</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Project Brain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
