import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative h-[calc(100vh-7rem)] min-h-[600px] w-full overflow-hidden flex items-end m-0 p-0"
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/sbc.jpg')" }}
      />
      
      {/* Dégradés d'ambiance et de lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent pointer-events-none" />

      {/* Contenu du Hero */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-16 sm:pb-20 pt-12">
        
        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.18] max-w-2xl sm:max-w-3xl drop-shadow-md"
        >
          Pour une éducation intégrale et humaine,{" "}
          <span className="block mt-1 sm:mt-2 text-white/95">
            centrée sur la personne face au défi
          </span>
          <span className="block mt-1 sm:mt-2 text-white/95">
            du monde moderne et du numérique.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-lg md:max-w-xl text-base md:text-lg text-white/90 leading-relaxed drop-shadow-sm font-normal"
        >
          Le Collège Catholique Saint Charles Borromée accompagne ses
          élèves vers l'excellence académique, dans un cadre
          exigeant, humain et fidèle aux valeurs chrétiennes.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#a-propos"
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep
                       transition-all duration-300 hover:bg-gold-soft hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Découvrir l'établissement
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-white/60 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm
                       transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold-soft hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>
    </section>
  );
}