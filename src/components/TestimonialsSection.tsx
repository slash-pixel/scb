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

  // --- Modal Form ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // --- Modal Read More ---
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null);

  // --- Carrousel ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calcul du nombre de mots
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  // Récupération des commentaires approuvés lors du montage
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

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (comments.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [comments.length, isPaused]);

  // Navigation manuelle carrousel
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? comments.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
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

  // Calcul du temps écoulé
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}m ago`;
    return `${Math.floor(months / 12)}y ago`;
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0B132B]">What Our Customers Say</h2>
          <div className="flex items-center space-x-2 mt-2 text-sm text-slate-600">
            <span className="font-bold text-slate-900 text-base">4.9</span>
            <div className="flex text-amber-400">
              {"★".repeat(5)}
            </div>
            <span>Based on {comments.length} reviews</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0B132B] hover:bg-[#1C2541] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md transition-all duration-200 self-start sm:self-auto"
        >
          Leave a Review
        </button>
      </div>

      {/* CARROUSEL DES AVIS */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading reviews...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl text-slate-500">
          No reviews yet. Be the first to leave one!
        </div>
      ) : (
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Bouton Gauche */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all border border-slate-100"
            aria-label="Previous review"
          >
            &#8249;
          </button>

          {/* Grille / Carrousel */}
          <div className="overflow-hidden rounded-3xl" ref={carouselRef}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / Math.min(comments.length, 3))}%)`,
              }}
            >
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 p-3"
                >
                  <div className="bg-[#F8F9FA] hover:bg-white rounded-3xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                      {/* Étoiles */}
                      <div className="text-amber-400 text-lg mb-4">{"★".repeat(5)}</div>
                      
                      {/* Contenu */}
                      <p className="text-slate-700 text-sm leading-relaxed line-clamp-4">
                        {item.content}
                      </p>
                      
                      {item.content.length > 120 && (
                        <button
                          onClick={() => setSelectedComment(item)}
                          className="text-xs font-bold text-slate-900 mt-2 hover:underline inline-block"
                        >
                          Read more...
                        </button>
                      )}
                    </div>

                    {/* Auteur & Meta */}
                    <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-200/50">
                      <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 font-bold flex items-center justify-center uppercase text-sm shrink-0">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{item.author}</h4>
                        <span className="text-[11px] text-slate-400">{getRelativeTime(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton Droit */}
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all border border-slate-100"
            aria-label="Next review"
          >
            &#8250;
          </button>
        </div>
      )}

      {/* MODAL FORMULAIRE ("Leave a Review") */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-slate-900">Write a Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Madalena Girao"
                  maxLength={50}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Your Review</label>
                  <span
                    className={`text-[11px] font-semibold ${
                      wordCount > MAX_WORDS ? "text-rose-600 font-bold" : "text-slate-400"
                    }`}
                  >
                    {wordCount} / {MAX_WORDS} words
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || wordCount > MAX_WORDS}
                  className="bg-[#0B132B] hover:bg-[#1C2541] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL LECTURE COMPLÈTE ("Read More") */}
      {selectedComment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center">
                  {selectedComment.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedComment.author}</h4>
                  <div className="text-amber-400 text-xs">{"★".repeat(5)}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedComment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed max-h-60 overflow-y-auto pr-2">
              {selectedComment.content}
            </p>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedComment(null)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}