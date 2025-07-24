/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import EditDecisionModal from "../ui/EditDecisionModal";
import { DECISION_URL } from "../../api/api";
import { userStore } from "../../store/store";
import { useCallback } from "react";
import ViewDecisionModal from "../ui/ViewDecisionModal";
import axios from "axios";
import type { IDecision } from "../../types";

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

  const fetchDecisions = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${DECISION_URL}/toutes-decisions`);
      if (!response.data.success)
        throw new Error(`Erreur HTTP: ${response.status}`);
      setDecisions(response.data.data);
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
    return text.substring(0, taille) + "...";
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm w-full min-h-screen">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900">Décisions ajoutées</h3>
        <p className="mt-1 text-sm text-gray-500">
          Liste complète des décisions juridiques disponibles
        </p>
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

      {!loading && decisions.length === 0 && !error && (
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
            Aucune décision
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucune décision n'a été ajoutée pour le moment.
          </p>
        </div>
      )}

      {!loading && decisions.length > 0 && (
        <div className="overflow-x-auto">
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
                {decisions.map((decision) => (
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
