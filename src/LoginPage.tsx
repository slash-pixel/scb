import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "./components/Navbar";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "bird" | "angel" | "prayer";
}

const TYPES: ("bird" | "angel" | "prayer")[] = ["bird", "angel", "prayer"];

// Génération de 18 éléments répartis harmonieusement
const INITIAL_ITEMS: FloatingElement[] = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: Math.random() * 88 + 6,
  y: Math.random() * 70 + 15,
  size: Math.random() * 12 + 28, // Taille idéale (28px - 40px) pour voir distinctement chaque détail
  duration: Math.random() * 6 + 8, // Animation fluide et lente (8s à 14s)
  delay: Math.random() * 4,
  type: TYPES[Math.floor(Math.random() * TYPES.length)],
}));

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingItems] = useState<FloatingElement[]>(INITIAL_ITEMS);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://scbapi.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Mot de passe administrateur incorrect.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      navigate("/form");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-100 via-sky-50 to-amber-50/50 font-sans text-navy-deep flex flex-col justify-between relative overflow-hidden">
      
      {/* Halo lumineux de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-137.5 bg-gold/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Éléments animés en arrière-plan (Oiseau en vol, Ange, Personne en prière) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.3, y: 40 }}
            animate={{
              opacity: [0, 0.75, 0.95, 0.4, 0],
              y: [-15, -80, -160],
              x: [0, item.id % 2 === 0 ? 35 : -35, 0],
              scale: [0.6, 1.15, 0.8],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            className="text-gold/75 filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
          >
            {item.type === "bird" && (
              /* Véritable oiseau en plein vol, ailes amples et déployées */
              <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 11.5c-2.3-.4-4.5.3-6.2 1.8-1.5-1.8-3.7-3-6.3-3.3-3.2-.4-6.3 1.2-7.5 3.8 2.2-.2 4.4.6 5.8 2-2 1.2-4 2.8-5.5 4.7 2.8-.7 5.5-2.2 7.7-4.2 1.8 1.6 4.1 2.5 6.5 2.5 2.5 0 4.9-.9 6.8-2.5-1.8-1.8-4-3.1-6.3-3.8 2.2-.7 4.1-2 5.5-3.8z"/>
              </svg>
            )}
            {item.type === "angel" && (
              /* Ange majestueux avec tête, corps drapé et grandes ailes célestes */
              <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c1.1 0 2 .9 2 2 0 .5-.2 1-.5 1.4C15.2 6 17 8.2 17 11c0 1-.3 2-.9 2.8 1.5.8 3.2 2.2 4.4 3.7.8 1 .2 2.5-1.1 2.5h-2.1c-.6 0-1.2-.4-1.5-1-.7-1.5-1.8-3-3-4.5-1.2 1.5-2.3 3-3 4.5-.3.6-.9 1-1.5 1H4.5c-1.3 0-1.9-1.5-1.1-2.5 1.2-1.5 2.9-2.9 4.4-3.7-.6-.8-1-1.8-1-2.8 0-2.8 1.8-5 3.5-5.6-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2zm-8 7l2 1-2 1-1-1 1-1zm16 0l1 1-1 1-2-1 2-1z"/>
              </svg>
            )}
            {item.type === "prayer" && (
              /* Personne agenouillée en train de prier pour de vrai avec les mains jointes */
              <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a3 3 0 100 6 3 3 0 000-6zm1.2 8.1c-.4-.1-.8-.1-1.2 0-1.5.4-2.8 1.5-3.2 3-.3 1.1-.1 2.3.6 3.2l-.4 3c-.1.7.4 1.3 1.1 1.4h.8l.8 3.5c.2.7.9 1.1 1.6.9.7-.2 1.1-.9.9-1.6l-.7-2.8h1.2l-.7 2.8c-.2.7.2 1.4.9 1.6.7.2 1.4-.2 1.6-.9l.8-3.5h.8c.7-.1 1.2-.7 1.1-1.4l-.4-3c.7-.9.9-2.1.6-3.2-.4-1.5-1.7-2.6-3.2-3z"/>
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Barre de navigation fixée avec un fond bleu sombre opacifié pour un contraste parfait */}
      <header className="w-full fixed top-0 left-0 z-50 bg-navy-deep/95 backdrop-blur-md shadow-md border-b border-gold/20">
        <Navbar />
      </header>

      {/* Conteneur principal du formulaire */}
      <main className="flex-1 flex items-center justify-center pt-36 pb-16 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] border border-slate-200 text-navy-deep space-y-8 relative overflow-hidden"
        >
          {/* En-tête du formulaire (Épuré) */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/15 text-gold mb-1 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-deep tracking-tight">
                Espace Admin
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Collège Catholique Saint Charles Borromée
              </p>
            </div>
            <div className="w-12 h-1 bg-gold rounded-full mx-auto my-2"></div>
          </div>

          {/* Message d'erreur */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider">
                Mot de passe de sécurité
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-navy-deep focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition duration-300 shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full group relative overflow-hidden rounded-xl bg-navy-deep hover:bg-gold text-white hover:text-navy-deep font-semibold py-4 px-6 text-sm transition-all duration-300 shadow-lg shadow-navy-deep/20 hover:shadow-gold/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

        </motion.div>
      </main>

      {/* Pied de page discret */}
      <footer className="text-center text-xs text-slate-500 py-6 relative z-10 border-t border-slate-200/80 bg-white/50">
        &copy; {new Date().getFullYear()} Collège Catholique Saint Charles Borromée — Tous droits réservés.
      </footer>
    </div>
  );
}