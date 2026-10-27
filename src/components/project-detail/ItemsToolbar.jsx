import { Search, X } from "lucide-react";
import { ITEM_STATUSES } from "../../constants/items";
import styles from "../projects/ProjectsToolBar.module.css";
import toolbarStyles from "./ItemsToolbar.module.css";
import { itemTypes } from "../../constants/items";

const ItemsToolbar = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  isFiltering,
  resultCount,
}) => (
  <div className={toolbarStyles.toolbar}>
    <div className={styles.searchField}>
      <Search className={styles.searchIcon} size={18} aria-hidden="true" />
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search ideas and tasks..."
        aria-label="Search ideas and tasks"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      {searchText && (
        <button
          className={styles.clearSearch}
          type="button"
          title="Clear search"
          onClick={() => onSearchChange("")}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
    <select
      className={styles.categorySelect}
      aria-label="Filter by status"
      value={statusFilter}
      onChange={(event) => onStatusChange(event.target.value)}
    >
      <option value="All">All statuses</option>
      {Object.entries(ITEM_STATUSES).map(([status, { label }]) => (
        <option key={status} value={status}>
          {label}
        </option>
      ))}
    </select>
    <select
      className={styles.categorySelect}
      aria-label="Filter by type"
      value={typeFilter}
      onChange={(event) => onTypeChange(event.target.value)}
    >
      <option value="All">All types</option>
      {itemTypes.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
    {isFiltering && (
      <span className={styles.resultCount} aria-live="polite">
        {resultCount}
      </span>
    )}
  </div>
);

export default ItemsToolbar;