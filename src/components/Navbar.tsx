import GoogleTranslate from "./LanguageSwitcher";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Crest from "./Crest";

const LIENS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Filières", href: "#filieres" },
  { label: "Galerie", href: "#galerie" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`w-full z-50 bg-navy-deep/95 backdrop-blur-sm border-b border-gold/20 transition-shadow duration-500 ${
        scrolled ? "shadow-lg shadow-black/20" : "shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        
        {/* LOGO - À GAUCHE */}
        <a
          href="#accueil"
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0 transition-opacity duration-300 hover:opacity-80"
        >
          <Crest className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" />
          <span className="font-display text-white leading-tight min-w-0">
            <span className="block text-[0.55rem] sm:text-[0.65rem] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-gold-soft font-mono truncate">
              Collège Catholique
            </span>
            <span className="block text-sm sm:text-lg font-semibold truncate">
              Saint Charles Borromée
            </span>
          </span>
        </a>

        {/* NOUVEAU CONTENEUR - À DROITE (Nav + Traduction + Burger) */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Navigation desktop (Cachée sur mobile) */}
          <nav className="hidden lg:flex items-center gap-1">
            {LIENS.map((lien) => (
              <motion.a
                key={lien.href}
                href={lien.href}
                whileTap={{ scale: 0.92 }}
                className="group relative px-4 py-2.5 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-white/5 opacity-0 scale-95 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 right-1/2 bottom-1 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-all duration-300 ease-out group-hover:left-3 group-hover:right-3 group-hover:opacity-100"
                />
                <span className="relative">{lien.label}</span>
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep shadow-lg shadow-gold/0 transition-all duration-300 hover:bg-gold-soft hover:shadow-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              Nous rejoindre
            </motion.a>
          </nav>

          {/* BOUTON DE TRADUCTION - Bien aligné avec le reste ! */}
          <GoogleTranslate />

          {/* Bouton menu mobile */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-white hover:text-gold-soft transition-colors duration-300 p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-navy-deep/98 backdrop-blur-sm border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {LIENS.map((lien, i) => (
                <motion.a
                  key={lien.href}
                  href={lien.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileHover={{ x: 6, color: "#fcd34d", transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.96, x: 0, transition: { duration: 0.1 } }}
                  transition={{
                    duration: 0.35,
                    delay: 0.05 * i
                  }}
                  className="py-3 text-base font-medium text-white/90 border-b border-white/5 last:border-none origin-left"
                >
                  {lien.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.95 }}
                className="mt-6 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Nous rejoindre
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}