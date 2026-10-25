import { categoryStyles } from "../../constants/categories";
import styles from "./CategoryIcon.module.css";

const CategoryIcon = ({ category, size = 48, iconSize = 26 }) => {
    const { Icon, color } = categoryStyles[category] ?? categoryStyles.default;

    return (
        <span
            className={styles.categoryIcon}
            style={{ "--category-color": color, "--category-icon-size": `${size}px` }}
            aria-hidden="true"
        >
            <Icon size={iconSize} strokeWidth={1.8} />
        </span>
    );
};

export default CategoryIcon;