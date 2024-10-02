export function getDayInitials(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "short" };
  return date.toLocaleDateString("es-AR", options).slice(0, 2).toUpperCase();
}

export function formatTime(dateString) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
}
