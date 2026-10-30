import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>Page not found</h1>
      <p className={styles.text}>That address doesn't exist, or the page was moved.</p>
      <Link to="/" className={styles.link}>Go back</Link>
    </main>
  );
}

export default NotFound;