import { GraduationCap, HeartHandshake, Users } from "lucide-react";
import { motion } from "motion/react"; // Ajout de Framer Motion
import ScrollReveal from "./ScrollReveal";
import Crest from "./Crest";

const VALEURS = [
  {
    icon: GraduationCap,
    titre: "Excellence académique",
    texte:
      "Un enseignement général et technique exigeant, porté par des programmes rigoureux et un suivi individuel des résultats.",
  },
  {
    icon: HeartHandshake,
    titre: "Formation intégrale",
    texte:
      "L'instruction ne suffit pas : nous cultivons le caractère, la foi et le sens du service, dans l'esprit de saint Charles Borromée.",
  },
  {
    icon: Users,
    titre: "Encadrement de proximité",
    texte:
      "Des équipes éducatives présentes au quotidien, à l'écoute des élèves comme des familles, du premier jour au diplôme.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="relative bg-navy-mist py-24 md:py-32 overflow-hidden">
      {/* Sceau en filigrane */}
      <Crest
        filled={false}
        className="absolute -right-16 -top-16 h-80 w-80 opacity-[0.06] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Colonne Texte */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-navy/75 mb-4">
                Notre mission
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
                Une éducation catholique, rigoureuse et humaine
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed text-base md:text-lg">
                Depuis sa fondation à Douala, le Collège Catholique Saint
                Charles Borromée forme des générations d'élèves à devenir
                des adultes compétents, intègres et engagés — fidèles à sa
                double vocation d'enseignement général et technique.
              </p>
            </ScrollReveal>
          </div>

          {/* Colonne Cartes Valeurs */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {VALEURS.map((valeur, i) => (
              <ScrollReveal
                key={valeur.titre}
                delay={0.12 * i}
                className={i === 2 ? "sm:col-span-2" : ""}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative h-full rounded-3xl bg-white border border-navy/10 p-8 
                             shadow-sm hover:shadow-2xl hover:shadow-navy/10 transition-shadow duration-500 overflow-hidden z-10"
                >
                  {/* Halo dégradé bleu marine subtil au survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/5 via-transparent to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                  <div className="flex items-center justify-between mb-6">
                    {/* Conteneur de l'icône interactif */}
                    <div className="h-12 w-12 rounded-2xl bg-navy/5 flex items-center justify-center
                                    transition-all duration-500 group-hover:bg-navy group-hover:shadow-md group-hover:shadow-navy/20 group-hover:-rotate-3">
                      <valeur.icon 
                        className="h-6 w-6 text-navy transition-all duration-500 group-hover:text-gold group-hover:scale-110" 
                        strokeWidth={1.75} 
                      />
                    </div>
                    
                    {/* Numéro animé */}
                    <span className="font-mono text-sm text-navy/20 font-medium 
                                     transition-all duration-500 group-hover:text-gold/70 group-hover:scale-110 group-hover:-translate-x-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-ink mb-3 transition-colors duration-300 group-hover:text-navy">
                    {valeur.titre}
                  </h3>
                  
                  <p className="text-sm text-ink-soft leading-relaxed transition-colors duration-300">
                    {valeur.texte}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}