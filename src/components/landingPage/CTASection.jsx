
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./CTASection.module.css";

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <h2>Ready to organize your next project?</h2>

        <p>
          Turn your ideas into real progress with Project Brain.
        </p>

       <Link to="/login" className={styles.button}>
          Start Tracking
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
