import type { ParentApiResponse, ParentStudentResult } from "../types/parent";

export const LOCAL_API_URL = "http://localhost:3000";
export const PROD_API_URL = "https://note-o1lo.onrender.com";

// Détection de l'URL par défaut : variable d'environnement ou localhost en dev
export const getDefaultApiBase = (): string => {
  // if (import.meta.env.VITE_API_PARENT_URL) {
  //   return import.meta.env.VITE_API_PARENT_URL;
  // }
  // En local ou par défaut, pointe sur localhost:3000
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

export interface SearchOptions {
  apiBase?: string;
  type?: "all" | "matricule" | "nom";
}

export async function getStudentNotes(
  searchTerm: string,
  options?: SearchOptions
): Promise<ParentStudentResult> {
  const trimmed = searchTerm.trim();
  if (!trimmed) {
    throw new ParentApiError("Veuillez saisir un matricule, un code élève ou un nom.", 400);
  }

  const base = options?.apiBase || getDefaultApiBase();
  const url = new URL("/api/parents/notes", base);

  const searchType = options?.type || "all";
  if (searchType === "matricule") {
    url.searchParams.set("matricule", trimmed);
  } else if (searchType === "nom") {
    url.searchParams.set("nom", trimmed);
  } else {
    // Mode global 'q'
    url.searchParams.set("q", trimmed);
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err: unknown) {
    // Si c'est un échec de connexion (ex: backend local non démarré)
    const errorMsg =
      err instanceof Error
        ? err.message
        : "Impossible de joindre le serveur de notes";
    throw new ParentApiError(
      `Connexion impossible au serveur. Assurez-vous que le service est bien démarré ou vérifiez votre connexion réseau. (${errorMsg})`,
      0
    );
  }

  if (response.status === 404) {
    throw new ParentApiError(
      `Aucun élève trouvé correspondant à "${trimmed}". Veuillez vérifier l'exactitude du matricule ou du nom.`,
      404
    );
  }

  if (response.status === 400) {
    throw new ParentApiError(
      "Paramètre de recherche invalide ou manquant. Merci de renseigner un matricule ou un nom.",
      400
    );
  }

  if (response.status === 503) {
    throw new ParentApiError(
      "Le système est en cours de chargement des relevés de notes. Veuillez patienter un instant et réessayez.",
      503
    );
  }

  if (!response.ok) {
    throw new ParentApiError(
      `Une erreur est survenue lors de la récupération des notes (Code ${response.status}).`,
      response.status
    );
  }

  const payload: ParentApiResponse = await response.json();

  if (!payload.success || !payload.data) {
    throw new ParentApiError(
      payload.message || "Aucune note disponible pour cet élève.",
      404
    );
  }

  return payload.data;
}
