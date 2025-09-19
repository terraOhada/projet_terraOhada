// client/src/components/jobs/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblings?: number;
  onPageChange: (page: number) => void;
}

// Le hook personnalisé `usePagination` ne change pas
const usePagination = ({
  totalPages,
  currentPage,
  siblings = 1,
}: PaginationProps) => {
  // ... (toute la logique de `usePagination` reste la même)
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblings * 2 + 3 + 2;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  }, [totalPages, currentPage, siblings]);

  return paginationRange;
};

// Le composant Pagination corrigé
const PaginateJob: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // --- CORRECTION ---
  // 1. On appelle TOUJOURS le hook au début du composant, sans aucune condition.
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    onPageChange,
  });

  // 2. On place la condition pour un retour anticipé APRÈS l'appel du hook.
  //    On vérifie aussi que le `paginationRange` n'est pas vide pour plus de sécurité.
  if (totalPages <= 1 || !paginationRange || paginationRange.length < 1) {
    return null;
  }

  // Le reste de la logique du composant ne change pas
  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-10 text-sm"
    >
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-3 h-9 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center"
      >
        Précédent
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (typeof pageNumber === "string") {
          return (
            <span
              key={`dots-${index}`}
              className="px-4 h-9 flex items-center justify-center border border-transparent"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`w-9 h-9 border rounded-md transition-colors ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white border-blue-600 font-bold"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 h-9 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center"
      >
        Suivant
      </button>
    </nav>
  );
};

export default PaginateJob;
