import styles from "./CategoryPill.module.css";
import { categoryStyles } from "../../constants/categories";

const CategoryPill = ({ category}) => {
   const { color } = categoryStyles[category] ?? categoryStyles.default;
     return (
       <span className={styles.category} style={{ "--category-color": color }}>
         {category}
       </span>
     );
    }

export default CategoryPill;