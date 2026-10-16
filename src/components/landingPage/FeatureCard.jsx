import styles from "./FeatureCard.module.css";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
