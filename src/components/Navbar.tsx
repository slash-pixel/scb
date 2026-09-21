import GoogleTranslate from "./LanguageSwitcher";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";

const LIENS = [
  { label: "Accueil", href: "/#accueil" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Filières", href: "/#filieres" },
  { label: "Galerie", href: "/#galerie" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const NAVY_RGB = "15, 23, 42";

export default function Navbar() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [isOverBrightBlue, setIsOverBrightBlue] = useState(false);
  const [open, setOpen] = useState(false);
  
  // État de l'animation au clic (0.8s)
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Animation retardée de 0.8s au clic avant la redirection
  const handleEspaceParentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setOpen(false);
      navigate("/espace-parent");
    }, 800);
  };

  // 1. SCROLL PROGRESSIF DU TRANSPARENT (0) À L'OPAQUE COMPLET (1)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const transitionZone = 280;

      const rawRatio = Math.min(Math.max(currentScroll / transitionZone, 0), 1);
      const smoothRatio = rawRatio * rawRatio * (3 - 2 * rawRatio);

      setNavOpacity(smoothRatio);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. DÉTECTION DES SECTIONS SPÉCIFIQUES
  useEffect(() => {
    const observerOptions = {
      rootMargin: "0px 0px -90% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsOverBrightBlue(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const targetSections = document.querySelectorAll(
      '[data-navbar="transparent"], .bg-bleu-vif, #section-bleu'
    );

    targetSections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isTransparentSection = isOverBrightBlue;

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        navOpacity > 0.05 ? "backdrop-blur-md" : "backdrop-blur-none"
      }`}
      style={{
        backgroundColor: isTransparentSection
          ? "rgba(0, 0, 0, 0.2)"
          : `rgba(${NAVY_RGB}, ${navOpacity})`,

        boxShadow:
          !isTransparentSection && navOpacity > 0
            ? `0 10px 25px -5px rgba(0, 0, 0, ${navOpacity * 0.4})`
            : "none",

        borderBottom:
          !isTransparentSection && navOpacity > 0
            ? `1px solid rgba(212, 175, 55, ${navOpacity * 0.3})`
            : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        {/* LOGO */}
        <a
          href="/#accueil"
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0 transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src="/galerie/logo-removebg-preview.png"
            alt="Logo Collège Catholique Saint Charles Borromée"
            className="h-9 w-auto sm:h-11 shrink-0 object-contain rounded-full drop-shadow"
          />

          <span className="font-display text-white leading-tight min-w-0 drop-shadow">
            <span className="block text-[0.55rem] sm:text-[0.65rem] tracking-[0.12em] sm:tracking-[0.2em] uppercase font-mono truncate opacity-90">
              Collège Catholique
            </span>
            <span className="block text-sm sm:text-lg font-semibold truncate">
              Saint Charles Borromée
            </span>
          </span>
        </a>

        {/* CONTENEUR NAVIGATION */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {LIENS.map((lien) => (
              <motion.a
                key={lien.href}
                href={lien.href}
                whileTap={{ scale: 0.92 }}
                className="group relative px-4 py-2.5 text-sm font-medium text-white/90 transition-colors duration-300 hover:text-white drop-shadow"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-white/10 opacity-0 scale-95 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 right-1/2 bottom-1 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-all duration-300 ease-out group-hover:left-3 group-hover:right-3 group-hover:opacity-100"
                />
                <span className="relative">{lien.label}</span>
              </motion.a>
            ))}

            {/* BOUTON ESPACE PARENT (DESKTOP) */}
            <motion.button
              type="button"
              onClick={handleEspaceParentClick}
              whileHover={{ scale: isAnimating ? 1 : 1.04 }}
              whileTap={{ scale: 0.95 }}
              animate={
                isAnimating
                  ? {
                      scale: [1, 0.93, 1.06, 0.98, 1],
                      boxShadow: [
                        "0 0 0px rgba(212, 175, 55, 0)",
                        "0 0 28px rgba(212, 175, 55, 0.85)",
                        "0 0 12px rgba(212, 175, 55, 0.4)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`ml-3 group relative flex items-center gap-2 rounded-full border border-gold/80 px-4.5 py-2 text-sm font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isAnimating
                  ? "bg-gold text-navy-deep border-gold"
                  : "bg-transparent text-gold hover:bg-gold hover:text-navy-deep hover:shadow-[0_0_18px_rgba(212,175,55,0.35)]"
              }`}
            >
              <UserCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="tracking-wide">Espace Parent</span>
            </motion.button>
          </nav>

          {/* Traduction */}
          <GoogleTranslate />

          {/* Bouton Menu Mobile */}
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

      {/* Menu Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-navy-deep border-t border-white/10"
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
                  whileHover={{ x: 6, color: "#fcd34d" }}
                  transition={{ duration: 0.3, delay: 0.04 * i }}
                  className="py-3 text-base font-medium text-white/90 border-b border-white/5 last:border-none"
                >
                  {lien.label}
                </motion.a>
              ))}

              {/* BOUTON ESPACE PARENT (MOBILE) */}
              <motion.button
                type="button"
                onClick={handleEspaceParentClick}
                whileHover={{ scale: isAnimating ? 1 : 1.02 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  isAnimating
                    ? {
                        scale: [1, 0.94, 1.04, 0.98, 1],
                        boxShadow: [
                          "0 0 0px rgba(212, 175, 55, 0)",
                          "0 0 25px rgba(212, 175, 55, 0.8)",
                          "0 0 10px rgba(212, 175, 55, 0.4)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`mt-6 flex items-center justify-center gap-2 rounded-full border border-gold px-5 py-3 text-center text-sm font-semibold transition-all duration-300 ${
                  isAnimating
                    ? "bg-gold text-navy-deep"
                    : "bg-transparent text-gold hover:bg-gold hover:text-navy-deep"
                }`}
              >
                <UserCircle className="h-5 w-5" />
                <span>Espace Parent</span>
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
}