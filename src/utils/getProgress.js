export function getProgress(project) {
  const items = project.items ?? [];
  const committed = items.filter(i => i.status !== "captured");
  if (committed.length === 0) return 0;
  const done = committed.filter(i => i.status === "done").length;
  return Math.round((done / committed.length) * 100);
}