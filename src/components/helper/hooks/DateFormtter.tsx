export default function DateFormatter(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getUTCFullYear();
  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
}
