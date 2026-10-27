import GoogleTranslate from "./LanguageSwitcher";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const LIENS = [
  { label: "Accueil", href: "/#accueil" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Galerie", href: "/#galerie" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<number | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Survol du sous-menu "Nos espaces"
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  // Redirection Espace Parent
  const handleEspaceParentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);
    setDropdownOpen(false);

    setTimeout(() => {
      setIsAnimating(false);
      setOpen(false);
      navigate("/espace-parent");
    }, 800);
  };

  // Redirection connexion admin
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate("/login-page");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="w-full bg-navy-deep text-white border-b border-gold/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 sm:h-20">
        
        {/* LOGO */}
        <a
          href="/#accueil"
          className="flex items-center gap-2 sm:gap-3 group min-w-0 transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src="/galerie/logo-removebg-preview.png"
            alt="Logo Collège Catholique Saint Charles Borromée"
            className="h-8 w-auto sm:h-11 shrink-0 object-contain rounded-full"
          />

          <span className="font-display text-white leading-tight min-w-0">
            <span className="block text-[0.5rem] sm:text-[0.65rem] tracking-[0.1em] sm:tracking-[0.2em] uppercase font-mono truncate opacity-80">
              Collège Catholique
            </span>
            <span className="block text-xs sm:text-lg font-semibold truncate">
              Saint Charles Borromée
            </span>
          </span>
        </a>

        {/* CONTENEUR NAVIGATION */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {LIENS.map((lien) => (
              <motion.a
                key={lien.href}
                href={lien.href}
                whileTap={{ scale: 0.92 }}
                className="group relative px-4 py-2.5 text-sm font-medium text-white/90 transition-colors duration-300 hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-white/10 opacity-0 scale-95 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
                />
                <span className="relative">{lien.label}</span>
              </motion.a>
            ))}

            {/* SOUS-MENU "NOS ESPACES" (DESKTOP) */}
            <div 
              className="relative ml-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`group relative px-4 py-2.5 text-sm font-medium transition-colors duration-300 cursor-pointer flex items-center gap-1.5 ${
                  dropdownOpen ? "text-gold" : "text-white/90 hover:text-white"
                }`}
              >
                <span className="relative">Nos espaces</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-gold" : "text-white/70"}`} />
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-56 rounded-2xl bg-navy-deep shadow-2xl border border-gold/30 p-2 text-white z-50 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={handleEspaceParentClick}
                      className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 hover:bg-gold hover:text-navy-deep flex items-center justify-between cursor-pointer group/item"
                    >
                      <span>Espace Parent</span>
                      <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-navy-deep font-bold">→</span>
                    </button>
                    
                    <div className="h-[1px] bg-white/10 my-1.5 mx-2" />

                    <a
                      href="https://gesnotes.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 hover:bg-gold hover:text-navy-deep flex items-center justify-between cursor-pointer group/item text-white/90"
                    >
                      <span>Espace Enseignant</span>
                      <ExternalLink className="h-3.5 w-3.5 text-gold group-hover/item:text-navy-deep transition-colors" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOUTON SE CONNECTER */}
            <motion.button
              type="button"
              onClick={handleLoginClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 group relative flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/40 cursor-pointer"
            >
              <span className="tracking-wide">Se connecter</span>
            </motion.button>
          </nav>

          {/* Traduction */}
          <div className="shrink-0">
            <GoogleTranslate />
          </div>

          {/* Bouton Menu Mobile */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-white hover:text-gold transition-colors duration-300 p-1.5 -mr-1 rounded-md"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-navy-deep border-t border-white/10 shadow-xl"
          >
            <div className="flex flex-col px-5 py-5 gap-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {LIENS.map((lien) => (
                <a
                  key={lien.href}
                  href={lien.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-white/90 border-b border-white/5 last:border-none"
                >
                  {lien.label}
                </a>
              ))}

              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-widest text-gold px-1">Nos espaces</p>
                <button
                  type="button"
                  onClick={handleEspaceParentClick}
                  className="w-full flex items-center justify-between rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-left text-sm font-semibold text-gold cursor-pointer"
                >
                  <span>Espace Parent</span>
                </button>

                <a
                  href="https://gesnotes.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white cursor-pointer"
                >
                  <span>Espace Enseignant</span>
                  <ExternalLink className="h-4 w-4 text-gold" />
                </a>
              </div>

              <button
                type="button"
                onClick={handleLoginClick}
                className="mt-4 flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white cursor-pointer"
              >
                <span>Se connecter</span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
}