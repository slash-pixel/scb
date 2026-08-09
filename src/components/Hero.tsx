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
      {/* Dégradé de lisibilité — piloté par les couleurs du thème (plus de
          valeurs codées en dur : il reste toujours synchronisé si la
          couleur navy change dans theme.css). */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/55 to-navy/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-24 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-gold-soft mb-5"
        >
          Établissement catholique · Douala, Cameroun
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] max-w-2xl"
        >
          Former des esprits libres,
          <br />
          enracinés dans la foi.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
        >
          Le Collège Catholique Saint Charles Borromée accompagne chaque
          élève de Douala vers l'excellence académique, dans un cadre
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
