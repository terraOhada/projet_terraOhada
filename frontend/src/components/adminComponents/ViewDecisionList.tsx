/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import {
  EditIcon,
  EyeIcon,
  SearchIcon,
  Trash2Icon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import EditDecisionModal from "../ui/EditDecisionModal";
import { DECISION_URL } from "../../api/api";
import { userStore } from "../../store/store";
import ViewDecisionModal from "../ui/ViewDecisionModal";
import axios from "axios";
import type { IDecision } from "../../types";

const ITEMS_PER_PAGE = 10; // Nombre d'éléments par page

const ViewDecisionsList: React.FC = () => {
  const { user } = userStore();
  const [decisions, setDecisions] = useState<IDecision[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<IDecision | null>(
    null
  );
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDecisionModal, setSelectedDecisionModal] =
    useState<IDecision | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDecisions = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${DECISION_URL}/toutes-decisions`);
      if (!response.data.success)
        throw new Error(`Erreur HTTP: ${response.status}`);
      setDecisions(response.data.data);
      setCurrentPage(1); // Réinitialiser à la première page après un nouveau chargement
    } catch (err) {
      console.error("Erreur lors du chargement des décisions:", err);
      setError("Impossible de charger les décisions. Veuillez réessayer.");
      toast.error("Erreur lors du chargement des décisions.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDecisions();
  }, [fetchDecisions]);

  const filteredDecisions = useMemo(() => {
    if (!searchTerm) return decisions;

    const term = searchTerm.toLowerCase();
    return decisions.filter(
      (decision) =>
        decision.idInterne?.toLowerCase().includes(term) ||
        decision.titreDecision?.toLowerCase().includes(term) ||
        decision.pays?.toLowerCase().includes(term)
    );
  }, [decisions, searchTerm]);

  // Calcul des données paginées
  const paginatedDecisions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDecisions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDecisions, currentPage]);

  const totalPages = Math.ceil(filteredDecisions.length / ITEMS_PER_PAGE);

  const handleViewClick = (decision: IDecision) => {
    setSelectedDecisionModal(decision);
    setViewModalOpen(true);
  };

  const handleEditClick = (decision: IDecision) => {
    setSelectedDecision(decision);
  };

  const handleDeleteClick = async (decisionId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette décision ?"))
      return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `${DECISION_URL}/decisions/${decisionId}`
      );
      if (response.data.success) {
        toast.success("Décision supprimée avec succès !");
        fetchDecisions();
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      console.error("Erreur lors de la suppression:", err);
      toast.error(err.response?.data?.message || "Échec de la suppression.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecisionUpdated = (updatedDecision: IDecision) => {
    setDecisions((prev) =>
      prev.map((dec) => (dec.id === updatedDecision.id ? updatedDecision : dec))
    );
    setSelectedDecision(null);
  };

  const substringText = (text: string, taille: number = 20) => {
    return text?.substring(0, taille) + (text?.length > taille ? "..." : "");
  };

  // Fonctions de pagination
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  const firstPage = () => goToPage(1);
  const lastPage = () => goToPage(totalPages);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm w-full min-h-screen">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Décisions ajoutées
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Liste complète des décisions juridiques disponibles
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
              }}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && filteredDecisions.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? "Aucun résultat trouvé" : "Aucune décision"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Essayez avec d'autres termes de recherche"
              : "Aucune décision n'a été ajoutée pour le moment."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Réinitialiser la recherche
            </button>
          )}
        </div>
      )}

      {!loading && filteredDecisions.length > 0 && (
        <>
          <div className="overflow-x-auto mb-4">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Titre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                    >
                      Référence
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                    >
                      Juridiction
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Pays
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDecisions.map((decision) => (
                    <tr key={decision.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {substringText(decision.titreDecision)}
                            </div>
                            <div className="text-sm text-gray-500 sm:hidden">
                              {decision.juridiction}, {decision.pays}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {decision.idInterne}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {decision.juridiction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {decision.pays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewClick(decision)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                            title="Voir"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditClick(decision)}
                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-yellow-50"
                            title="Modifier"
                          >
                            <EditIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(decision.id as string)
                            }
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                            title="Supprimer"
                          >
                            <Trash2Icon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  à{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredDecisions.length
                    )}
                  </span>{" "}
                  sur{" "}
                  <span className="font-medium">
                    {filteredDecisions.length}
                  </span>{" "}
                  résultats
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={firstPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Première page</span>
                    <ChevronsLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Précédent</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Affichage des numéros de page */}
                  {Array.from({ length: Math.min(5, totalPages) }).map(
                    (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Suivant</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={lastPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Dernière page</span>
                    <ChevronsRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedDecision && (
        <EditDecisionModal
          decision={selectedDecision}
          onClose={() => setSelectedDecision(null)}
          onDecisionUpdated={handleDecisionUpdated}
        />
      )}

      {viewModalOpen && selectedDecisionModal && (
        <ViewDecisionModal
          decision={selectedDecisionModal}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ViewDecisionsList;
