import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "../components/navket";
import Footer from "../components/Footer";
import {
  getStudentNotes,
  LOCAL_API_URL,
  ParentApiError,
} from "../lib/parentApi";
import type { ParentStudentResult, ParentNoteItem } from "../types/parent";
import {
  ParentSearchHero,
  StudentProfileCard,
  StudentStatsKpis,
  TrimestreFilter,
  NotesFamilySection,
  ParentHomeGuide,
  ParentHelpModal,
  ParentErrorAlert,
  ParentLoadingState,
  PrintHeader,
  PrintFooter,
  calculateStats,
  type SearchHistoryItem,
} from "../components/espace-parent";

export default function EspaceParentPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Entrée de recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilterType, setSearchFilterType] = useState<"all" | "matricule" | "nom">("all");

  // Choix du serveur (localhost:3000 par défaut, fallback vers Render)
  const [apiServer, setApiServer] = useState<string>(() => {
    return localStorage.getItem("scb_parent_api_server") || LOCAL_API_URL;
  });

  // États de données
  const [studentData, setStudentData] = useState<ParentStudentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  // Filtre trimestre
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>("all");

  // Historique des recherches dans localStorage
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem("scb_parent_search_history");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modal d'aide
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Synchronisation avec l'URL (si un parent arrive avec ?matricule=... ou ?q=...)
  useEffect(() => {
    const qParam =
      searchParams.get("q") || searchParams.get("matricule") || searchParams.get("nom");
    if (qParam && !studentData && !loading) {
      setSearchTerm(qParam);
      const activeType = searchParams.get("matricule")
        ? "matricule"
        : searchParams.get("nom")
        ? "nom"
        : "all";
      setSearchFilterType(activeType);
      performSearch(qParam, { type: activeType });
    }
  }, [searchParams]);

  // Sauvegarde du serveur sélectionné
  const handleServerChange = (newServer: string) => {
    setApiServer(newServer);
    localStorage.setItem("scb_parent_api_server", newServer);
  };

  // Exécution de la recherche
  const performSearch = async (
    termToSearch: string,
    options?: { type?: "all" | "matricule" | "nom"; overrideServer?: string }
  ) => {
    const term = termToSearch.trim();
    if (!term) {
      setError("Veuillez renseigner un matricule, code élève ou nom.");
      setErrorCode(400);
      return;
    }

    setLoading(true);
    setError(null);
    setErrorCode(null);

    const activeType = options?.type || searchFilterType;
    const serverToUse = options?.overrideServer || apiServer;

    try {
      const result = await getStudentNotes(term, {
        apiBase: serverToUse,
        type: activeType,
      });

      setStudentData(result);
      setSelectedTrimestre("all");

      // Mise à jour de l'URL pour partage facile
      if (activeType === "matricule") {
        setSearchParams({ matricule: term });
      } else if (activeType === "nom") {
        setSearchParams({ nom: term });
      } else {
        setSearchParams({ q: term });
      }

      // Enregistrement dans l'historique
      saveToHistory(term, result.nomEleve);
    } catch (err) {
      setStudentData(null);
      if (err instanceof ParentApiError) {
        setError(err.message);
        setErrorCode(err.statusCode);
      } else if (err instanceof Error) {
        setError(err.message);
        setErrorCode(500);
      } else {
        setError("Une erreur inattendue est survenue.");
        setErrorCode(500);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (term: string, studentName?: string) => {
    try {
      const current = history.filter((h) => h.term.toLowerCase() !== term.toLowerCase());
      const updated: SearchHistoryItem[] = [
        {
          term,
          name: studentName,
          date: new Date().toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          }),
        },
        ...current,
      ].slice(0, 5);

      setHistory(updated);
      localStorage.setItem("scb_parent_search_history", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearHistoryItem = (termToClear: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((h) => h.term !== termToClear);
    setHistory(updated);
    localStorage.setItem("scb_parent_search_history", JSON.stringify(updated));
  };

  // Liste des trimestres disponibles dans les notes
  const trimestresList = useMemo(() => {
    if (!studentData?.notes) return [];
    const set = new Set<string>();
    studentData.notes.forEach((n) => {
      if (n.trimestre) set.add(n.trimestre);
    });
    return Array.from(set).sort();
  }, [studentData]);

  // Notes filtrées selon le trimestre actif
  const filteredNotes = useMemo(() => {
    if (!studentData?.notes) return [];
    if (selectedTrimestre === "all") return studentData.notes;
    return studentData.notes.filter((n) => n.trimestre === selectedTrimestre);
  }, [studentData, selectedTrimestre]);

  // Regroupement par famille de matière
  const notesByFamily = useMemo(() => {
    const groups: Record<string, ParentNoteItem[]> = {};
    filteredNotes.forEach((n) => {
      const family = n.familleMatiere?.trim() || "Matières Générales";
      if (!groups[family]) groups[family] = [];
      groups[family].push(n);
    });
    return groups;
  }, [filteredNotes]);

  // Statistiques calculées (moyenne pondérée, min, max, total coefs)
  const stats = useMemo(() => calculateStats(filteredNotes), [filteredNotes]);

  // Déclencheur impression
  const handlePrint = () => {
    window.print();
  };

  // Réinitialisation pour rechercher un autre élève
  const handleReset = () => {
    setStudentData(null);
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper font-body text-ink antialiased selection:bg-gold/20 selection:text-navy-deep">
      {/* Header global avec navbar & ticker (masqué à l'impression) */}
      <div className="print:hidden">
        <AppLayout />
      </div>

      {/* ZONE D'IMPRESSION : En-tête officiel visible uniquement à l'impression */}
      <PrintHeader anneeScolaire={studentData?.anneeScolaire} />

      <main className="flex-1">
        {/* HERO BANNER & CONSOLE DE RECHERCHE */}
        <ParentSearchHero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchFilterType={searchFilterType}
          setSearchFilterType={setSearchFilterType}
          apiServer={apiServer}
          onServerChange={handleServerChange}
          loading={loading}
          history={history}
          onSearch={performSearch}
          onClearHistoryItem={clearHistoryItem}
          onOpenHelp={() => setShowHelpModal(true)}
        />

        {/* CORPS DE PAGE : RÉSULTATS, ERREURS OU GUIDES */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* ÉTAT : ERREUR */}
          <AnimatePresence>
            {error && (
              <ParentErrorAlert
                error={error}
                errorCode={errorCode}
                apiServer={apiServer}
                onServerChange={handleServerChange}
                onRetry={() => performSearch(searchTerm)}
                onOpenHelp={() => setShowHelpModal(true)}
              />
            )}
          </AnimatePresence>

          {/* ÉTAT : CHARGEMENT */}
          {loading && <ParentLoadingState apiServer={apiServer} />}

          {/* ÉTAT : RÉSULTAT OBTENU AVEC SUCCÈS */}
          {!loading && studentData && (
            <div className="space-y-8">
              {/* CARTE D'IDENTITÉ DE L'ÉLÈVE & ACTIONS */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
                <StudentProfileCard
                  studentData={studentData}
                  onPrint={handlePrint}
                  onReset={handleReset}
                />
                <StudentStatsKpis stats={stats} />
              </div>

              {/* BARRE D'ONGLETS / FILTRES PAR TRIMESTRE */}
              <TrimestreFilter
                trimestresList={trimestresList}
                selectedTrimestre={selectedTrimestre}
                onSelectTrimestre={setSelectedTrimestre}
                totalNotesCount={studentData.notes.length}
                filteredNotesCount={filteredNotes.length}
                notes={studentData.notes}
              />

              {/* RELEVÉ DES NOTES : TABLEAU DÉTAILLÉ PAR FAMILLE */}
              <div className="space-y-8">
                {Object.entries(notesByFamily).map(([family, items]) => (
                  <NotesFamilySection key={family} family={family} items={items} />
                ))}
              </div>

              {/* PIED DE BULLETIN OFFICIEL (VISIBLE À L'IMPRESSION) */}
              <PrintFooter />
            </div>
          )}

          {/* ÉTAT : ACCUEIL SANS RECHERCHE (GUIDE & INFORMATIONS) */}
          {!loading && !studentData && !error && <ParentHomeGuide />}
        </section>
      </main>

      {/* MODAL D'AIDE IDENTIFIANTS */}
      <ParentHelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

      {/* Footer global (masqué à l'impression) */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
