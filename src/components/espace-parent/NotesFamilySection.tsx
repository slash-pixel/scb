import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import type { ParentNoteItem } from "../../types/parent";
import { formatNote, getMentionStyle, isNoteAvailable } from "./parentUtils";

interface NotesFamilySectionProps {
  family: string;
  items: ParentNoteItem[];
}

interface EvalColumnDef {
  key: keyof ParentNoteItem;
  label: string;
  shortLabel: string;
  mobileLabel: string;
}

const ALL_EVAL_COLUMNS: EvalColumnDef[] = [
  { key: "interro1", label: "Interro 1", shortLabel: "Interro 1", mobileLabel: "Interro 1" },
  { key: "interro2", label: "Interro 2", shortLabel: "Interro 2", mobileLabel: "Interro 2" },
  { key: "interro3", label: "Interro 3", shortLabel: "Interro 3", mobileLabel: "Interro 3" },
  { key: "interro4", label: "Interro 4", shortLabel: "Interro 4", mobileLabel: "Interro 4" },
  { key: "interro5", label: "Interro 5", shortLabel: "Interro 5", mobileLabel: "Interro 5" },
  { key: "moyenneInterro", label: "Moy. Interros", shortLabel: "Moy. Interro", mobileLabel: "Moy. Int." },
  { key: "devoir1", label: "Devoir 1", shortLabel: "Devoir 1", mobileLabel: "Devoir 1" },
  { key: "devoir2", label: "Devoir 2", shortLabel: "Devoir 2", mobileLabel: "Devoir 2" },
  { key: "composition", label: "Composition", shortLabel: "Compo", mobileLabel: "Compo" },
];

