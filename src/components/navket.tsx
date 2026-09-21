import { useState, useEffect } from "react";
import Ticker from "./ticker";
import Navbar from "./Navbar";
import Hero from "./Hero";

// Ajustez cette valeur à la hauteur exacte de votre Ticker en pixels (ex: 40px)
const TICKER_HEIGHT = 40; 

export default function AppLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Dès qu'on scrolle de plus de 10px, on masque le Ticker
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* 1. EN-TÊTE FIXE GLOBAL (Ticker + Navbar) */}
      <header
        className="fixed top-0 left-0 z-[100] w-full flex flex-col m-0 p-0 transition-transform duration-300 ease-in-out"
        style={{
          // Fait glisser l'en-tête vers le haut de la hauteur exacte du Ticker
          transform: isScrolled ? `translateY(-${TICKER_HEIGHT}px)` : "translateY(0px)",
        }}
      >
        {/* Conteneur Ticker (force l'absence de marge) */}
        <div className="w-full m-0 p-0 leading-none shrink-0">
          <Ticker />
        </div>

        {/* Navbar collée directement sous le Ticker sans aucun espace */}
        <div className="w-full m-0 p-0 shrink-0">
          <Navbar />
        </div>
      </header>

      {/* 2. CONTENU PRINCIPAL */}
      {/* pt-10 (40px) décale le contenu du Hero juste sous le Ticker,
          laissant la Navbar transparente se superposer sur le haut du Hero. */}
      <main className="w-full pt-10">
        <Hero />
      </main>
    </div>
  );
}