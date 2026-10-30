export const ITEM_STATUSES = {
  captured: { label: "Captured", color: "#f5c451" },
  backlog: { label: "Backlog", color: "#ff7a1a" },
  "in-progress": { label: "In Progress", color: "#2dd4bf" },
  done: { label: "Done", color: "#4ade80" },
};

export const itemTypes = ["idea", "bug", "research", "refactor", "feature"];
export const itemStatuses = Object.keys(ITEM_STATUSES);