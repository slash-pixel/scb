import type { SchoolEvent, DisplayMode } from "../types/event";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface EventInput {
  title: string;
  description?: string;
  eventDate: string; // ISO
  displayMode: DisplayMode;
}

export const fetchEvents = async (mode?: "agenda" | "ticker"): Promise<SchoolEvent[]> => {
  const res = await fetch(`${API}/api/events${mode ? `?mode=${mode}` : ""}`);
  if (!res.ok) throw new Error("Impossible de charger les événements");
  return res.json();
};

export const fetchTicker = async (): Promise<SchoolEvent[]> => {
  const res = await fetch(`${API}/api/events/ticker`);
  if (!res.ok) throw new Error("Impossible de charger le bandeau");
  return res.json();
};

export const createEvent = async (input: EventInput, token: string) => {
  const res = await fetch(`${API}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erreur lors de la création");
  return data.event as SchoolEvent;
};

export const deleteEvent = async (id: string, token: string) => {
  const res = await fetch(`${API}/api/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
};