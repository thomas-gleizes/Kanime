export function formatDateTime(date: Date) {
  return date?.toLocaleString() || null;
}

export function formatDate(date: Date) {
  return date?.toLocaleDateString() || null;
}

export function formatTime(date: Date) {
  return date?.toLocaleTimeString() || null;
}
