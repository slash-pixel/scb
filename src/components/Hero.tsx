import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-end"
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/sbc.jpg')" }}
      />
      
      {/* 
        Dégradé de lisibilité ajusté. 
        On assombrit légèrement le 'via' et le 'to' pour garantir 
        un contraste parfait, peu importe l'image derrière.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-24 md:pb-28">
        
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs tracking-[0.25em] uppercase text-gold-soft mb-4 drop-shadow-md"
        >
        </motion.p>

        {/* 
          Taille réduite : lg:text-5xl au lieu de 6xl.
          Ajout de drop-shadow-md pour détacher le texte de l'image.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-3xl drop-shadow-md"
        >
          Pour une éducation intégrale et humaine,
          <br className="hidden sm:block" /> {/* Évite un saut de ligne maladroit sur mobile */}
          centrée sur la personne face au défi du monde moderne et du numérique.
        </motion.h1>

        {/* Opacité augmentée de text-white/80 à text-white/95 pour une meilleure lisibilité */}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
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

      {/* Repère de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border border-white/40 flex justify-center pt-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}