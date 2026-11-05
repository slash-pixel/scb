import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
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

type DisplayMode = "AGENDA" | "TICKER" | "BOTH";

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  displayMode: DisplayMode;
}

const DISPLAY_LABELS: Record<DisplayMode, string> = {
  AGENDA: "Agenda",
  TICKER: "Bandeau",
  BOTH: "Agenda + bandeau",
};

const EMPTY_EVENT_FORM = {
  title: "",
  description: "",
  eventDate: "",
  displayMode: "AGENDA" as DisplayMode,
};

// Convertit une date ISO en valeur pour <input type="datetime-local" />
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.
    tMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"images" | "comments" | "events">("images");
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

  
  // Édition de commentaire
  const [editingComment, setEditingComment] = useState<CommentItem | null>(null);
  const [editAuthor, setEditAuthor] = useState("");
  const [editContent, setEditContent] = useState("");


  // --- ÉTATS ÉVÉNEMENTS ---
const [events, setEvents] = useState<EventItem[]>([]);
const [isFetchingEvents, setIsFetchingEvents] = useState(true);
const [isSavingEvent, setIsSavingEvent] = useState(false);
const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
const [editingEventId, setEditingEventId] = useState<string | null>(null);
const [eventForm, setEventForm] = useState(EMPTY_EVENT_FORM);


  // --- NOTIFICATIONS ---
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("https//") || url.startsWith("http//")) return url.replace(/^https?\/\//, "https://");
    if (url.startsWith("res.cloudinary.com") || url.startsWith("//res.cloudinary.com")) return `https://${url.replace(/^\/\//, "")}`;
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch {
      console.error("Erreur lors de la récupération des images");
    } finally {
      setIsFetchingImages(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
       const [imagesRes, commentsRes, eventsRes] = await Promise.all([
  fetch(`${API_BASE_URL}/api/images`),
  fetch(`${API_BASE_URL}/api/admin/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  }),
  fetch(`${API_BASE_URL}/api/events`),
]);

        if (isMounted && imagesRes.ok) {
          const imgData = await imagesRes.json();
          setImages(imgData);
        }

        if (isMounted && commentsRes.ok) {
          const commentData = await commentsRes.json();
          setComments(commentData);
        }

        if (isMounted && eventsRes.ok) {
  const eventData = await eventsRes.json();
  setEvents(eventData);
}

      } catch {
        console.error("Erreur d'initialisation des données");
      } finally {
        if (isMounted) {
          setIsFetchingImages(false);
          setIsFetchingComments(false);
          setIsFetchingEvents(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) setPreview(URL.createObjectURL(selectedFile));
    else setPreview(null);
  };

  const handleUploadImage = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setStatus(null);
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const options = { maxSizeMB: 2, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("image", compressedFile, compressedFile.name);

      const response = await fetch(`${API_BASE_URL}/api/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Échec de l'envoi.");
      setStatus({ type: "success", message: "Image publiée avec succès !" });
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
    if (!window.confirm("Supprimer cette image ?")) return;
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setDeletingImageId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/images/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erreur suppression.");
      setImages((prev) => prev.filter((img) => img.id !== id));
      setStatus({ type: "success", message: "Image supprimée !" });
    } catch {
      setStatus({ type: "error", message: "Erreur lors de la suppression." });
    } finally {
      setDeletingImageId(null);
    }
  };

  const handleApproveComment = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setProcessingCommentId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!response.ok) throw new Error("Erreur validation.");
      setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
      setStatus({ type: "success", message: "Commentaire approuvé !" });
    } catch {
      setStatus({ type: "error", message: "Erreur d'approbation." });
    } finally {
      setProcessingCommentId(null);
    }
  };

  const handleUpdateComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingComment) return;

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${editingComment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ author: editAuthor, content: editContent }),
      });
      if (!response.ok) throw new Error("Mise à jour échouée.");
      setComments((prev) =>
        prev.map((c) => (c.id === editingComment.id ? { ...c, author: editAuthor, content: editContent } : c))
      );
      setStatus({ type: "success", message: "Commentaire mis à jour !" });
      setEditingComment(null);
    } catch {
      setStatus({ type: "error", message: "Impossible de modifier le commentaire." });
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setProcessingCommentId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erreur suppression.");
      setComments((prev) => prev.filter((c) => c.id !== id));
      setStatus({ type: "success", message: "Commentaire supprimé !" });
    } catch {
      setStatus({ type: "error", message: "Erreur suppression." });
    } finally {
      setProcessingCommentId(null);
    }
  };

  const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`);
    if (response.ok) setEvents(await response.json());
  } catch {
    console.error("Erreur lors de la récupération des événements");
  } finally {
    setIsFetchingEvents(false);
  }
};

const resetEventForm = () => {
  setEditingEventId(null);
  setEventForm(EMPTY_EVENT_FORM);
};

const handleSubmitEvent = async (e: FormEvent) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) return navigate("/login");

  setIsSavingEvent(true);
  setStatus(null);
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/events${editingEventId ? `/${editingEventId}` : ""}`,
      {
        method: editingEventId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...eventForm,
          eventDate: new Date(eventForm.eventDate).toISOString(),
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Échec de l'enregistrement.");

    setStatus({
      type: "success",
      message: editingEventId ? "Événement mis à jour !" : "Événement ajouté !",
    });
    resetEventForm();
    await fetchEvents();
  } catch (err) {
    setStatus({ type: "error", message: err instanceof Error ? err.message : "Erreur inattendue." });
  } finally {
    setIsSavingEvent(false);
  }
};

