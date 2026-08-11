import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Award, GraduationCap, Trophy, Sparkles } from "lucide-react";

// Données des annonces
const ANNONCES = [
  {
    id: "bepc",
    text: "Résultats BEPC 2024 : 98% de réussite",
    badge: "Excellence",
    icon: Award,
    category: "Résultats",
  },
  {
    id: "inscriptions",
    text: "Inscriptions 2025–2026 ouvertes",
    badge: "Places limitées",
    icon: GraduationCap,
    category: "Inscriptions",
  },
  {
    id: "foot",
    text: "Championnat de football inter-collèges",
    badge: "Vie Scolaire",
    icon: Trophy,
    category: "Événement",
  },
];

export default function Ticker() {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  // Duplication quadruple pour garantir un défilement infini sans coupure
  const items = [...ANNONCES, ...ANNONCES, ...ANNONCES, ...ANNONCES];

  return (
    <div
      aria-label="Annonces importantes"
      className="relative z-50 overflow-hidden bg-gradient-to-r from-[#060B18] via-navy-deep to-[#060B18] border-b border-gold/20 py-2.5 transition-colors duration-300 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Masques de fondus subtils sur les bords gauche et droit */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060B18] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060B18] to-transparent z-10 pointer-events-none" />

      {/* Conteneur animé */}
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap"
        animate={
          reduceMotion || isPaused
            ? {}
            : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: 35, // Réglez la durée pour accélérer ou ralentir (ex: 40 = plus lent)
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.id}-${index}`}
              className="inline-flex items-center gap-3 text-xs md:text-sm font-medium text-white/90 group cursor-pointer transition-all duration-300 hover:text-white"
            >
              {/* Tag/Badge Doré */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-[11px] font-semibold text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                <Icon className="h-3 w-3 text-gold group-hover:text-navy transition-colors duration-300" />
                <span>{item.category}</span>
              </span>

              {/* Texte Principal */}
              <span className="tracking-wide font-sans">{item.text}</span>

              {/* Badge secondaire */}
              {item.badge && (
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-gold/90 border border-white/5">
                  {item.badge}
                </span>
              )}

              {/* Séparateur élégant entre chaque annonce */}
              <Sparkles className="h-3 w-3 text-gold/30 ml-6 shrink-0" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}