interface TrimestreFilterProps {
  trimestresList: string[];
  selectedTrimestre: string;
  onSelectTrimestre: (trimestre: string) => void;
  totalNotesCount: number;
  filteredNotesCount: number;
  notes: { trimestre?: string }[];
}

export default function TrimestreFilter({
  trimestresList,
  selectedTrimestre,
  onSelectTrimestre,
  totalNotesCount,
  filteredNotesCount,
  notes,
}: TrimestreFilterProps) {
  if (trimestresList.length === 0) return null;

  return (
    <div className="print:hidden flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3">
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        <span className="text-xs font-mono uppercase tracking-wider text-navy-deep font-semibold mr-1">
          Trimestre :
        </span>
        <button
          type="button"
          onClick={() => onSelectTrimestre("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedTrimestre === "all"
              ? "bg-navy-deep text-white shadow-md"
              : "bg-white text-ink-soft hover:bg-gray-100 hover:text-navy border border-gray-200"
          }`}
        >
          Tous les trimestres ({totalNotesCount})
        </button>

        {trimestresList.map((t) => {
          const count = notes.filter((n) => n.trimestre === t).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onSelectTrimestre(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTrimestre === t
                  ? "bg-gold text-navy-deep shadow-md font-bold"
                  : "bg-white text-ink-soft hover:bg-gray-100 hover:text-navy border border-gray-200"
              }`}
            >
              {t} ({count})
            </button>
          );
        })}
      </div>

      <div className="text-xs font-mono text-ink-soft">
        Affichage : <strong>{filteredNotesCount}</strong> ligne(s)
      </div>
    </div>
  );
}
