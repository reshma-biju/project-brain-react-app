import ItemRow from "../shared/ItemRow";
import styles from "./ItemListCard.module.css";

const ItemListCard = ({ title, items, emptyText }) => (
	<section className={styles.card} aria-label={title}>
		<h2 className={styles.heading}>{title}</h2>
		{items.length > 0 ? (
			<ul className={styles.list}>
				{items.map(item => <ItemRow key={item.id} item={item} />)}
			</ul>
		) : (
			<p className={styles.empty}>{emptyText}</p>
		)}
	</section>
);

export default ItemListCard;
