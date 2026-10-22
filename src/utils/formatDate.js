export function formatDate(date) {
	if (!date) return "";

	const parsedDate = date instanceof Date
		? date
		: new Date(/^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00` : date);

	if (Number.isNaN(parsedDate.getTime())) return "";

	return parsedDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}