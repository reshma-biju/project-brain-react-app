import {
  Lightbulb,
  ListChecks,
  ChartNoAxesColumn,
  MessageCircle,
  FileText,
  Brain,
  ChevronDown,
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import styles from "./ProblemAndFeatures.module.css";

function ProblemAndFeatures() {
  return (
    <section className={styles.section}>
      {/* Problem Section */}
      <div className={styles.problem} id="about">
        <p className={styles.label}>THE PROBLEM</p>

        <h2>
          Ever started a side project and forgot
          half the ideas you had?
        </h2>
  <div className={styles.painGrid}>
    <div className={styles.painCard}>
      <MessageCircle size={22} />
      <h3>Notes</h3>
      <p>end up in WhatsApp</p>
    </div>

    <div className={styles.painCard}>
      <FileText size={22} />
      <h3>Tasks</h3>
      <p>end up in Notepad</p>
    </div>

    <div className={styles.painCard}>
      <Brain size={22} />
      <h3>Bugs</h3>
      <p>end up in your memory</p>
    </div>
  </div>

       <ChevronDown className={styles.problemArrow} size={28} />

  <div className={styles.solutionCard}>
    <strong>Project Brain</strong> keeps everything for one
    project in one place.
  </div>
</div>

      {/* Features Section */}
      <div className={styles.features} id="features">
        <p className={styles.label}>HOW PROJECT BRAIN HELPS</p>

        <h2 className={styles.featuresHeading}>
          Everything your projects need,
          all in one place.
        </h2>

        <div className={styles.featureGrid}>
          <FeatureCard
           icon={Lightbulb}
            title="Capture"
            description="Quickly capture ideas, bugs, improvements, or research topics."
          />

          <FeatureCard
            icon={ListChecks}
            title="Organize"
            description="Move items from Backlog to In Progress to Done."
          />

          <FeatureCard
            icon={ChartNoAxesColumn}
            title="Track"
            description="See project progress without opening Excel or scattered notes."
          />
        </div>
      </div>
    </section>
  );
}

export default ProblemAndFeatures;
