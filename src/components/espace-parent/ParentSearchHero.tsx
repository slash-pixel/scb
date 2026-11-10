import { type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  Sparkles,
  X,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { SearchHistoryItem } from "./parentUtils";

interface ParentSearchHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  history: SearchHistoryItem[];
  onSearch: (matricule: string) => void;
  onClearHistoryItem: (matricule: string, e: React.MouseEvent) => void;
  onOpenHelp: () => void;
}

export default function ParentSearchHero({
  searchTerm,
  setSearchTerm,
  loading,
  history,
  onSearch,
  onClearHistoryItem,
  onOpenHelp,
}: ParentSearchHeroProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <section className="print:hidden relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-deep text-white pt-10 pb-16 sm:pb-20 border-b border-gold/30">
      {/* Motifs géométriques décoratifs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-400 blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-soft text-xs font-semibold tracking-wider uppercase font-mono shadow-inner"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>Portail Académique des Familles</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Suivi Pédagogique &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft via-amber-200 to-gold">
              Résultats Scolaires
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Renseignez le <strong>matricule officiel</strong> de votre enfant pour
            consulter son dossier académique complet : interrogations, devoirs,
            compositions, moyennes et classements.
          </motion.p>
        </div>

        {/* BARRE DE RECHERCHE STRICTEMENT PAR MATRICULE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="relative bg-white w-full p-2.5 sm:p-3 rounded-2xl shadow-2xl border-2 border-gold/40 transition-all focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/20"
          >
            {/* Indicateur de recherche par matricule */}
            <div className="flex items-center justify-between px-2 pb-2 border-b border-gray-100 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase font-mono tracking-wider text-navy font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                Recherche par matricule élève
              </span>
              <span className="text-[11px] text-ink-soft hidden sm:inline">
                Identifiant unique sécurisé
              </span>
            </div>

            {/* Champ de saisie et bouton de validation */}
            <div className="flex items-center gap-2 mt-2 px-1 sm:px-2">
              <div className="text-gold pl-1 shrink-0">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex : 480 ou 0000000..."
                className="flex-1 min-w-0 bg-transparent px-2 py-2 text-ink text-base sm:text-base font-semibold placeholder:text-gray-400 placeholder:font-normal focus:outline-none"
                autoFocus
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                  title="Effacer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                disabled={loading || !searchTerm.trim()}
                className="px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-navy-deep font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-navy-deep border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Recherche...</span>
                  </>
                ) : (
                  <>
                    <span>Consulter</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Raccourcis et aide rapide */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-white/70 px-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold-soft text-[11px]">Exemples :</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("480");
                  onSearch("480");
                }}
                className="underline hover:text-gold transition-colors font-mono cursor-pointer"
              >
                480
              </button>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("0000000");
                  onSearch("0000000");
                }}
                className="underline hover:text-gold transition-colors font-mono cursor-pointer"
              >
                0000000
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenHelp}
              className="flex items-center gap-1 text-gold-soft hover:text-white transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Où trouver le matricule ?</span>
            </button>
          </div>

          {/* Historique des recherches récentes */}
          {history.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto text-xs py-1 scrollbar-none">
              <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="text-white/60 text-[11px] shrink-0 font-mono">Récents :</span>
              {history.map((h) => (
                <div
                  key={h.term}
                  onClick={() => {
                    setSearchTerm(h.term);
                    onSearch(h.term);
                  }}
                  className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-gold/20 text-white/90 hover:text-gold transition-all cursor-pointer shrink-0 border border-white/10"
                >
                  <span className="font-medium">
                    {h.name ? `${h.name} (${h.term})` : h.term}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => onClearHistoryItem(h.term, e)}
                    className="opacity-40 group-hover:opacity-100 hover:text-rose-400 p-0.5 rounded-full transition-opacity cursor-pointer"
                    title="Retirer de l'historique"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