export default function NotesFamilySection({
  family,
  items,
}: NotesFamilySectionProps) {
  // Détection dynamique des colonnes d'évaluations disponibles pour ce groupe
  // (masque complètement toute évaluation absente, null ou non définie)
  const activeEvalColumns = useMemo(() => {
    return ALL_EVAL_COLUMNS.filter((col) =>
      items.some((item) => isNoteAvailable(item[col.key]))
    );
  }, [items]);

  // Détection de présence des colonnes de synthèse
  const hasMoyenneCoef = useMemo(
    () => items.some((item) => isNoteAvailable(item.moyenneCoef)),
    [items]
  );
  const hasRang = useMemo(
    () => items.some((item) => item.rang && item.rang.trim() !== ""),
    [items]
  );
  const hasMention = useMemo(
    () =>
      items.some(
        (item) => (item.mention && item.mention.trim() !== "") || isNoteAvailable(item.moyenneGenerale)
      ),
    [items]
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      {/* En-tête de la famille de matières */}
      <div className="bg-gradient-to-r from-navy-mist via-white to-navy-mist px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-4 w-4 text-gold" />
          <h3 className="font-display text-base sm:text-lg font-bold text-navy-deep uppercase tracking-wide">
            {family}
          </h3>
        </div>
        <span className="font-mono text-xs text-ink-soft font-semibold bg-white px-2.5 py-1 rounded-full border border-gray-200">
          {items.length} matière{items.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* VUE TABLEAU (Desktop & Tablette) avec colonnes dynamiques */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[11px] text-ink-soft uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold text-navy-deep sticky left-0 bg-gray-50 z-10">
                Matière
              </th>
              <th className="py-3.5 px-3 text-center">Trimestre</th>
              <th className="py-3.5 px-3 text-center">Coef</th>

              {/* Colonnes d'évaluation dynamiques (Interros 1-5, Moyenne, Devoirs, Compo) */}
              {activeEvalColumns.map((col) => (
                <th
                  key={col.key}
                  className="py-3.5 px-3 text-center"
                  title={col.label}
                >
                  {col.shortLabel}
                </th>
              ))}
            
              <th className="py-3.5 px-4 text-center font-bold text-navy-deep bg-blue-50/50">
                Moy. Générale
              </th>
              {hasMoyenneCoef && (
                <th className="py-3.5 px-3 text-center">Moy. Coef</th>
              )}
              {hasRang && <th className="py-3.5 px-3 text-center">Rang</th>}
              {hasMention && <th className="py-3.5 px-4 text-center">Mention</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-sans">
            {items.map((item, idx) => (
              <tr
                key={`${item.matiere}-${item.trimestre}-${idx}`}
                className="hover:bg-amber-50/40 transition-colors"
              >
                <td className="py-3.5 px-4 font-semibold text-navy-deep text-sm sticky left-0 bg-white hover:bg-amber-50/40 z-10">
                  {item.matiere}
                </td>
                <td className="py-3.5 px-3 text-center font-mono text-ink-soft whitespace-nowrap">
                  {item.trimestre || "—"}
                </td>
                <td className="py-3.5 px-3 text-center font-mono font-bold text-navy-deep">
                  {item.coefficient}
                </td>

                {/* Valeurs des évaluations dynamiques */}
                {activeEvalColumns.map((col) => {
                  const val = item[col.key];
                  const hasVal = isNoteAvailable(val);
                  return (
                    <td
                      key={col.key}
                      className="py-3.5 px-3 text-center font-mono"
                    >
                      {hasVal ? (
                        <span className="text-ink font-semibold">
                          {formatNote(val as number)}
                        </span>
                      ) : (
                        <span className="text-gray-300 select-none">—</span>
                      )}
                    </td>
                  );
                })}

                <td className="py-3.5 px-4 text-center bg-blue-50/50">
                  {isNoteAvailable(item.moyenneGenerale) ? (
                    <>
                      <span className="font-display font-bold text-base text-navy-deep">
                        {formatNote(item.moyenneGenerale)}
                      </span>
                      <span className="font-mono text-[10px] text-ink-soft ml-1">/20</span>
                    </>
                  ) : (
                    <span className="text-gray-300 font-mono select-none">—</span>
                  )}
                </td>

                {hasMoyenneCoef && (
                  <td className="py-3.5 px-3 text-center font-mono font-semibold text-navy-deep">
                    {formatNote(item.moyenneCoef)}
                  </td>
                )}

                {hasRang && (
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-navy">
                    {item.rang || "—"}
                  </td>
                )}

                {hasMention && (
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getMentionStyle(
                        item.mention,
                        item.moyenneGenerale
                      )}`}
                    >
                      {item.mention ||
                        (isNoteAvailable(item.moyenneGenerale) && item.moyenneGenerale >= 10
                          ? "Validé"
                          : "—")}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VUE MOBILE : Cartes adaptées aux smartphones avec champs conditionnels */}
      <div className="md:hidden divide-y divide-gray-100">
        {items.map((item, idx) => {
          // Filtrer uniquement les évaluations disponibles pour cette matière
          const itemAvailableEvals = ALL_EVAL_COLUMNS.filter((col) =>
            isNoteAvailable(item[col.key])
          );

          return (
            <div
              key={`mobile-${item.matiere}-${item.trimestre}-${idx}`}
              className="p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-display text-base font-bold text-navy-deep">
                    {item.matiere}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-ink-soft">
                    <span className="text-gold font-bold">Coef {item.coefficient}</span>
                    {item.trimestre && (
                      <>
                        <span>•</span>
                        <span>{item.trimestre}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-display text-lg font-bold text-navy-deep">
                    {isNoteAvailable(item.moyenneGenerale) ? (
                      <>
                        {formatNote(item.moyenneGenerale)}
                        <span className="text-xs font-mono text-ink-soft font-normal ml-0.5">
                          /20
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-300 font-mono">—</span>
                    )}
                  </div>
                  {(item.mention || isNoteAvailable(item.moyenneGenerale)) && (
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold border ${getMentionStyle(
                        item.mention,
                        item.moyenneGenerale
                      )}`}
                    >
                      {item.mention ||
                        (isNoteAvailable(item.moyenneGenerale) && item.moyenneGenerale >= 10
                          ? "Validé"
                          : "—")}
                    </span>
                  )}
                </div>
              </div>

              {/* Grille d'évaluations conditionnelles : n'affiche QUE les évaluations présentes */}
              {itemAvailableEvals.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-paper p-2.5 rounded-xl text-center text-xs font-mono">
                  {itemAvailableEvals.map((col) => (
                    <div
                      key={col.key}
                      className="bg-white/80 p-1.5 rounded-lg border border-gray-100 flex flex-col justify-center"
                    >
                      <span className="block text-[10px] text-ink-soft uppercase font-semibold">
                        {col.mobileLabel}
                      </span>
                      <strong className="text-navy-deep font-bold text-xs mt-0.5">
                        {formatNote(item[col.key] as number)}
                      </strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Synthèse : Moyenne Coef et Rang */}
              {(isNoteAvailable(item.moyenneCoef) || item.rang) && (
                <div className="flex items-center justify-between text-xs font-mono text-ink-soft pt-1 border-t border-gray-50">
                  {isNoteAvailable(item.moyenneCoef) ? (
                    <span>
                      Moyenne Coeff :{" "}
                      <strong className="text-navy-deep font-bold">
                        {formatNote(item.moyenneCoef)}
                      </strong>
                    </span>
                  ) : (
                    <span />
                  )}
                  {item.rang && (
                    <span>
                      Rang : <strong className="text-gold font-bold">{item.rang}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
