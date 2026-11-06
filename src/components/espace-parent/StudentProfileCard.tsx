import { useState } from "react";
import {
  User,
  BookOpen,
  FileSpreadsheet,
  CheckCircle2,
  Share2,
  RotateCcw,
  Check,
} from "lucide-react";
import type { ParentStudentResult } from "../../types/parent";

interface StudentProfileCardProps {
  studentData: ParentStudentResult;
  onPrint: () => void;
  onReset: () => void;
}

export default function StudentProfileCard({
  studentData,
  onReset,
}: StudentProfileCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const copyDirectLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const initials = studentData.nomEleve
    ? studentData.nomEleve
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
    : "SCB";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
      {/* Profil Élève */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-6">
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-navy-deep to-navy text-gold font-display text-2xl sm:text-3xl font-bold flex items-center justify-center shadow-lg border-2 border-gold/30 shrink-0">
          {initials}
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono tracking-wide flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Dossier Validé
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-navy-mist text-navy-deep text-[11px] font-mono font-semibold">
              Année {studentData.anneeScolaire || "2026 - 2027"}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep tracking-tight">
            {studentData.nomEleve}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-soft">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-gold" />
              <span>Matricule :</span>
              <strong className="text-navy-deep font-bold">
                {studentData.matricule || "—"}
              </strong>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-gold" />
              <span>Code élève :</span>
              <strong className="text-navy-deep font-bold">
                {studentData.codeeleve || "—"}
              </strong>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-1.5">
              <FileSpreadsheet className="h-3.5 w-3.5 text-gold" />
              <span>Total évaluations :</span>
              <strong className="text-navy-deep font-bold">
                {studentData.totalNotes || studentData.notes.length}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'actions (Partage, Impression, Nouvelle Recherche) */}
      <div className="flex flex-wrap items-center gap-2.5 print:hidden border-t lg:border-t-0 pt-4 lg:pt-0">
        <button
          type="button"
          onClick={copyDirectLink}
          className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-ink text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Copier le lien direct vers ce relevé"
        >
          {copiedLink ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700">Lien copié !</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5 text-ink-soft" />
              <span>Partager</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="px-3.5 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-ink-soft text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Faire une autre recherche"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Autre élève</span>
        </button>
      </div>
    </div>
  );
}
