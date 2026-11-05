import { useEffect, useState } from "react";
import { fetchEvents } from "../../lib/eventsApi";
import { formatCountdown, formatDate, getStatus } from "../../lib/eventStatus";
import type { SchoolEvent } from "../../types/event";

const BADGES = {
  upcoming: { label: "À venir", className: "bg-blue-100 text-blue-800" },
  today: { label: "Aujourd'hui", className: "bg-amber-100 text-amber-800" },
  past: { label: "Passé", className: "bg-slate-200 text-slate-600" },
} as const;

export default function EventAgenda() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchEvents("agenda")
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <p>Chargement de l'agenda…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (events.length === 0) return <p>Aucun événement programmé.</p>;

  return (
    <ol className="space-y-4">
      {events.map((event) => {
        const status = getStatus(event.eventDate, now);
        const badge = BADGES[status];
        return (
          <li
            key={event.id}
            className={`rounded-xl border p-5 ${status === "past" ? "opacity-60" : ""}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}>
                {badge.label}
              </span>
            </div>
            <p className="mt-1 text-sm capitalize text-slate-600">{formatDate(event.eventDate)}</p>
            {event.description && <p className="mt-3 text-slate-700">{event.description}</p>}
            {status !== "past" && (
              <p className="mt-3 text-sm font-medium">{formatCountdown(event.eventDate, now)}</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}