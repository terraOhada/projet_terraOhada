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
