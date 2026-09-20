import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface MotDuPrincipalProps {
  className?: string;
}

// Données fictives des anciens principaux (à adapter selon vos besoins)
const anciensPrincipaux = [
  {
    nom: "Père Jean-Marc Ondo",
    priseDeFonction: "Septembre 2015",
    finDeMandat: "Août 2020",
    initiales: "JO",
  },
  {
    nom: "M. Emmanuel Mbarga",
    priseDeFonction: "Septembre 2008",
    finDeMandat: "Juillet 2015",
    initiales: "EM",
  },
  {
    nom: "Sr. Marie-Claire Talla",
    priseDeFonction: "Septembre 2000",
    finDeMandat: "Juillet 2008",
    initiales: "MT",
  },
];

export default function MotDuPrincipal({ className = "" }: MotDuPrincipalProps) {
  const [estOuvert, setEstOuvert] = useState(false);

  return (
    <section className={`bg-navy-deep py-20 lg:py-32 relative overflow-hidden ${className}`}>
      {/* Halo lumineux subtil en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full relative z-10">

        {/* ===== BLOC UNIFIÉ ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.35)] border border-white/10 overflow-hidden"
        >
          {/* ===== EN-TÊTE ===== */}
          <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold font-semibold uppercase tracking-[0.2em] text-xs mb-4 shadow-sm shadow-gold/10">
              Parole de la direction
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-deep tracking-tight">
              Le Mot du Principal
            </h1>
            <div className="w-12 h-1 bg-gold rounded-full mx-auto my-6 shadow-sm shadow-gold/50"></div>
          </div>

          {/* ===== GRILLE PHOTO & TEXTE DU MESSAGE ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ===== PHOTO & BADGE ===== */}
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 self-start w-full"
            >
              {/* Conteneur externe : Box-shadow prononcé */}
              <div className="relative rounded-2xl shadow-[0_25px_60px_-10px_rgba(15,23,42,0.65)] hover:shadow-[0_30px_70px_-10px_rgba(212,175,55,0.45)] transition-shadow duration-500 group">
                
                {/* Conteneur interne avec rognage */}
                <div className="overflow-hidden rounded-2xl relative">
                  <img
                    src="/galerie/ph2.JPG"
                    alt="Principal du Collège Catholique Saint Charles Borromée"
                    className="w-full h-[460px] lg:h-[500px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
                  
                  {/* Badge d'identification */}
                  <div className="absolute bottom-5 left-5 right-5 p-5 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 text-white shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                    <p className="font-display font-semibold text-lg text-white">
                      M. Abbé Francis Epah
                    </p>
                    <p className="text-gold-soft text-xs font-medium uppercase tracking-wider mt-1">
                      Principal du collège depuis 2020
                    </p>
                  </div>
                </div>

              </div>
            </motion.figure>

            {/* ===== TEXTE DU MESSAGE ===== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col justify-start"
            >
              <div className="space-y-5 text-slate-600 leading-relaxed text-base md:text-lg">
                <p className="font-semibold text-navy-deep text-lg">
                  Chers parents, chers élèves, chers partenaires éducatifs,
                </p>

                <p className="text-justify">
                  C'est avec une immense fierté et un profond sens des
                  responsabilités que je vous souhaite la bienvenue sur le
                  portail numérique du Collège Catholique Saint Charles Borromée.
                </p>

                <p className="text-justify">
                  Fondé sur des valeurs chrétiennes d'amour, de discipline et
                  de travail, notre collège s'engage à offrir un encadrement
                  rigoureux et bienveillant. Nous croyons fermement que chaque
                  enfant qui franchit nos portes possède un potentiel unique
                  qui ne demande qu'à être éveillé.
                </p>

                <p className="text-justify">
                  Face aux défis du monde contemporain, notre mission est
                  double : garantir l'excellence académique tout en assurant
                  la formation morale et spirituelle de nos apprenants. Notre
                  équipe pédagogique met tout en œuvre pour accompagner vos
                  enfants vers la réussite.
                </p>

                <p className="font-medium text-navy-deep pt-2 border-l-2 border-gold pl-4 italic">
                  Que Dieu bénisse notre année scolaire et qu'Il protège
                  notre belle communauté éducative.
                </p>
              </div>

              {/* ===== SIGNATURE ===== */}
              <div className="mt-8 pt-8 border-t border-slate-200/60 flex items-center gap-4">
                <div className="h-12 w-1 bg-gold rounded-full shadow-sm shadow-gold/40"></div>
                <div>
                  <p className="font-script text-3xl text-navy-deep leading-none">
                    Abbé Francis Epah
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mt-1">
                    Principal de l'établissement
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ===== BOUTON PLIANT & HISTORIQUE DES ANCIENS PRINCIPAUX ===== */}
          <div className="mt-12 pt-8 border-t border-slate-200/80">
            <button
              onClick={() => setEstOuvert(!estOuvert)}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-navy-deep font-medium transition-all duration-300 group shadow-sm"
              aria-expanded={estOuvert}
            >
              <div className="flex items-center gap-3">
                <span className="font-display font-semibold text-base sm:text-lg">
                  Voir ceux qui ont précédé
                </span>
                <span className="text-[11px] bg-gold/10 text-gold px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                  Historique
                </span>
              </div>
              
              <ChevronDown
                className={`w-5 h-5 text-gold transition-transform duration-300 ${
                  estOuvert ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Contenu dépliant avec animation fluide */}
            <AnimatePresence>
              {estOuvert && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {anciensPrincipaux.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-3.5 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-navy-deep text-gold font-bold text-xs flex items-center justify-center shrink-0 shadow-sm border border-gold/30 mt-0.5">
                          {p.initiales}
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-deep text-sm sm:text-base">
                            {p.nom}
                          </h4>
                          <div className="mt-1.5 space-y-0.5 text-xs text-slate-500">
                            <p>
                              Prise de fonction : <span className="font-medium text-slate-700">{p.priseDeFonction}</span>
                            </p>
                            <p>
                              Fin de mandat : <span className="font-medium text-slate-700">{p.finDeMandat}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
}