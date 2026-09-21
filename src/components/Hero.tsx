import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative h-dvh min-h-[680px] w-full overflow-hidden flex items-end"
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/sbc.jpg')" }}
      />
      
      {/* 
        Dégradés de lisibilité :
        - Dégradé du haut : Assure la lisibilité de la Navbar fixe.
        - Dégradé du bas : Détache le texte et fait la transition vers la section suivante.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-20 md:pb-24 pt-28">
        
        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-4xl drop-shadow-md"
        >
          Pour une éducation intégrale et humaine,{" "}
          <br className="hidden sm:block" />
          centrée sur la personne face au défi du monde moderne et du numérique.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base md:text-lg text-white/95 leading-relaxed drop-shadow"
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
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            Découvrir l'établissement
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-white/60 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm
                       transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold-soft hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>

      {/* Repère de défilement (Scroll indicator) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <a href="#a-propos" aria-label="Défiler vers la section à propos">
        </a>
      </motion.div>
    </section>
  );
}