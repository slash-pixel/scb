import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // États pour le mot de passe, les erreurs et le chargement
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Traitement du formulaire de connexion
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError("");
    setIsLoading(true);

    try {
      // 1. Envoi de la requête au backend Hono sur Render
      const response = await fetch("https://scbapi.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      // 2. Gestion des erreurs de réponse HTTP
      if (!response.ok) {
        throw new Error("Mot de passe incorrect");
      }

      // 3. Extraction du token JWT
      const data = await response.json();

      // 4. Stockage du token dans le navigateur
      localStorage.setItem("token", data.token);

      // 5. Redirection vers la page du formulaire directement
      navigate("/form"); // <--- C'EST ICI QUE CA CHANGE
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Accès Administrateur
        </h2>

        {/* Message d'erreur */}
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="password"
            placeholder="Entrez le mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Vérification..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}