import TypeIcon from "./TypeIcon";
import styles from "./ItemRow.module.css";

const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
});

const ItemRow = ({ item }) => (
	<li className={styles.row}>
		<div className={styles.item}>
			<TypeIcon type={item.type} />
			<span className={styles.title}>{item.title}</span>
		</div>
		<span className={styles.project}>
			{item.projectName}
			<time dateTime={item.createdAt}> · {formatDate(item.createdAt)}</time>
		</span>
	</li>
);

export default ItemRow;