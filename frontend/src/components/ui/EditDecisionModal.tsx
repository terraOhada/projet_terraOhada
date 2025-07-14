/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from "react";
import type { Decision } from "../../pages/admin/DecisionDashboard";
import toast from "react-hot-toast";
import { XIcon } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import { DECISION_URL } from "../../api/api";
import { userStore } from "../../store/store";
import axios from "axios";
import type { IDecision } from "../../types";

// --- Edit Decision Modal Component ---
interface EditDecisionModalProps {
  decision: IDecision;
  onClose: () => void;
  onDecisionUpdated: (updatedDecision: Decision) => void;
}

const EditDecisionModal: React.FC<EditDecisionModalProps> = ({
  decision,
  onClose,
  onDecisionUpdated,
}) => {
  const { user } = userStore();
  const [formData, setFormData] = useState<IDecision>(decision);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user || !user.id) {
      return;
    }

    if (
      !formData.idInterne ||
      !formData.titreDecision ||
      !formData.juridiction ||
      !formData.dateDecision ||
      !formData.pays ||
      !formData.matiere
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${DECISION_URL}/modifier-decision/${user.id}`,
        {
          updatedData: formData,
          decisionId: decision.id,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Décision mise à jour avec succès !"
        );
        onDecisionUpdated(response.data.data); // Pass updated decision to parent
        onClose(); // Close modal
      } else {
        setError(response.data.message || "Erreur lors de la mise à jour.");
        toast.error(response.data.message || "Échec de la mise à jour.");
      }
    } catch (err: any) {
      console.error(
        err.response.data.message ||
          "Erreur lors de la mise à jour des données:",
        err
      );
      setError(
        err.response.data.message ||
          "Une erreur réseau est survenue. Veuillez réessayer."
      );
      toast.error(
        err.response.data.message || "Erreur réseau. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ohada-blue-for/40 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold text-ohada-blue-one mb-6 text-center">
          Modifier la décision
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Form fields - similar to AddDecisionForm, pre-filled with decision data */}
          {/* ID Interne (often read-only for existing records) */}
          <div>
            <label
              htmlFor="edit-idInterne"
              className="block text-sm font-medium text-gray-700"
            >
              ID Interne <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-idInterne"
              name="idInterne"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
              value={formData.idInterne}
              readOnly
            />
          </div>
          {/* Titre de la décision */}
          <div>
            <label
              htmlFor="edit-titreDecision"
              className="block text-sm font-medium text-gray-700"
            >
              Titre de la décision <span className="text-red-500">*</span>
            </label>
            <textarea
              id="edit-titreDecision"
              name="titreDecision"
              rows={3}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.titreDecision}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Juridiction */}
          <div>
            <label
              htmlFor="edit-juridiction"
              className="block text-sm font-medium text-gray-700"
            >
              Juridiction <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-juridiction"
              name="juridiction"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.juridiction}
              onChange={handleChange}
            />
          </div>
          {/* Date */}
          <div>
            <label
              htmlFor="edit-date"
              className="block text-sm font-medium text-gray-700"
            >
              Date (ex: 19 October 2015) <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-date"
              name="date"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ex: 19 October 2015"
              value={formData.dateDecision}
              onChange={handleChange}
            />
          </div>
          {/* Pays */}
          <div>
            <label
              htmlFor="edit-pays"
              className="block text-sm font-medium text-gray-700"
            >
              Pays <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-pays"
              name="pays"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.pays}
              onChange={handleChange}
            />
          </div>
          {/* Matière */}
          <div>
            <label
              htmlFor="edit-matiere"
              className="block text-sm font-medium text-gray-700"
            >
              Matière <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-matiere"
              name="matiere"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.matiere}
              onChange={handleChange}
            />
          </div>
          {/* Résumé */}
          <div>
            <label
              htmlFor="edit-resume"
              className="block text-sm font-medium text-gray-700"
            >
              Résumé
            </label>
            <MarkdownEditor
              value={formData.resume as string}
              onChange={(value: string) =>
                setFormData({ ...formData, resume: value })
              }
            />
          </div>
          {/* Lien source */}
          <div>
            <label
              htmlFor="edit-lienSource"
              className="block text-sm font-medium text-gray-700"
            >
              Lien source
            </label>
            <input
              id="edit-lienSource"
              name="lienSource"
              type="url"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.lienSource}
              onChange={handleChange}
            />
          </div>
          {/* Statut */}
          <div>
            <label
              htmlFor="edit-statut"
              className="block text-sm font-medium text-gray-700"
            >
              Statut
            </label>
            <select
              id="edit-statut"
              name="statut"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.statut}
              onChange={handleChange}
            >
              <option value="">Sélectionner un statut</option>
              <option value="Validé">Validé</option>
              <option value="Incomplet">Incomplet</option>
            </select>
          </div>
          {/* Article */}
          <div>
            <label
              htmlFor="edit-article"
              className="block text-sm font-medium text-gray-700"
            >
              Article
            </label>
            <input
              id="edit-article"
              name="article"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.article}
              onChange={handleChange}
            />
          </div>
          {/* Article mis à jour */}
          <div>
            <label
              htmlFor="edit-articleMisAjour"
              className="block text-sm font-medium text-gray-700"
            >
              Article mis à jour
            </label>
            <input
              id="edit-articleMisAjour"
              name="articleMisAjour"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.articleMisAjour}
              onChange={handleChange}
            />
          </div>
          {/* Colonne 1 */}
          <div>
            <label
              htmlFor="edit-colonne1"
              className="block text-sm font-medium text-gray-700"
            >
              Colonne 1
            </label>
            <input
              id="edit-colonne1"
              name="colonne1"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={""}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDecisionModal;
