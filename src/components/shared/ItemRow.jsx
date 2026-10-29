import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TypeIcon from "./TypeIcon";
import styles from "./ItemRow.module.css";
import { formatDate } from "../../utils/formatDate";

const ItemRow = ({ item }) => (
	<li className={styles.row}>
		<TypeIcon type={item.type} boxed />
		<div className={styles.text}>
			<span className={styles.title}>{item.title}</span>
			<span className={styles.project}>{item.projectName}</span>
		</div>
		<span className={styles.date}>{formatDate(item.createdAt)}</span>
		<Link
			to={`/projects/${item.projectId}?item=${item.id}`}
			className={styles.openLink}
			aria-label={`Open ${item.title} in ${item.projectName}`}
		>
			<ArrowRight size={19} aria-hidden="true" />
		</Link>
	</li>
);

export default ItemRow;