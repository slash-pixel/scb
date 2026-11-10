export interface ParentNoteItem {
  anneeScolaire?: string;
  coefficient: number;
  composition?: number | null;
  devoir1?: number | null;
  devoir2?: number | null;
  familleMatiere?: string;
  interro1?: number | null;
  interro2?: number | null;
  interro3?: number | null;
  interro4?: number | null;
  interro5?: number | null;
  matiere: string;
  mention?: string | null;
  moyenneCoef?: number | null;
  moyenneGenerale?: number | null;
  moyenneInterro?: number | null;
  rang?: string | null;
  trimestre?: string;
}

export interface ParentStudentResult {
  anneeScolaire: string;
  codeeleve: string;
  matricule: string;
  nomEleve: string;
  notes: ParentNoteItem[];
  totalNotes: number;
}

export interface ParentApiResponse {
  success: boolean;
  data?: ParentStudentResult;
  message?: string;
  error?: string;
}
