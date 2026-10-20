import { useState, useEffect, useRef } from "react";

interface CommentItem {
  id: number;
  author: string;
  content: string;
  status: "pending" | "approved";
  createdAt: string;
}

const API_BASE_URL = "https://scbapi.onrender.com";
const MAX_WORDS = 80;

export default function TestimonialsSection() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Modal Formulaire ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // --- Modal Lecture Complète ---
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null);

  // --- Carrousel ---
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calcul du nombre de mots
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  // Récupération des commentaires approuvés
  useEffect(() => {
    let isMounted = true;

    const loadComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/comments`);
        if (res.ok) {
          const data: CommentItem[] = await res.json();
          const approved = data.filter((c) => c.status === "approved");
          if (isMounted) {
            setComments(approved);
          }
        }
      } catch {
        console.error("Erreur lors du chargement des avis");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadComments();

    return () => {
      isMounted = false;
    };
  }, []);

  // Défilement automatique toutes les 5 secondes (basé sur le scroll)
  useEffect(() => {
    if (comments.length <= 1 || isPaused || !carouselRef.current) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount > 400 ? 400 : scrollAmount, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [comments.length, isPaused]);

  // Navigation manuelle carrousel par défilement
  const handleScrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const handleScrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  // Soumission d'un nouvel avis
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    if (wordCount > MAX_WORDS) {
      setSubmitStatus({ type: "error", message: `Votre commentaire dépasse la limite de ${MAX_WORDS} mots.` });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: authorName.trim(), content: content.trim() }),
      });

      if (!response.ok) throw new Error("Échec de l'envoi.");

      setSubmitStatus({
        type: "success",
        message: "Merci ! Votre avis a été soumis et sera publié après validation.",
      });
      setAuthorName("");
      setContent("");
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2500);
    } catch {
      setSubmitStatus({ type: "error", message: "Impossible d'envoyer votre avis pour le moment." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calcul du temps écoulé en français
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "À l'instant";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `Il y a ${days} j`;
    const months = Math.floor(days / 30);
    if (months < 12) return `Il y a ${months} mois`;
    return `Il y a ${Math.floor(months / 12)} an(s)`;
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 font-sans overflow-hidden">
      
      {/* SECTION EN-TÊTE AVEC FLÈCHES DE DIRECTION INTÉGRÉES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-deep">Ce que disent nos élèves</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Basé sur {comments.length} avis publiés
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Flèches de direction interactives */}
          {comments.length > 1 && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-xs">
              <button
                onClick={handleScrollPrev}
                className="w-9 h-9 bg-white shadow-xs rounded-full flex items-center justify-center text-slate-700 hover:bg-navy-deep hover:text-white transition-all text-sm font-bold cursor-pointer"
                aria-label="Avis précédent"
              >
                &#8249;
              </button>
              <button
                onClick={handleScrollNext}
                className="w-9 h-9 bg-white shadow-xs rounded-full flex items-center justify-center text-slate-700 hover:bg-navy-deep hover:text-white transition-all text-sm font-bold cursor-pointer"
                aria-label="Avis suivant"
              >
                &#8250;
              </button>
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-navy-deep hover:opacity-90 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all duration-200 cursor-pointer"
          >
            Laisser un avis
          </button>
        </div>
      </div>

      {/* CARROUSEL DES AVIS */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Chargement des avis...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl text-slate-500 text-sm px-4">
          Aucun avis pour le moment. Soyez le premier à en laisser un !
        </div>
      ) : (
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Conteneur Carrousel Scroll-Snap (Swipeable sur mobile) */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pb-4 pt-1 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {comments.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] shrink-0 snap-start flex"
              >
                <div className="bg-[#F8F9FA] hover:bg-white rounded-3xl p-5 sm:p-6 w-full border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Contenu du commentaire */}
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed line-clamp-4">
                      {item.content}
                    </p>
                    
                    {item.content.length > 120 && (
                      <button
                        onClick={() => setSelectedComment(item)}
                        className="text-xs font-bold text-navy-deep mt-2 hover:underline inline-block cursor-pointer"
                      >
                        Lire la suite...
                      </button>
                    )}
                  </div>

                  {/* Auteur & Métadonnées */}
                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-200/50">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-navy-deep text-white font-bold flex items-center justify-center uppercase text-xs sm:text-sm shrink-0">
                      {item.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-navy-deep truncate">{item.author}</h4>
                      <span className="text-[10px] sm:text-[11px] text-slate-400">{getRelativeTime(item.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL FORMULAIRE ("Laisser un avis") */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-navy-deep">Donnez votre avis</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submitStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  submitStatus.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Votre Nom</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ex. Jean Dupont"
                  maxLength={50}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-navy-deep"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Votre Commentaire</label>
                  <span
                    className={`text-[11px] font-semibold ${
                      wordCount > MAX_WORDS ? "text-rose-600 font-bold" : "text-slate-400"
                    }`}
                  >
                    {wordCount} / {MAX_WORDS} mots
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Partagez votre expérience..."
                  rows={4}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-navy-deep resize-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || wordCount > MAX_WORDS}
                  className="bg-navy-deep hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer l'avis"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL LECTURE COMPLÈTE ("Lire la suite") */}
      {selectedComment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center space-x-3 min-w-0 pr-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-navy-deep text-white font-bold flex items-center justify-center uppercase shrink-0 text-xs sm:text-sm">
                  {selectedComment.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-navy-deep truncate">{selectedComment.author}</h4>
                  <span className="text-[10px] sm:text-[11px] text-slate-400">{getRelativeTime(selectedComment.createdAt)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedComment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1 cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-h-60 overflow-y-auto pr-2">
              {selectedComment.content}
            </p>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedComment(null)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}