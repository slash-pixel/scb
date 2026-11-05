export type EventStatus = "upcoming" | "today" | "past";

export const getStatus = (iso: string, now = new Date()): EventStatus => {
  const date = new Date(iso);
  if (date.toDateString() === now.toDateString()) return "today";
  return date > now ? "upcoming" : "past";
};

export const formatCountdown = (iso: string, now = new Date()): string => {
  const diff = new Date(iso).getTime() - now.getTime();
  if (diff <= 0) return "Aujourd'hui";
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  if (days > 0) return `J-${days}`;
  if (hours > 0) return `Dans ${hours} h ${minutes} min`;
  return `Dans ${minutes} min`;
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });