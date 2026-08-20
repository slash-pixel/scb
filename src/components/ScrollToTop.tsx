import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Fait remonter la page tout en haut à chaque fois que l'URL change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}