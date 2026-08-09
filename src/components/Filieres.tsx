import { BookOpen, Calculator } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "motion/react"; // Import ajouté pour les animations

const FILIERES = [
  {
    icon: BookOpen,
    nom: "Enseignement Général",
    series: [
      "Série A — Littéraire",
      "Série C — Maths & Sciences physiques",
      "Série D — Sciences de la vie et de la Terre",
    ],
    parcours: "BEPC → Probatoire → Baccalauréat",
    texte:
      "Un tronc commun solide en lettres et en sciences, qui ouvre la voie vers l'enseignement supérieur classique : université, grandes écoles, médecine, ingénierie.",
  },
  {
    icon: Calculator,
    nom: "Enseignement Technique Commercial",
    series: [
      "G1 — Techniques administratives",
      "G2 — Techniques quantitatives de gestion",
      "G3 — Techniques commerciales",
    ],
    parcours: "CAP → Probatoire technique → Baccalauréat technique",
    texte:
      "Une formation professionnalisante qui allie théorie et pratique — gestion, comptabilité, commerce — pour entrer directement dans la vie active ou poursuivre en BTS.",
  },
];

export default function Filieres() {
  return (
    /* Arrière-plan sobre : bg-slate-50 (un gris/bleu très clair) qui contraste doucement avec les cartes blanches */
    <section id="filieres" className="bg-slate-50 py-24 md:py-32 relative overflow-hidden">
      {/* Ligne décorative subtile en haut de la section pour rappeler les couleurs de la nav */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <ScrollReveal className="max-w-2xl mb-14 md:mb-16">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-navy/75 mb-4">
            Filières &amp; cycles
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            Deux parcours, un même niveau d'exigence
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed text-base md:text-lg">
            Du premier cycle (6ème – 3ème), commun à tous les élèves, le
            collège ouvre en second cycle deux voies distinctes, chacune
            menée jusqu'au baccalauréat.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {FILIERES.map((filiere, i) => (
            <ScrollReveal key={filiere.nom} delay={0.12 * i}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative h-full flex flex-col rounded-3xl bg-white border border-navy/5 p-8 md:p-10 
                           shadow-sm hover:shadow-2xl hover:shadow-navy/10 transition-shadow duration-500 overflow-hidden z-10"
              >
                {/* Effet de halo dégradé en arrière-plan de la carte au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                {/* Conteneur de l'icône : s'anime au survol de la carte */}
                <div className="h-14 w-14 rounded-2xl bg-navy/5 flex items-center justify-center mb-8 
                                transition-all duration-500 group-hover:bg-navy group-hover:shadow-md group-hover:shadow-navy/30">
                  <filiere.icon 
                    className="h-6 w-6 text-navy transition-all duration-500 group-hover:text-gold group-hover:scale-110" 
                    strokeWidth={1.75} 
                  />
                </div>

                <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-4 transition-colors duration-300 group-hover:text-navy">
                  {filiere.nom}
                </h3>

                <ul className="flex flex-wrap gap-2 mb-6">
                  {filiere.series.map((serie) => (
                    <li
                      key={serie}
                      className="font-mono text-[0.68rem] tracking-wide uppercase rounded-full bg-navy/5 text-navy px-3.5 py-1.5 
                                 transition-colors duration-300 group-hover:bg-navy/10"
                    >
                      {serie}
                    </li>
                  ))}
                </ul>

                <p className="text-sm md:text-base text-ink-soft leading-relaxed mb-8 flex-1">
                  {filiere.texte}
                </p>

                {/* Le bas de la carte prend une teinte plus dorée au survol */}
                <p className="font-mono text-xs uppercase tracking-wide text-gold/80 border-t border-navy/10 pt-5 
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