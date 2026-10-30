import { Search, X } from "lucide-react";
import styles from "./ProjectsToolBar.module.css";

const ProjectsToolBar = ({
	searchText,
	onSearchChange,
	category,
	onCategoryChange,
	categories,
	isFiltering,
	onClearFilters,
	resultCount,
}) => (
	<div className={styles.toolbar}>
		<div className={styles.searchField}>
			<Search className={styles.searchIcon} size={18} aria-hidden="true" />
			<input
				className={styles.searchInput}
				type="text"
				placeholder="Search projects..."
				aria-label="Search projects"
				value={searchText}
				onChange={(event) => onSearchChange(event.target.value)}
			/>
            {searchText && (
    <button
        className={styles.clearSearch}
        type="button"
        aria-label="Clear search"
        title="Clear search"
        onClick={() => onSearchChange("")}
    >
        <X size={16} aria-hidden="true" />
    </button>
)}
		</div>
		<select
			className={styles.categorySelect}
			aria-label="Filter by category"
			value={category}
			onChange={(event) => onCategoryChange(event.target.value)}
		>
			<option value="All">All categories</option>
			{categories.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
		<div className={styles.resultActions}>
			<button
				className={styles.clearButton}
				type="button"
				onClick={onClearFilters}
				style={{ visibility: isFiltering ? "visible" : "hidden" }}
			>
				Clear filters
			</button>
			<span className={styles.resultCount} aria-live="polite">
				{resultCount}
			</span>
		</div>
	</div>
);

export default ProjectsToolBar;
