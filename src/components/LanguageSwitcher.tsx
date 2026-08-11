import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

// 1. On retire les "any" et on type correctement les options de Google
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: {
          new (
            options: { pageLanguage: string; autoDisplay: boolean },
            elementId: string
          ): unknown;
        };
      };
    };
  }
}

export default function LanguageSwitcher() {
  // 2. On lit le cookie directement lors de l'initialisation du state. 
  // Cela évite le double rendu (corrige l'erreur set-state-in-effect)
  const [currentLang] = useState<"fr" | "en">(() => {
    // Vérifier si nous sommes bien dans le navigateur (pour éviter des erreurs)
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
      if (match && match[2] === "/fr/en") {
        return "en";
      }
    }
    return "fr";
  });

  useEffect(() => {
    // 3. Charger le script Google en arrière-plan uniquement
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "fr", autoDisplay: false },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []); // Plus besoin de dépendances ou de setters ici

  // Fonction pour basculer la langue
  const toggleLanguage = () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    const cookieValue = newLang === "en" ? "/fr/en" : "/fr/fr";
    
    // Écrire le cookie pour forcer la langue de Google Translate
    document.cookie = `googtrans=${cookieValue}; path=/`;
    document.cookie = `googtrans=${cookieValue}; domain=.${window.location.hostname}; path=/`;
    
    // Recharger la page pour appliquer la traduction instantanément
    window.location.reload();
  };

  return (
    <div className="inline-flex items-center">
      {/* Le vrai conteneur Google caché par le CSS */}
      <div id="google_translate_element"></div>

      {/* Bouton sur mesure */}
      <button
        onClick={toggleLanguage}
        className="group relative flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-navy/10 rounded-full shadow-sm hover:shadow-md hover:border-navy/30 transition-all duration-300"
        aria-label="Changer de langue"
      >
        <Globe className="w-4 h-4 text-navy/70 group-hover:text-navy transition-colors duration-300" />
        
        <div className="flex items-center text-xs font-bold tracking-wide">
          <span className={`transition-all duration-300 ${currentLang === "fr" ? "text-navy" : "text-navy/40 font-medium"}`}>
            FR
          </span>
          <span className="mx-1.5 text-navy/20 font-normal">|</span>
          <span className={`transition-all duration-300 ${currentLang === "en" ? "text-navy" : "text-navy/40 font-medium"}`}>
            EN
          </span>
        </div>
      </button>
    </div>
  );
}