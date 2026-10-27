import { useState, useEffect } from "react";
import Ticker from "./ticker";
import Navbar from "./Navbar";

export default function AppLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Dès qu'on scrolle de plus de 10px, le Ticker se masque
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
    <header className="sticky top-0 left-0 z-[100] w-full flex flex-col bg-navy-deep shadow-xl border-b border-gold/30 m-0 p-0">
      {/* Ticker (se rétracte et s'efface au scroll) */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <Ticker />
      </div>

      {/* Navbar (reste collée au sommet lors du défilement) */}
      <div className="w-full shrink-0 bg-navy-deep m-0 p-0">
        <Navbar />
      </div>
    </header>
  );
}