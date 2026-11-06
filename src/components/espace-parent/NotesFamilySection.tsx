import { BookOpen } from "lucide-react";
import type { ParentNoteItem } from "../../types/parent";
import { formatNote, getMentionStyle } from "./parentUtils";

interface NotesFamilySectionProps {
  family: string;
  items: ParentNoteItem[];
}

export default function NotesFamilySection({
  family,
  items,
}: NotesFamilySectionProps) {
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

      {/* VUE TABLEAU (Desktop & Tablette) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[11px] text-ink-soft uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold text-navy-deep">Matière</th>
              <th className="py-3.5 px-3 text-center">Trimestre</th>
              <th className="py-3.5 px-3 text-center">Coef</th>
              <th className="py-3.5 px-3 text-center">Interros</th>
              <th className="py-3.5 px-3 text-center">Devoir 1</th>
              <th className="py-3.5 px-3 text-center">Devoir 2</th>
              <th className="py-3.5 px-3 text-center">Compo</th>
              <th className="py-3.5 px-4 text-center font-bold text-navy-deep bg-blue-50/50">
                Moy. Générale
              </th>
              <th className="py-3.5 px-3 text-center">Moy. Coef</th>
              <th className="py-3.5 px-3 text-center">Rang</th>
              <th className="py-3.5 px-4 text-center">Mention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-sans">
            {items.map((item, idx) => (
              <tr
                key={`${item.matiere}-${item.trimestre}-${idx}`}
                className="hover:bg-amber-50/40 transition-colors"
              >
                <td className="py-3.5 px-4 font-semibold text-navy-deep text-sm">
                  {item.matiere}
                </td>
                <td className="py-3.5 px-3 text-center font-mono text-ink-soft">
                  {item.trimestre || "—"}
                </td>
                <td className="py-3.5 px-3 text-center font-mono font-bold text-navy-deep">
                  {item.coefficient}
                </td>
                <td className="py-3.5 px-3 text-center font-mono text-ink-soft">
                  {formatNote(item.moyenneInterro)}
                </td>
                <td className="py-3.5 px-3 text-center font-mono text-ink-soft">
                  {formatNote(item.devoir1)}
                </td>
                <td className="py-3.5 px-3 text-center font-mono text-ink-soft">
                  {formatNote(item.devoir2)}
                </td>
                <td className="py-3.5 px-3 text-center font-mono text-ink-soft">
                  {formatNote(item.composition)}
                </td>
                <td className="py-3.5 px-4 text-center bg-blue-50/50">
                  <span className="font-display font-bold text-base text-navy-deep">
                    {formatNote(item.moyenneGenerale)}
                  </span>
                  <span className="font-mono text-[10px] text-ink-soft ml-1">/20</span>
                </td>
                <td className="py-3.5 px-3 text-center font-mono font-semibold text-navy-deep">
                  {formatNote(item.moyenneCoef)}
                </td>
                <td className="py-3.5 px-3 text-center font-mono font-bold text-navy">
                  {item.rang || "—"}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getMentionStyle(
                      item.mention,
                      item.moyenneGenerale
                    )}`}
                  >
                    {item.mention ||
                      (item.moyenneGenerale && item.moyenneGenerale >= 10 ? "Validé" : "—")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VUE MOBILE : Cartes adaptées aux smartphones */}
      <div className="md:hidden divide-y divide-gray-100">
        {items.map((item, idx) => (
          <div key={`mobile-${item.matiere}-${item.trimestre}-${idx}`} className="p-4 space-y-3">
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

              <div className="text-right">
                <div className="font-display text-lg font-bold text-navy-deep">
                  {formatNote(item.moyenneGenerale)}
                  <span className="text-xs font-mono text-ink-soft font-normal">/20</span>
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getMentionStyle(
                    item.mention,
                    item.moyenneGenerale
                  )}`}
                >
                  {item.mention || "—"}
                </span>
              </div>
            </div>

            {/* Grille des sous-notes */}
            <div className="grid grid-cols-4 gap-2 bg-paper p-2.5 rounded-xl text-center text-xs font-mono">
              <div>
                <span className="block text-[10px] text-ink-soft uppercase">Interro</span>
                <strong className="text-ink font-semibold">
                  {formatNote(item.moyenneInterro)}
                </strong>
              </div>
              <div>
                <span className="block text-[10px] text-ink-soft uppercase">Dev. 1</span>
                <strong className="text-ink font-semibold">{formatNote(item.devoir1)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-ink-soft uppercase">Dev. 2</span>
                <strong className="text-ink font-semibold">{formatNote(item.devoir2)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-ink-soft uppercase">Compo</span>
                <strong className="text-ink font-semibold">
                  {formatNote(item.composition)}
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-ink-soft pt-1">
              <span>
                Moyenne Coeff :{" "}
                <strong className="text-navy-deep">{formatNote(item.moyenneCoef)}</strong>
              </span>
              {item.rang && (
                <span>
                  Rang : <strong className="text-gold font-bold">{item.rang}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
