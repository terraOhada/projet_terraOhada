import type { IDecision, ISearchFilters } from "../types";

/**
 * Génère un tableau d'années entre deux bornes
 * @param startYear - Première année de la plage (par défaut: 2000)
 * @param endYear - Dernière année de la plage (par défaut: année courante)
 * @param reverse - Si true, génère les années en ordre décroissant (par défaut: false)
 * @returns Tableau d'années
 */
export const generateYears = (
  startYear: number = 2000,
  endYear: number = new Date().getFullYear(),
  reverse: boolean = false
): number[] => {
  const years: number[] = [];
  const start = reverse ? endYear : startYear;
  const end = reverse ? startYear : endYear;
  const step = reverse ? -1 : 1;

  // Vérification des paramètres
  if (start > end && !reverse) {
    console.warn(
      `startYear (${startYear}) > endYear (${endYear}) avec reverse=false. Retourne un tableau vide.`
    );
    return [];
  }

  for (let year = start; reverse ? year >= end : year <= end; year += step) {
    years.push(year);
  }

  return years;
};

export const normalize = (str: string = "") =>
  str
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const searchDecisions = (
  decisions: IDecision[],
  filters: ISearchFilters
): IDecision[] => {
  // Normalisation de texte pour recherche insensible à la casse/accents
  const normalize = (text: string = "") =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  return decisions.filter((decision) => {
    // 1. Filtre par année (si spécifié)
    if (filters.annee) {
      const decisionYear = new Date(decision.dateDecision).getFullYear();
      if (decisionYear !== filters.annee) return false;
    }

    // 2. Filtre par pays (si spécifié)
    if (
      filters.pays &&
      !normalize(decision.pays).includes(normalize(filters.pays))
    ) {
      return false;
    }

    // 3. Filtre par sujet juridique (si spécifié)
    if (
      filters.sujetJuridique &&
      !normalize(decision.matiere).includes(
        normalize(filters.sujetJuridique)
      ) &&
      !normalize(decision.sujet).includes(normalize(filters.sujetJuridique))
    ) {
      return false;
    }

    // 4. Recherche textuelle globale (si spécifiée)
    if (filters.query) {
      const searchTerm = normalize(filters.query);
      const inTitle = normalize(decision.titreDecision).includes(searchTerm);
      const inSummary = normalize(decision.resume).includes(searchTerm);
      const inSubject = normalize(decision.sujet).includes(searchTerm);

      if (!(inTitle || inSummary || inSubject)) return false;
    }

    // Si tous les filtres spécifiés sont satisfaits
    return true;
  });
};
