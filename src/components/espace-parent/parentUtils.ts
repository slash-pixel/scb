import type { ParentNoteItem } from "../../types/parent";

export interface NoteStatItem {
  matiere: string;
  note: number;
}

export interface StatsSummary {
  moyennePonderee: string | null;
  totalCoefficients: number;
  matiereMax: NoteStatItem | null;
  matiereMin: NoteStatItem | null;
  countNotes: number;
}

export interface SearchHistoryItem {
  term: string;
  name?: string;
  date: string;
}

/**
 * Détermine si une note est réellement disponible (non nulle, non indéfinie et non vide).
 */
export const isNoteAvailable = (val: unknown): val is number => {
  if (val === null || val === undefined || val === "") {
    return false;
  }
  return !Number.isNaN(Number(val));
};

/**
 * Formate une note numérique. Si la note n'existe pas (null, undefined, vide),
 * retourne "—" sans jamais afficher de "0" par défaut ni de cellule vide.
 */
export const formatNote = (val: number | null | undefined): string => {
  if (!isNoteAvailable(val)) {
    return "—";
  }
  return Number(val).toFixed(2).replace(/\.00$/, "");
};

export const getMentionStyle = (mention?: string | null, note?: number | null) => {
  const m = (mention || "").toLowerCase();
  const n = note !== null && note !== undefined ? Number(note) : null;

  if (m.includes("très bien") || (n !== null && n >= 16)) {
    return "bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-500/20";
  }
  if (m.includes("bien") || (n !== null && n >= 14)) {
    return "bg-blue-50 text-navy border-blue-300 ring-blue-500/20";
  }
  if (m.includes("assez bien") || (n !== null && n >= 12)) {
    return "bg-amber-50 text-amber-900 border-amber-300 ring-amber-500/20";
  }
  if (m.includes("passable") || (n !== null && n >= 10)) {
    return "bg-slate-100 text-slate-800 border-slate-300 ring-slate-500/20";
  }
  if (n !== null && n < 10) {
    return "bg-rose-50 text-rose-800 border-rose-300 ring-rose-500/20";
  }
  return "bg-gray-100 text-gray-700 border-gray-200";
};

export const calculateStats = (notes: ParentNoteItem[]): StatsSummary => {
  if (!notes || notes.length === 0) {
    return {
      moyennePonderee: null,
      totalCoefficients: 0,
      matiereMax: null,
      matiereMin: null,
      countNotes: 0,
    };
  }

  let totalPoints = 0;
  let totalCoeffs = 0;
  let maxNote: NoteStatItem | null = null;
  let minNote: NoteStatItem | null = null;

  notes.forEach((item) => {
    const coef = Number(item.coefficient) || 1;
    const mg = isNoteAvailable(item.moyenneGenerale) ? Number(item.moyenneGenerale) : null;

    if (mg !== null) {
      totalPoints += mg * coef;
      totalCoeffs += coef;

      if (!maxNote || mg > maxNote.note) {
        maxNote = { matiere: item.matiere, note: mg };
      }
      if (!minNote || mg < minNote.note) {
        minNote = { matiere: item.matiere, note: mg };
      }
    }
  });

  const moyennePonderee =
    totalCoeffs > 0 ? (totalPoints / totalCoeffs).toFixed(2) : null;

  return {
    moyennePonderee,
    totalCoefficients: totalCoeffs,
    matiereMax: maxNote,
    matiereMin: minNote,
    countNotes: notes.length,
  };
};
