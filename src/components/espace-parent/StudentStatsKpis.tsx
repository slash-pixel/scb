import { TrendingUp, Award, CheckCircle2, Sparkles } from "lucide-react";
import type { StatsSummary } from "./parentUtils";
import { getMentionStyle } from "./parentUtils";

interface StudentStatsKpisProps {
  stats: StatsSummary;
}

export default function StudentStatsKpis({ stats }: StudentStatsKpisProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* KPI 1 : Moyenne générale pondérée */}
      <div className="bg-paper rounded-2xl p-4 border border-gold/20 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-ink-soft font-mono mb-1">
          <span>Moyenne Générale</span>
          <TrendingUp className="h-3.5 w-3.5 text-gold" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
            {stats.moyennePonderee !== null ? stats.moyennePonderee : "—"}
          </span>
          <span className="text-xs text-ink-soft font-mono">/ 20</span>
        </div>
        <span className="text-[10px] text-ink-soft font-mono mt-1">
          Pondérée par les coefficients
        </span>
      </div>

      {/* KPI 2 : Total Coefficients */}
      <div className="bg-paper rounded-2xl p-4 border border-gold/20 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-ink-soft font-mono mb-1">
          <span>Coefficients</span>
          <Award className="h-3.5 w-3.5 text-navy" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
            {stats.totalCoefficients}
          </span>
          <span className="text-xs text-ink-soft font-mono">points</span>
        </div>
        <span className="text-[10px] text-ink-soft font-mono mt-1">
          Sur {stats.countNotes} matière(s)
        </span>
      </div>

      {/* KPI 3 : Meilleure Performance */}
      <div className="bg-paper rounded-2xl p-4 border border-gold/20 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-ink-soft font-mono mb-1">
          <span>Point Fort</span>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
        </div>
        {stats.matiereMax ? (
          <div>
            <div className="font-bold text-sm text-navy-deep truncate">
              {stats.matiereMax.matiere}
            </div>
            <div className="font-mono text-xs font-bold text-emerald-700">
              {stats.matiereMax.note} / 20
            </div>
          </div>
        ) : (
          <span className="text-xs text-ink-soft">—</span>
        )}
        <span className="text-[10px] text-ink-soft font-mono mt-1">
          Note maximale
        </span>
      </div>

      {/* KPI 4 : Mention / Appréciation globale */}
      <div className="bg-paper rounded-2xl p-4 border border-gold/20 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-ink-soft font-mono mb-1">
          <span>Mention Globale</span>
          <Sparkles className="h-3.5 w-3.5 text-gold" />
        </div>
        <div>
          {stats.moyennePonderee !== null ? (
            <span
              className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${getMentionStyle(
                undefined,
                Number(stats.moyennePonderee)
              )}`}
            >
              {Number(stats.moyennePonderee) >= 16
                ? "Très Bien"
                : Number(stats.moyennePonderee) >= 14
                ? "Bien"
                : Number(stats.moyennePonderee) >= 12
                ? "Assez Bien"
                : Number(stats.moyennePonderee) >= 10
                ? "Passable"
                : "À encourager"}
            </span>
          ) : (
            <span className="text-xs text-ink-soft">—</span>
          )}
        </div>
        <span className="text-[10px] text-ink-soft font-mono mt-1">
          Barème officiel
        </span>
      </div>
    </div>
  );
}
