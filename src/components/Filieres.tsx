import { BookOpen, Calculator, Microscope } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "motion/react";

const FILIERES = [
  {
    icon: BookOpen,
    nom: "Série A — Littéraire",
    badge: "Lettres & Humanités",
    parcours: "BEPC → Probatoire A → Baccalauréat A",
    texte:
      "Centrée sur la maîtrise des langues, la philosophie, la littérature et les sciences humaines. Elle développe l'esprit critique, l'aisance rédactionnelle et l'analyse contextuelle.",
    debouchés: ["Droit & Sciences Politiques", "Journalisme & Communication", "Lettres, Arts & Langues", "Relations Internationales"],
  },
  {
    icon: Calculator,
    nom: "Série C — Scientifique",
    badge: "Maths & Sciences Physiques",
    parcours: "BEPC → Probatoire C → Baccalauréat C",
    texte:
      "La voie d'excellence par excellence pour les profils matheux. Elle offre une maîtrise poussée des mathématiques et des sciences physiques pour accéder aux hautes technologies et à l'ingénierie.",
    debouchés: ["Génie Civil & Informatique", "Classes Préparatoires & Grandes Écoles", "Aéronautique & Robotique", "Recherche Fondamentale"],
  },
  {
    icon: Microscope,
    nom: "Série D — Scientifique",
    badge: "SVT & Chimie",
    parcours: "BEPC → Probatoire D → Baccalauréat D",
    texte:
      "Axée sur les Sciences de la Vie et de la Terre ainsi que la chimie. Idéale pour comprendre les mécanismes du vivant, l'environnement et embrasser les carrières médicales ou paramédicales.",
    debouchés: ["Médecine & Pharmacie", "Biotechnologie & Agronomie", "Sciences Vétérinaires", "Biochimie & Environnement"],
  },
];

export default function Filieres() {
  return (
    <section id="filieres" className="bg-slate-100/70 py-24 md:py-32 relative overflow-hidden">
      {/* Ligne décorative subtile en haut de la section */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <ScrollReveal className="max-w-2xl mb-14 md:mb-16">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-navy/75 mb-4">
            Filières &amp; cycles
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            Des parcours adaptés à chaque ambition
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed text-base md:text-lg">
            Du premier cycle commun (6ème – 3ème) jusqu'au second cycle spécialisé, 
            le collège offre un encadrement rigoureux pour mener chaque élève vers la réussite au baccalauréat.
          </p>
        </ScrollReveal>

        {/* Grille sur 3 colonnes avec décalage de la carte centrale */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:pb-10">
          {FILIERES.map((filiere, i) => (
            <ScrollReveal
              key={filiere.nom}
              delay={0.12 * i}
              className={`h-full ${i === 1 ? "lg:translate-y-10" : ""}`}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative h-full flex flex-col bg-gradient-to-b from-white via-white to-slate-50/80 
                           border border-navy/10 p-8 md:p-8 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/15 
                           transition-all duration-500 overflow-hidden z-10 ring-1 ring-inset ring-white/60
                           rounded-2xl md:rounded-tl-[2.5rem] md:rounded-br-[2.5rem] md:rounded-tr-xl md:rounded-bl-xl"
              >
                {/* Effet de halo dégradé en arrière-plan au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                {/* En-tête de la carte (Icône + Badge) */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 rounded-xl md:rounded-tl-2xl md:rounded-br-2xl md:rounded-tr-lg md:rounded-bl-lg bg-navy/5 flex items-center justify-center 
                                  transition-all duration-500 group-hover:bg-navy group-hover:shadow-md group-hover:shadow-navy/30">
                    <filiere.icon 
                      className="h-6 w-6 text-navy transition-all duration-500 group-hover:text-gold group-hover:scale-110" 
                      strokeWidth={1.75} 
                    />
                  </div>
                  <span className="font-mono text-[0.68rem] tracking-wide uppercase rounded-full bg-navy/5 text-navy px-3.5 py-1.5 
                                   transition-colors duration-300 group-hover:bg-navy/10">
                    {filiere.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-ink mb-3 transition-colors duration-300 group-hover:text-navy">
                  {filiere.nom}
                </h3>

                <p className="text-sm text-ink-soft leading-relaxed mb-6 flex-1">
                  {filiere.texte}
                </p>

                {/* Section Débouchés */}
                <div className="mb-6 pt-4 border-t border-navy/10">
                  <p className="font-mono text-xs text-navy/60 uppercase tracking-wider mb-2.5">
                    Perspectives &amp; Débouchés :
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {filiere.debouchés.map((deb) => (
                      <li
                        key={deb}
                        className="text-xs bg-white text-ink-soft border border-navy/5 px-2.5 py-1 rounded-md font-medium shadow-xs"
                      >
                        {deb}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bas de la carte */}
                <p className="font-mono text-xs uppercase tracking-wide text-gold/90 border-t border-navy/10 pt-4 
                              transition-colors duration-300 group-hover:text-gold group-hover:border-gold/30">
                  {filiere.parcours}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}