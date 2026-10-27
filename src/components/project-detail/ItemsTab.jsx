import { useState } from "react";
import { Plus, Search } from "lucide-react";
import ItemRowDetailed from "./ItemRowDetailed";
import ItemsToolbar from "./ItemsToolbar";
import AddItemModal from "./AddItemModal";
import styles from "./ItemsTab.module.css";

const ItemsTab = ({ projectId, items, onAdd, onStatusChange, onDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const normalizedSearch = searchText.trim().toLowerCase();
  const isFiltering = normalizedSearch !== "" || statusFilter !== "All" || typeFilter !== "All";
  const visibleItems = [...items].sort(
    (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
  ).filter((item) => {
    const matchesSearch =
      (item.title ?? "").toLowerCase().includes(normalizedSearch) ||
      (item.details ?? "").toLowerCase().includes(normalizedSearch);
    const matchesStatus = statusFilter === "All" || statusFilter === item.status;
    const matchesType = typeFilter === "All" || typeFilter === item.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("All");
    setTypeFilter("All");
  };

  if (items.length === 0) {
    return (
      <>
        <div className={styles.empty}>
          <p>No items yet. Capture your first idea.</p>
          <button className={styles.addButton} type="button" onClick={() => setIsAddOpen(true)}>
            <Plus size={17} aria-hidden="true" />
            <span>Add item</span>
          </button>
        </div>
        {isAddOpen && <AddItemModal onAdd={onAdd} onClose={() => setIsAddOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <div className={styles.headerRow}>
        <ItemsToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          isFiltering={isFiltering}
          resultCount={`${visibleItems.length} of ${items.length} items`}
        />
        <button className={styles.addButton} type="button" onClick={() => setIsAddOpen(true)}>
          <Plus size={17} aria-hidden="true" />
          <span>Add item</span>
        </button>
      </div>
      {isAddOpen && <AddItemModal onAdd={onAdd} onClose={() => setIsAddOpen(false)} />}
      {visibleItems.length === 0 ? (
        <div className={styles.noMatches}>
          <Search size={24} aria-hidden="true" />
          <h2>No items match</h2>
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className={styles.list}>
          {visibleItems.map((item) => (
            <ItemRowDetailed
              key={item.id}
              item={item}
              onStatusChange={(status) => onStatusChange(projectId, item.id, status)}
              onDelete={() => onDelete(projectId, item.id)}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ItemsTab;