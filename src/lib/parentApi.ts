import type { ParentApiResponse, ParentStudentResult } from "../types/parent";

export const LOCAL_API_URL = "http://localhost:3000";
export const PROD_API_URL = "https://note-o1lo.onrender.com";

// Détection de l'URL par défaut : variable d'environnement ou localhost en dev
export const getDefaultApiBase = (): string => {
  // if (import.meta.env.VITE_API_PARENT_URL) {
  //   return import.meta.env.VITE_API_PARENT_URL;
  // }
  return PROD_API_URL;
};

export class ParentApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "ParentApiError";
    this.statusCode = statusCode;
  }
}

/**
 * Récupère le relevé de notes d'un élève via son matricule officiel uniquement.
 * Appel : /api/parents/notes?matricule={matricule}
 */
export async function getStudentNotes(
  matricule: string,
  apiBase?: string
): Promise<ParentStudentResult> {
  const trimmed = matricule.trim();
  if (!trimmed) {
    throw new ParentApiError("Veuillez saisir le matricule de l'élève.", 400);
  }

  const base = apiBase || getDefaultApiBase();
  const url = new URL("/api/parents/notes", base);
  url.searchParams.set("matricule", trimmed);

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch {
    // Sécurité : masque complètement l'URL, les ports et les stack traces techniques
    throw new ParentApiError(
      "Impossible de joindre le serveur de notes. Veuillez vérifier votre connexion Internet et réessayer dans quelques instants.",
      0
    );
  }

  if (response.status === 404) {
    throw new ParentApiError(
      `Aucun élève trouvé avec le matricule "${trimmed}". Veuillez vérifier l'exactitude du matricule saisi.`,
      404
    );
  }

  if (response.status === 400) {
    throw new ParentApiError(
      "Le matricule renseigné est invalide ou manquant. Merci de vérifier votre saisie.",
      400
    );
  }

  if (response.status === 503) {
    throw new ParentApiError(
      "Le service des notes est temporairement en cours d'actualisation. Veuillez patienter un instant et réessayez.",
      503
    );
  }

  if (!response.ok) {
    throw new ParentApiError(
      "Une erreur est survenue lors de la récupération des notes. Veuillez réessayer ultérieurement.",
      response.status
    );
  }

  let payload: ParentApiResponse;
  try {
    payload = await response.json();
  } catch {
    throw new ParentApiError(
      "Format de réponse inattendu. Veuillez réessayer ultérieurement.",
      500
    );
  }

  if (!payload.success || !payload.data) {
    throw new ParentApiError(
      payload.message || "Aucune note disponible pour cet élève.",
      404
    );
  }

  return payload.data;
}
