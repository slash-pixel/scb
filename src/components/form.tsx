import { useState, useEffect, useCallback, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface ImageItem {
  id: string;
  title: string;
  fileName: string;
  url: string;
  createdAt?: string;
}

const API_BASE_URL = "https://scbapi.onrender.com";

export default function Form() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ÉTATS POUR LA LISTE ET LA SUPPRESSION
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isFetchingImages, setIsFetchingImages] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fonction de rechargement réutilisable après un ajout
  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des images :", err);
    } finally {
      setIsFetchingImages(false);
    }
  }, []);

  // Chargement initial sécurisé dans useEffect
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/images`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setImages(data);
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des images :", err);
      } finally {
        if (isMounted) {
          setIsFetchingImages(false);
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Gestion du choix de fichier et génération de l'aperçu
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  // Envoi du formulaire à l'API Hono
  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    setIsLoading(true);
    setStatus(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Échec de l'envoi de l'image au serveur.");
      }

      setStatus({ type: "success", message: "Image ajoutée à la galerie avec succès !" });
      setTitle("");
      setFile(null);
      setPreview(null);
      
      // Recharger la liste après ajout
      fetchImages();
    } catch (err) {
      if (err instanceof Error) {
        setStatus({ type: "error", message: err.message });
      } else {
        setStatus({ type: "error", message: "Une erreur inattendue est survenue." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Suppression d'une image
  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setDeletingId(id);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/images/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Échec de la suppression de l'image.");
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
      setStatus({ type: "success", message: "Image supprimée avec succès !" });
    } catch (err) {
      if (err instanceof Error) {
        setStatus({ type: "error", message: err.message });
      } else {
        setStatus({ type: "error", message: "Erreur lors de la suppression." });
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-paper py-12 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="flex items-center justify-between border-b border-navy/10 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-ink">Espace d'administration</h1>
            <p className="text-sm text-navy/70">Gestion des images de la galerie</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Déconnexion
          </button>
        </div>

        {status && (
          <div
            className={`rounded-lg p-4 text-sm font-medium ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-ink border-b border-navy/10 pb-3">
            Ajouter une nouvelle image
          </h2>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Titre ou description de la photo
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Cérémonie de remise des prix"
              className="w-full rounded-xl border border-navy/15 p-3.5 text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Fichier image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-navy/70 file:mr-4 file:rounded-lg file:border-0 file:bg-navy-deep file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-gold hover:file:text-navy-deep"
              required
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-mono uppercase tracking-wider text-navy/60">Aperçu :</p>
              <img
                src={preview}
                alt="Aperçu"
                className="h-48 w-full rounded-xl object-cover border border-navy/10"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-navy-deep py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-gold hover:text-navy-deep disabled:opacity-50"
          >
            {isLoading ? "Téléversement en cours..." : "Publier l'image"}
          </button>
        </form>

        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-navy/10 pb-3">
            <h2 className="text-lg font-bold text-ink">
              Images publiées ({images.length})
            </h2>
          </div>

          {isFetchingImages ? (
            <p className="text-sm text-navy/60 text-center py-6">Chargement des images...</p>
          ) : images.length === 0 ? (
            <p className="text-sm text-navy/60 text-center py-6">Aucune image publiée pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-paper transition hover:shadow-md"
                >
                  <img
                    src={`${API_BASE_URL}${img.url}`}
                    alt={img.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                    <p className="text-sm font-semibold text-ink line-clamp-2">{img.title}</p>
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={deletingId === img.id}
                      className="w-full rounded-lg bg-red-50 border border-red-200 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                    >
                      {deletingId === img.id ? "Suppression..." : "Supprimer"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}