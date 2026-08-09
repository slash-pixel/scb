import { useCountUp } from "../hooks/useCountUp";
import ScrollReveal from "./ScrollReveal";

// ⚠️ Chiffres à confirmer : remplace ces valeurs par les données réelles
// de l'établissement avant mise en ligne.
const CHIFFRES = [
  { valeur: 30, suffixe: "+", label: "Années d'expérience" },
  { valeur: 1200, suffixe: "+", label: "Élèves accompagnés" },
  { valeur: 95, suffixe: "%", label: "Taux de réussite aux examens" },
  { valeur: 60, suffixe: "+", label: "Enseignants et encadreurs" },
];

function Chiffre({ valeur, suffixe, label }: (typeof CHIFFRES)[number]) {
  const { ref, value } = useCountUp(valeur);
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-mono text-4xl md:text-5xl font-semibold text-gold tabular-nums"
      >
        {value}
        {suffixe}
      </span>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-navy-deep py-16 md:py-20">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {CHIFFRES.map((c) => (
            <Chiffre key={c.label} {...c} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
