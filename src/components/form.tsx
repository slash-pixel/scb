import { useState, useEffect, useCallback, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

interface ImageItem {
  id: string;
  title?: string;
  fileName: string;
  url: string;
  createdAt?: string;
}

interface CommentItem {
  id: number;
  author: string;
  content: string;
  status: "pending" | "approved";
  createdAt: string;
}

const API_BASE_URL = "https://scbapi.onrender.com";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"images" | "comments">("images");
  const navigate = useNavigate();

  // --- ÉTATS IMAGES ---
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isFetchingImages, setIsFetchingImages] = useState(true);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- ÉTATS COMMENTAIRES ---
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(true);
  const [processingCommentId, setProcessingCommentId] = useState<number | null>(null);

  // --- ÉTAT GLOBAL NOTIFICATION ---
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Formater URL Image
  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("https//") || url.startsWith("http//")) return url.replace(/^https?\/\//, "https://");
    if (url.startsWith("res.cloudinary.com") || url.startsWith("//res.cloudinary.com")) return `https://${url.replace(/^\/\//, "")}`;
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  // --- CHARGEMENT DONNÉES ---
  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (err) {
      console.error("Erreur images :", err);
    } finally {
      setIsFetchingImages(false);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Erreur commentaires :", err);
    } finally {
      setIsFetchingComments(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchImages();
    fetchComments();
  }, [fetchImages, fetchComments]);

  // --- HANDLERS IMAGES ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUploadImage = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setStatus(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("image", compressedFile, compressedFile.name);

      const response = await fetch(`${API_BASE_URL}/api/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Échec de l'envoi de l'image.");
      }

      setStatus({ type: "success", message: "Image ajoutée avec succès !" });
      setFile(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Erreur inattendue." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette image ?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setDeletingImageId(id);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/images/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Échec de la suppression.");

      setImages((prev) => prev.filter((img) => img.id !== id));
      setStatus({ type: "success", message: "Image supprimée avec succès !" });
    } catch (err) {
      setStatus({ type: "error", message: "Erreur lors de la suppression de l'image." });
    } finally {
      setDeletingImageId(null);
    }
  };

  // --- HANDLERS COMMENTAIRES ---
  const handleApproveComment = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setProcessingCommentId(id);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "approved" }),
      });

      if (!response.ok) throw new Error("Échec de l'approbation.");

      setComments((prev) =>
        prev.map((com) => (com.id === id ? { ...com, status: "approved" } : com))
      );
      setStatus({ type: "success", message: "Commentaire approuvé !" });
    } catch (err) {
      setStatus({ type: "error", message: "Erreur lors de la validation du commentaire." });
    } finally {
      setProcessingCommentId(null);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setProcessingCommentId(id);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Échec de la suppression.");

      setComments((prev) => prev.filter((com) => com.id !== id));
      setStatus({ type: "success", message: "Commentaire supprimé avec succès !" });
    } catch (err) {
      setStatus({ type: "error", message: "Erreur lors de la suppression du commentaire." });
    } finally {
      setProcessingCommentId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const pendingCommentsCount = comments.filter((c) => c.status === "pending").length;

  return (
    <div className="flex min-h-screen bg-[#DDE6ED] font-sans text-slate-800">
      
      {/* ------------------------------------------------------------------ */}
      {/* SIDEBAR LATÉRALE                                                  */}
      {/* ------------------------------------------------------------------ */}
      <aside className="w-64 bg-navy-deep text-white flex flex-col justify-between p-6 shrink-0 shadow-xl">
        <div className="space-y-8">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-3 h-8 bg-gold rounded-full"></div>
            <div>
              <h2 className="text-xl font-extrabold tracking-wide text-white">Saint Charles</h2>
              <p className="text-xs text-gold/80">Espace Admin</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("images")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === "images"
                  ? "bg-gold text-navy-deep font-bold shadow-md"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span>Gestion Images</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${activeTab === "images" ? "bg-navy-deep text-white" : "bg-white/10 text-white"}`}>
                {images.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("comments")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === "comments"
                  ? "bg-gold text-navy-deep font-bold shadow-md"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span>Commentaires</span>
              {pendingCommentsCount > 0 ? (
                <span className="text-xs font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                  {pendingCommentsCount}
                </span>
              ) : (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${activeTab === "comments" ? "bg-navy-deep text-white" : "bg-white/10 text-white"}`}>
                  {comments.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENU PRINCIPAL (Zone Droite avec couleurs du Dashboard)        */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 p-8 overflow-y-auto space-y-6">
        
        {/* Banner de titre */}
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1E2E]">
              {activeTab === "images" ? "Gestion du Portfolio & Galerie" : "Modération des Commentaires"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {activeTab === "images" 
                ? "Téléversez de nouvelles photos et gérez la galerie publique" 
                : "Approuvez ou supprimez les commentaires soumis par les visiteurs"}
            </p>
          </div>
          {activeTab === "comments" && pendingCommentsCount > 0 && (
            <div className="bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-xl">
              {pendingCommentsCount} en attente de validation
            </div>
          )}
        </div>

        {/* Feedback notification */}
        {status && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
              status.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-rose-500 text-white"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* ================================================================ */}
        {/* ONGLET 1 : GESTION DES IMAGES                                    */}
        {/* ================================================================ */}
        {activeTab === "images" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Formulaire d'upload */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-fit space-y-5">
              <h2 className="text-base font-bold text-[#1E1E2E] border-b border-slate-100 pb-3">
                Publier une image
              </h2>

              <form onSubmit={handleUploadImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Fichier image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#1E1E2E] file:text-orange-400 hover:file:bg-[#2D2B52] cursor-pointer"
                    required
                  />
                </div>

                {preview && (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Aperçu sélectionné :</p>
                    <img src={preview} alt="Aperçu" className="h-40 w-full object-cover rounded-xl border border-slate-200" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploading || !file}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-bold py-3 rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20"
                >
                  {isUploading ? "Traitement & Envoi..." : "Envoyer l'image"}
                </button>
              </form>
            </div>

            {/* Grille des images */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-[#1E1E2E] border-b border-slate-100 pb-3">
                Galerie Actuelle ({images.length})
              </h2>

              {isFetchingImages ? (
                <div className="text-center py-12 text-xs text-slate-400 font-medium">Chargement des images...</div>
              ) : images.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400 font-medium">Aucune image publiée dans la galerie.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="group bg-[#1E1E2E] rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-sm">
                      <div className="h-36 overflow-hidden">
                        <img src={getImageUrl(img.url)} alt={img.title || "Galerie"} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                      </div>
                      <div className="p-3">
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          disabled={deletingImageId === img.id}
                          className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50"
                        >
                          {deletingImageId === img.id ? "Suppression..." : "Supprimer"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================================================================ */}
        {/* ONGLET 2 : MODÉRATION DES COMMENTAIRES                           */}
        {/* ================================================================ */}
        {activeTab === "comments" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-base font-bold text-[#1E1E2E] border-b border-slate-100 pb-3">
              Liste des commentaires enregistrés
            </h2>

            {isFetchingComments ? (
              <div className="text-center py-12 text-xs text-slate-400 font-medium">Chargement des commentaires...</div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400 font-medium">Aucun commentaire soumis.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50">
                      <th className="p-3 rounded-l-xl">Auteur</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {comments.map((comment) => (
                      <tr key={comment.id} className="hover:bg-slate-50/80 transition-all duration-150">
                        <td className="p-3 font-bold text-[#1E1E2E] whitespace-nowrap">{comment.author}</td>
                        <td className="p-3 text-slate-600 max-w-sm truncate" title={comment.content}>
                          {comment.content}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                              comment.status === "approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {comment.status === "approved" ? "Approuvé" : "En attente"}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 whitespace-nowrap">
                          {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-3 text-right space-x-2 whitespace-nowrap">
                          {comment.status === "pending" && (
                            <button
                              onClick={() => handleApproveComment(comment.id)}
                              disabled={processingCommentId === comment.id}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 shadow-sm"
                            >
                              {processingCommentId === comment.id ? "..." : "Approuver"}
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={processingCommentId === comment.id}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50"
                          >
                            {processingCommentId === comment.id ? "..." : "Supprimer"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}