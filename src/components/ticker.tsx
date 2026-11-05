import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BellRing, CalendarDays, Sparkles } from "lucide-react";

const API_BASE_URL = "https://scbapi.onrender.com";

interface TickerEvent {
  id: string;
  title: string;
  eventDate: string;
}

// J-3, Dans 2 h 10 min, Aujourd'hui…
const getCountdown = (iso: string, now: Date) => {
  const date = new Date(iso);
  if (date.toDateString() === now.toDateString()) {
    const diff = date.getTime() - now.getTime();
    if (diff > 0) {
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      return { label: h > 0 ? `Dans ${h} h ${m} min` : `Dans ${m} min`, isToday: true };
    }
    return { label: "Aujourd'hui", isToday: true };
  }
  const days = Math.ceil((date.getTime() - now.getTime()) / 86_400_000);
  return { label: `J-${days}`, isToday: false };
};

const formatShortDate = (iso: string) => {
  const d = new Date(iso);
  const date = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return `${date} · ${time}`;
};

export default function Ticker() {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [events, setEvents] = useState<TickerEvent[]>([]);
  const [now, setNow] = useState(new Date());

  // Chargement des événements du bandeau, rafraîchis toutes les 5 minutes
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events/ticker`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) setEvents(data);
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

  // Mise à jour des comptes à rebours chaque minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Pas d'événement programmé : le bandeau disparaît
  if (events.length === 0) return null;

  // On répète la liste pour qu'une moitié dépasse la largeur de l'écran,
  // puis on double le tout pour une boucle sans coupure (-50%)
  const half = Array.from({ length: Math.max(1, Math.ceil(8 / events.length)) }, () => events).flat();
  const items = [...half, ...half];
  const duration = half.length * 6; // vitesse constante quel que soit le nombre d'événements

  return (
    <div
      aria-label="Événements à venir"
      className="relative z-50 overflow-hidden bg-gradient-to-r from-[#060B18] via-navy-deep to-[#060B18] border-b border-gold/20 py-2.5 transition-colors duration-300 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Masques de fondus subtils sur les bords gauche et droit */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060B18] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060B18] to-transparent z-10 pointer-events-none" />

      {/* Conteneur animé (key : relance l'animation si la liste change) */}
      <motion.div
        key={`${events.length}-${duration}`}
        className="flex w-max items-center gap-12 whitespace-nowrap"
        animate={reduceMotion || isPaused ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((item, index) => {
          const { label, isToday } = getCountdown(item.eventDate, now);
          const Icon = isToday ? BellRing : CalendarDays;
          return (
            <div
              key={`${item.id}-${index}`}
              className="inline-flex items-center gap-3 text-xs md:text-sm font-medium text-white/90 group transition-all duration-300 hover:text-white"
            >
              {/* Tag doré : compte à rebours */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-[11px] font-semibold text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                <Icon className="h-3 w-3 text-gold group-hover:text-navy transition-colors duration-300" />
                <span>{label}</span>
              </span>

              {/* Titre de l'événement */}
              <span className="tracking-wide font-sans">{item.title}</span>

              {/* Badge secondaire : date et heure */}
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-gold/90 border border-white/5">
                {formatShortDate(item.eventDate)}
              </span>

              {/* Séparateur élégant entre chaque annonce */}
              <Sparkles className="h-3 w-3 text-gold/30 ml-6 shrink-0" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}