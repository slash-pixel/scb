import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        throw new Error("Mot de passe incorrect");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Redirection vers le tableau de bord / formulaire
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
    <div className="min-h-screen w-full bg-paper font-sans text-navy-deep flex flex-col justify-between p-4 sm:p-6">
      
      {/* En-tête / Navigation de retour */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-2">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-3 h-8 bg-gold rounded-full transition-transform group-hover:scale-110"></div>
          <div>
            <h1 className="text-lg font-extrabold text-navy-deep tracking-wide">Saint Charles</h1>
            <p className="text-[10px] text-navy/60 font-medium">Collège Catholique Borromée</p>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-navy/70 hover:text-navy-deep border border-navy/15 px-4 py-2 rounded-xl transition hover:bg-white shadow-sm"
        >
          ← Retour au site
        </Link>
      </header>

      {/* Conteneur Formulaire de Connexion */}
      <main className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-navy/10 space-y-6">
          
          {/* Titre & Sous-titre */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-navy-deep/5 text-navy-deep rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
              🔒
            </div>
            <h2 className="text-2xl font-extrabold text-navy-deep">Accès Administrateur</h2>
            <p className="text-xs text-navy/60">
              Veuillez saisir votre mot de passe pour accéder au panneau de gestion.
            </p>
          </div>

          {/* Banner Erreur */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center animate-in fade-in duration-200">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-2">
                Mot de passe admin
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm p-3.5 rounded-xl border border-navy/20 bg-paper focus:bg-white focus:outline-none focus:border-navy-deep transition duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full bg-navy-deep hover:bg-[#1C2541] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-lg disabled:opacity-50 hover:shadow-navy-deep/20"
            >
              {isLoading ? "Vérification en cours..." : "Se connecter"}
            </button>
          </form>

        </div>
      </main>

      {/* Pied de page */}
      <footer className="text-center text-[11px] text-navy/40 py-4">
        &copy; {new Date().getFullYear()} Collège Catholique Saint Charles Borromée — Tous droits réservés.
      </footer>
    </div>
  );
}