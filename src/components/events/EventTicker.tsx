import { useEffect, useState } from "react";
import { fetchTicker } from "../../lib/eventsApi";
import { formatCountdown } from "../../lib/eventStatus";
import type { SchoolEvent } from "../../types/event";

export default function EventTicker() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [now, setNow] = useState(new Date());

  // Rechargement des données toutes les 5 minutes
  useEffect(() => {
    const load = () => fetchTicker().then(setEvents).catch(() => {});
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  // Mise à jour du compte à rebours chaque minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (events.length === 0) return null;

  const items = events.map((e) => (
    <span key={e.id} className="mx-8 inline-flex items-center gap-3">
      <span aria-hidden>◆</span>
      <strong>{e.title}</strong>
      <span className="opacity-80">{formatCountdown(e.eventDate, now)}</span>
    </span>
  ));

  return (
    <div
      className="event-ticker w-full overflow-hidden bg-slate-900 py-2 text-sm text-amber-300"
      role="region"
      aria-label="Événements à venir"
    >
      <style>{`
        @keyframes event-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .event-ticker__track {
          display: inline-flex;
          white-space: nowrap;
          animation: event-marquee 30s linear infinite;
        }
        .event-ticker:hover .event-ticker__track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .event-ticker__track { animation: none; }
        }
      `}</style>

      {/* Contenu dupliqué pour une boucle sans coupure */}
      <div className="event-ticker__track">
        <div className="inline-flex">{items}</div>
        <div className="inline-flex" aria-hidden>{items}</div>
      </div>
    </div>
  );
}