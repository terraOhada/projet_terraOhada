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

// --- View Decisions Component ---
const ViewDecisionsList: React.FC = () => {
  const { user } = userStore();
  const [decisions, setDecisions] = useState<IDecision[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<IDecision | null>(
    null
  ); // For editing modal

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDecisionModal, setSelectedDecisionModal] =
    useState<IDecision | null>(null);

  // Fonction pour ouvrir la modal
  const handleViewClick = (decision: IDecision) => {
    setSelectedDecisionModal(decision);
    setViewModalOpen(true);
  };

  const fetchDecisions = useCallback(async () => {
    if (!user || !user.id) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${DECISION_URL}/toutes-decisions`);
      if (!response.data.success) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      // console.log("data", data);
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

  const handleEditClick = (decision: IDecision) => {
    setSelectedDecision(decision);
  };

  const handleDeleteClick = async (decisionId: string) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cette décision ?")
    ) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${"API_BASE_URL"}/decisions/${decisionId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Décision supprimée avec succès !");
        fetchDecisions(); // Refresh the list
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de la suppression.");
        toast.error(data.message || "Échec de la suppression.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de la décision:", err);
      setError("Une erreur réseau est survenue lors de la suppression.");
      toast.error("Erreur réseau lors de la suppression.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecisionUpdated = (updatedDecision: IDecision) => {
    setDecisions((prevDecisions) =>
      prevDecisions.map((dec) =>
        dec.id === updatedDecision.id ? updatedDecision : dec
      )
    );
    setSelectedDecision(null); // Close modal
  };

  return (
    <div className="bg-white p-8 shadow-lg w-full min-h-screen mx-auto">
      <h3 className="text-2xl font-bold text-ohada-blue-one mb-6 text-start border-b pb-10">
        Décisions ajoutées
      </h3>
      {loading && (
        <p className="text-center text-gray-600">Chargement des décisions...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && decisions.length === 0 && !error && (
        <p className="text-center text-gray-600">
          Aucune décision n'a été ajoutée pour le moment.
        </p>
      )}
      <div className="space-y-4">
        {decisions.map((decision) => (
          <div
            key={decision.id}
            className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-1 mb-3 md:mb-0">
              <h4 className="text-lg font-semibold text-blue-700">
                {decision.titreDecision}
              </h4>
              <p className="text-sm text-gray-600">
                ID: {decision.idInterne} | Pays: {decision.pays} | Juridiction:{" "}
                {decision.juridiction}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {decision.resume}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(decision)}
                className="p-2 bg-ohada-blue-two text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 flex items-center"
                title="Modifier"
              >
                <EditIcon className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">Modifier</span>
              </button>
              <button
                onClick={() => handleDeleteClick(decision.id as string)}
                className="p-2 bg-ohada-blue-three text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center"
                title="Supprimer"
              >
                <Trash2Icon className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">Supprimer</span>
              </button>
              <button
                onClick={() => handleViewClick(decision)}
                className="p-2 bg-ohada-blue-for text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                title="Voir"
              >
                <EyeIcon className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">Voir</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDecision && (
        <EditDecisionModal
          decision={selectedDecision}
          onClose={() => setSelectedDecision(null)}
          onDecisionUpdated={handleDecisionUpdated}
        />
      )}

      {/* Modal de visualisation */}
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
