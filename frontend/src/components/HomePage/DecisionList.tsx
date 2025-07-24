import React, { useState } from "react";
import type { IDecision } from "../../types";
import { useNavigate } from "react-router-dom";

interface DecisionListProps {
  decisions: IDecision[];
  itemsPerPage?: number;
}

const DecisionList: React.FC<DecisionListProps> = ({
  decisions,
  itemsPerPage = 3,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  if (decisions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Aucune décision trouvée
        </h3>
        <p className="mt-1 text-gray-500">
          Essayez de modifier vos critères de recherche.
        </p>
      </div>
    );
  }

  // Calcul des données paginées
  const totalPages = Math.ceil(decisions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDecisions = decisions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Gestion du changement de page
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleNavigateToDecision = (decision: IDecision) => {
    navigate(`/decisions/${decision.id}`, { state: { item: decision } });
  };

  return (
    <div className="space-y-6 ">
      {/* Liste des décisions */}
      <div className="space-y-4">
        {paginatedDecisions.map((decision) => (
          <div
            key={decision.id}
            className="bg-white rounded-lg border-t-3 border-ohada-blue-for shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-blue-600">
                  {decision.idInterne}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {decision.pays}
                </span>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Date :</span>{" "}
                  {decision.dateDecision}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Statut :</span>{" "}
                  {decision.statut}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Matière :</span>{" "}
                  {decision.matiere}
                </p>
              </div>

              <p className="mt-3 text-gray-700 line-clamp-2">
                {decision.resume}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {decision.juridiction}
                </span>
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => handleNavigateToDecision(decision)}
                >
                  Lire la décision →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-sm text-gray-500">
            Affichage {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, decisions.length)} sur{" "}
            {decisions.length} décisions
          </div>

          <div className="flex gap-1">
            {/* Bouton Précédent */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              &larr; Précédent
            </button>

            {/* Pages numérotées */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Bouton Suivant */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Suivant &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionList;
