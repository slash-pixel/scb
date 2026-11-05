import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, Clock } from "lucide-react";

const API_BASE_URL = "https://scbapi.onrender.com";

interface AgendaEvent {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
}

const getCountdown = (iso: string, now: Date) => {
  const date = new Date(iso);
  if (date.toDateString() === now.toDateString()) return "Aujourd'hui";
  const days = Math.ceil((date.getTime() - now.getTime()) / 86_400_000);
  return `J-${days}`;
};

export default function Agenda() {
  const reduceMotion = useReducedMotion();
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events?mode=agenda`);
        if (!res.ok) return;
        const data: AgendaEvent[] = await res.json();

        // On garde les événements du jour et à venir
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const visible = data.filter((ev) => new Date(ev.eventDate) >= startOfToday);

        if (isMounted) setEvents(visible);
      } catch {
        // On garde les données déjà affichées en cas d'erreur réseau
      }
    };

    load();
    const id = setInterval(load, 5 * 60_000);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Aucun événement : la section n'apparaît pas
  if (events.length === 0) return null;

  return (
    <section id="agenda" className="bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-10 w-1.5 rounded-full bg-gold" />
          <div>
            <h2 className="text-2xl font-extrabold text-navy-deep lg:text-3xl">Agenda de l'établissement</h2>
            <p className="mt-1 text-sm text-navy/60">Les prochains rendez-vous à ne pas manquer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, index) => {
            const date = new Date(ev.eventDate);
            const countdown = getCountdown(ev.eventDate, now);
            const isToday = countdown === "Aujourd'hui";

            return (
              <motion.article
                key={ev.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.08 }}
                className={`flex gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-md ${
                  isToday ? "border-gold" : "border-navy/10"
                }`}
              >
                {/* Bloc date */}
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-deep text-white">
                  <span className="text-xl font-extrabold leading-none text-gold">
                    {date.toLocaleDateString("fr-FR", { day: "2-digit" })}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                    {date.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "")}
                  </span>
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        isToday ? "bg-gold text-navy-deep" : "bg-gold/15 text-navy-deep"
                      }`}
                    >
                      {countdown}
                    </span>
                  </div>

                  <h3 className="text-base font-bold leading-snug text-navy-deep">{ev.title}</h3>

                  <p className="flex items-center gap-1.5 text-xs capitalize text-navy/60">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gold" />
                    {date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-navy/60">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-gold" />
                    {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </p>

                  {ev.description && (
                    <p className="pt-1 text-sm leading-relaxed text-navy/80">{ev.description}</p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}