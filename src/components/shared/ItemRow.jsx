import TypeIcon from "./TypeIcon";
import styles from "./ItemRow.module.css";
import { formatDate } from "../../utils/formatDate";

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