const handleEditEvent = (ev: EventItem) => {
  setEditingEventId(ev.id);
  setEventForm({
    title: ev.title,
    description: ev.description ?? "",
    eventDate: toLocalInput(ev.eventDate),
    displayMode: ev.displayMode,
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleDeleteEvent = async (id: string) => {
  if (!window.confirm("Supprimer cet événement ?")) return;
  const token = localStorage.getItem("token");
  if (!token) return navigate("/login");

  setDeletingEventId(id);
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Erreur suppression.");
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    if (editingEventId === id) resetEventForm();
    setStatus({ type: "success", message: "Événement supprimé !" });
  } catch {
    setStatus({ type: "error", message: "Erreur lors de la suppression." });
  } finally {
    setDeletingEventId(null);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const pendingComments = comments.filter((c) => c.status === "pending");
  const approvedComments = comments.filter((c) => c.status === "approved");
  const nowMs = Date.now();
const sortedEvents = [...events].sort((a, b) => {
  const ta = new Date(a.eventDate).getTime();
  const tb = new Date(b.eventDate).getTime();
  const aPast = ta < nowMs;
  const bPast = tb < nowMs;
  if (aPast !== bPast) return aPast ? 1 : -1;
  return aPast ? tb - ta : ta - tb;
});
const upcomingCount = events.filter((ev) => new Date(ev.eventDate).getTime() >= nowMs).length;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-paper font-sans text-navy-deep">
      
      {/* SIDEBAR RESPONSIVE */}
      <aside className="w-full lg:w-64 bg-navy-deep text-white flex flex-col justify-between p-4 lg:p-6 shrink-0 shadow-2xl">
        <div className="space-y-4 lg:space-y-8">
          <div className="flex items-center justify-between lg:justify-start space-x-3 px-2">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-8 bg-gold rounded-full"></div>
              <div>
                <h2 className="text-lg lg:text-xl font-extrabold tracking-wide text-white">Saint Charles</h2>
                <p className="text-xs text-gold/80 font-medium">Espace Admin</p>
              </div>
            </div>
            {/* Bouton déconnexion mobile rapide */}
            <button
              onClick={handleLogout}
              className="lg:hidden text-xs font-semibold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg"
            >
              Quitter
            </button>
          </div>

          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setActiveTab("images")}
              className={`flex-1 lg:flex-none flex items-center justify-between px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl font-semibold text-xs lg:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === "images"
                  ? "bg-gold text-navy-deep font-bold shadow-md"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span>Images</span>
              <span className={`text-[10px] lg:text-xs font-bold px-2 py-0.5 rounded-md ml-2 ${activeTab === "images" ? "bg-navy-deep text-white" : "bg-white/10 text-white"}`}>
                {images.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("comments")}
              className={`flex-1 lg:flex-none flex items-center justify-between px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl font-semibold text-xs lg:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === "comments"
                  ? "bg-gold text-navy-deep font-bold shadow-md"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span>Commentaires</span>
              {pendingComments.length > 0 ? (
                <span className="text-[10px] lg:text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full animate-pulse ml-2">
                  {pendingComments.length}
                </span>
              ) : (
                <span className={`text-[10px] lg:text-xs font-bold px-2 py-0.5 rounded-md ml-2 ${activeTab === "comments" ? "bg-navy-deep text-white" : "bg-white/10 text-white"}`}>
                  {comments.length}
                </span>
              )}
            </button>

            <button
  onClick={() => setActiveTab("events")}
  className={`flex-1 lg:flex-none flex items-center justify-between px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl font-semibold text-xs lg:text-sm transition-all duration-200 whitespace-nowrap ${
    activeTab === "events"
      ? "bg-gold text-navy-deep font-bold shadow-md"
      : "hover:bg-white/10 text-white/80 hover:text-white"
  }`}
>
  <span>Événements</span>
  <span className={`text-[10px] lg:text-xs font-bold px-2 py-0.5 rounded-md ml-2 ${activeTab === "events" ? "bg-navy-deep text-white" : "bg-white/10 text-white"}`}>
    {upcomingCount}
  </span>
</button>
          </nav>
        </div>

        <div className="hidden lg:block pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6 bg-[#3B2F2F]/10 backdrop-blur-sm">
        
        {/* Banner Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 lg:px-8 rounded-2xl shadow-sm border border-navy/10 gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-navy-deep">
  {activeTab === "images"
    ? "Gestion du Portfolio & Galerie"
    : activeTab === "comments"
    ? "Modération des Commentaires"
    : "Agenda & Bandeau d'événements"}
</h1>
<p className="text-xs text-navy/60 mt-1">
  {activeTab === "images"
    ? "Téléversez et administrez les visuels publics"
    : activeTab === "comments"
    ? "Consultez, modifiez, validez ou supprimez les commentaires"
    : "Programmez les événements affichés sur l'agenda et le bandeau défilant"}
</p>
          </div>
          {activeTab === "comments" && pendingComments.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl">
              {pendingComments.length} en attente
            </div>
          )}
        </div>

        {/* Banner status */}
        {status && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
              status.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* ONGLET 1 : IMAGES */}
        {activeTab === "images" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Formulaire de publication */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-navy/10 h-fit space-y-5">
              <h2 className="text-base font-bold text-navy-deep border-b border-navy/10 pb-3">
                Ajouter une image
              </h2>

              <form onSubmit={handleUploadImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">
                    Fichier image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-navy/70 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-navy-deep file:text-white hover:file:bg-gold hover:file:text-navy-deep cursor-pointer"
                    required
                  />
                </div>

                {preview && (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-navy/60 uppercase tracking-wider mb-1">Aperçu :</p>
                    <img src={preview} alt="Aperçu" className="h-40 w-full object-cover rounded-xl border border-navy/10" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploading || !file}
                  className="w-full bg-gradient-to-r from-navy-deep to-[#1E293B] hover:from-gold hover:to-amber-500 text-white hover:text-navy-deep border border-amber-500/30 text-sm font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold/20 disabled:opacity-50"
                >
                  {isUploading ? "Compression & Envoi..." : "Publier l'image"}
                </button>
              </form>
            </div>

            {/* Conteneur Galerie Actuelle */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-navy/10 space-y-4">
              <h2 className="text-base font-bold text-navy-deep border-b border-navy/10 pb-3">
                Galerie Actuelle ({images.length})
              </h2>

              {isFetchingImages ? (
                <div className="text-center py-12 text-xs text-navy/50 font-medium">Chargement des images...</div>
              ) : images.length === 0 ? (
                <div className="text-center py-12 text-xs text-navy/50 font-medium">Aucune image publiée.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="group bg-paper rounded-xl overflow-hidden border border-navy/10 flex flex-col justify-between shadow-sm hover:border-gold transition-all duration-300">
                      <div className="h-36 overflow-hidden">
                        <img src={getImageUrl(img.url)} alt={img.title || "Galerie public"} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                      </div>
                      <div className="p-3">
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          disabled={deletingImageId === img.id}
                          className="w-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50"
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

        {/* ONGLET 2 : COMMENTAIRES */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 lg:p-5 rounded-2xl border border-navy/10 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs text-navy/60 font-semibold uppercase">Total</p>
                  <p className="text-xl lg:text-2xl font-extrabold text-navy-deep mt-1">{comments.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-navy-deep/5 text-navy-deep font-bold flex items-center justify-center">💬</div>
              </div>
              <div className="bg-white p-4 lg:p-5 rounded-2xl border border-navy/10 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs text-amber-700 font-semibold uppercase">En attente</p>
                  <p className="text-xl lg:text-2xl font-extrabold text-amber-600 mt-1">{pendingComments.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center">⏳</div>
              </div>
              <div className="bg-white p-4 lg:p-5 rounded-2xl border border-navy/10 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs text-emerald-700 font-semibold uppercase">Approuvés</p>
                  <p className="text-xl lg:text-2xl font-extrabold text-emerald-600 mt-1">{approvedComments.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center">✅</div>
              </div>
            </div>

            {editingComment && (
              <form onSubmit={handleUpdateComment} className="bg-white p-5 lg:p-6 rounded-2xl border-2 border-gold shadow-md space-y-4">
                <div className="flex justify-between items-center border-b border-navy/10 pb-3">
                  <h3 className="text-sm font-extrabold text-navy-deep">Modifier le commentaire #{editingComment.id}</h3>
                  <button type="button" onClick={() => setEditingComment(null)} className="text-xs font-bold text-red-500 hover:underline">Annuler</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy/70 mb-1">Nom de l'auteur</label>
                    <input
                      type="text"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-navy/20 bg-paper focus:outline-none focus:border-navy-deep"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy/70 mb-1">Commentaire (max 500 chars)</label>
                    <textarea
                      value={editContent}
                      maxLength={500}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-navy/20 bg-paper focus:outline-none focus:border-navy-deep"
                      rows={2}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="bg-navy-deep text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-gold hover:text-navy-deep transition">
                  Enregistrer les modifications
                </button>
              </form>
            )}

            <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-navy/10 space-y-4">
              <h2 className="text-base font-bold text-navy-deep border-b border-navy/10 pb-3">
                Gestion des commentaires enregistrés
              </h2>

              {isFetchingComments ? (
                <div className="text-center py-12 text-xs text-navy/50 font-medium">Chargement des commentaires...</div>
              ) : comments.length === 0 ? (
                <div className="text-center py-12 text-xs text-navy/50 font-medium">Aucun commentaire soumis.</div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-xl border transition-all duration-150 flex flex-col gap-3 ${
                        comment.status === "pending"
                          ? "bg-amber-50/40 border-amber-200"
                          : "bg-paper border-navy/10"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-xs text-navy-deep">{comment.author}</span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              comment.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {comment.status === "approved" ? "Approuvé" : "En attente"}
                          </span>
                          <span className="text-[10px] text-navy/50">
                            {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-navy/80 leading-relaxed">{comment.content}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-navy/5">
                        {comment.status === "pending" && (
                          <button
                            onClick={() => handleApproveComment(comment.id)}
                            disabled={processingCommentId === comment.id}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50"
                          >
                            Approuver
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditingComment(comment);
                            setEditAuthor(comment.author);
                            setEditContent(comment.content);
                          }}
                          className="bg-white border border-navy/20 text-navy-deep hover:bg-navy-deep hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                        >
                          Éditer
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          disabled={processingCommentId === comment.id}
                          className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ONGLET 3 : ÉVÉNEMENTS */}
{activeTab === "events" && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {/* Formulaire */}
    <div className={`lg:col-span-1 bg-white rounded-2xl p-5 lg:p-6 shadow-sm h-fit space-y-5 ${editingEventId ? "border-2 border-gold" : "border border-navy/10"}`}>
      <div className="flex justify-between items-center border-b border-navy/10 pb-3">
        <h2 className="text-base font-bold text-navy-deep">
          {editingEventId ? "Modifier l'événement" : "Ajouter un événement"}
        </h2>
        {editingEventId && (
          <button type="button" onClick={resetEventForm} className="text-xs font-bold text-red-500 hover:underline">
            Annuler
          </button>
        )}
      </div>

      <form onSubmit={handleSubmitEvent} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">Titre</label>
          <input
            type="text"
            value={eventForm.title}
            maxLength={150}
            onChange={(e) => setEventForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full text-xs p-2.5 rounded-xl border border-navy/20 bg-paper focus:outline-none focus:border-navy-deep"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">Description (optionnel)</label>
          <textarea
            value={eventForm.description}
            onChange={(e) => setEventForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            className="w-full text-xs p-2.5 rounded-xl border border-navy/20 bg-paper focus:outline-none focus:border-navy-deep"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">Date et heure</label>
          <input
            type="datetime-local"
            value={eventForm.eventDate}
            onChange={(e) => setEventForm((f) => ({ ...f, eventDate: e.target.value }))}
            className="w-full text-xs p-2.5 rounded-xl border border-navy/20 bg-paper focus:outline-none focus:border-navy-deep"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">Affichage</label>
          <select
            value={eventForm.displayMode}
            onChange={(e) => setEventForm((f) => ({ ...f, displayMode: e.target.value as DisplayMode }))}
            className="w-full text-xs p-2.5 rounded-xl border border-navy/20 bg-paper focus:outline-none focus:border-navy-deep"
          >
            <option value="AGENDA">Agenda uniquement</option>
            <option value="TICKER">Bandeau uniquement</option>
            <option value="BOTH">Agenda + bandeau</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSavingEvent}
          className="w-full bg-navy-deep hover:bg-gold text-white hover:text-navy-deep text-sm font-bold py-3 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {isSavingEvent ? "Enregistrement..." : editingEventId ? "Enregistrer les modifications" : "Publier l'événement"}
        </button>
      </form>
    </div>

    {/* Liste */}
    <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-navy/10 space-y-4">
      <h2 className="text-base font-bold text-navy-deep border-b border-navy/10 pb-3">
        Événements programmés ({events.length})
      </h2>

      {isFetchingEvents ? (
        <div className="text-center py-12 text-xs text-navy/50 font-medium">Chargement des événements...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-xs text-navy/50 font-medium">Aucun événement programmé.</div>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map((ev) => {
            const date = new Date(ev.eventDate);
            const isPast = date.getTime() < nowMs;
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div
                key={ev.id}
                className={`p-4 rounded-xl border flex flex-col gap-3 ${
                  isPast ? "bg-paper border-navy/10" : isToday ? "bg-amber-50/40 border-amber-200" : "bg-white border-navy/10"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-extrabold text-xs ${isPast ? "text-navy/50" : "text-navy-deep"}`}>{ev.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isPast
                          ? "bg-navy/10 text-navy/60"
                          : isToday
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isPast ? "Passé" : isToday ? "Aujourd'hui" : "À venir"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-navy-deep/5 text-navy-deep">
                      {DISPLAY_LABELS[ev.displayMode]}
                    </span>
                  </div>
                  <p className="text-[11px] text-navy/60">
                    {date.toLocaleString("fr-FR", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {ev.description && <p className="text-xs text-navy/80 leading-relaxed">{ev.description}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-navy/5">
                  <button
                    onClick={() => handleEditEvent(ev)}
                    className="bg-white border border-navy/20 text-navy-deep hover:bg-navy-deep hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    disabled={deletingEventId === ev.id}
                    className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                  >
                    {deletingEventId === ev.id ? "Suppression..." : "Supprimer"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

  </div>
)}

      </main>
    </div>
  );
}