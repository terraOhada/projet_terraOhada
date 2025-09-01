/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { DECISION_URL } from "../../api/api";
import { userStore } from "../../store/store";
import FileUpload from "../upload/FileUpload";
import MarkdownEditor from "../ui/MarkdownEditor";

interface DecisionFormData {
  idInterne: string; // Internal ID
  titreDecision: string; // Title of the decision
  juridiction: string; // Jurisdiction
  dateDecision: string; // Date of the decision
  pays: string; // Country
  matiere: string; // Matter
  resume?: string; // Summary (optional)
  lienSource?: string; // Source link (optional)
  statut?: string; // Status (optional)
  article?: string; // Article (optional)
  articleMisAjour?: string; // Updated article (optional)
  typeDecision?: string; // Additional column (optional)
}

const AddDecision: React.FC = () => {
  const { user } = userStore();
  const [formData, setFormData] = useState<DecisionFormData>({
    idInterne: "",
    titreDecision: "",
    juridiction: "",
    dateDecision: "",
    pays: "",
    matiere: "",
    resume: "",
    lienSource: "",
    statut: "",
    article: "",
    articleMisAjour: "",
    typeDecision: "",
  });

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
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !formData.idInterne ||
      !formData.titreDecision ||
      !formData.juridiction ||
      !formData.dateDecision ||
      !formData.pays ||
      !formData.matiere ||
      !formData.typeDecision
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${DECISION_URL}/ajouter-decision/${user?.id}`,
        {
          decision: formData,
        }
      );

      if (response.data.success) {
        setLoading(false);
        toast.success(
          response.data.message || "Décision enregistrée avec succès !"
        );

        setFormData({
          // Reset form
          idInterne: "",
          titreDecision: "",
          juridiction: "",
          dateDecision: "",
          pays: "",
          matiere: "",
          resume: "",
          lienSource: "",
          statut: "",
          article: "",
          articleMisAjour: "",
          typeDecision: "",
        });
        // onDecisionAdded(); // Notify parent to refresh list
      } else {
        setError(response.data.message || "Erreur lors de l'enregistrement.");
        toast.error(response.data.message || "Échec de l'enregistrement.");
      }
    } catch (err: any) {
      console.error(
        "Erreur lors de l'envoi des données:",
        err.response.data.message
      );
      setError("Une erreur réseau est survenue. Veuillez réessayer.");
      toast.error("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-lg mx-auto">
      <h3 className="text-2xl text-center font-bold text-ohada-blue-one mb-6 md:text-start border-b border-b-ohada-blue-one pb-5">
        Ajouter une nouvelle décision
      </h3>
      <FileUpload />

      <form
        className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 md:grid-cols-3"
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        {/* ID Interne */}
        <div>
          <label
            htmlFor="idInterne"
            className="block text-sm font-medium text-gray-700"
          >
            ID Interne <span className="text-red-500">*</span>
          </label>
          <input
            id="idInterne"
            name="idInterne"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.idInterne}
            onChange={handleChange}
          />
        </div>

        {/* Titre de la décision */}
        <div className="">
          {" "}
          {/* Prend toute la largeur sur toutes les tailles */}
          <label
            htmlFor="titreDecision"
            className="block text-sm font-medium text-gray-700"
          >
            Titre de la décision <span className="text-red-500">*</span>
          </label>
          <input
            id="titreDecision"
            name="titreDecision"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.titreDecision}
            onChange={handleChange}
          />
        </div>

        {/* Juridiction */}
        <div>
          <label
            htmlFor="juridiction"
            className="block text-sm font-medium text-gray-700"
          >
            Juridiction <span className="text-red-500">*</span>
          </label>
          <input
            id="juridiction"
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
            htmlFor="dateDecision"
            className="block text-sm font-medium text-gray-700"
          >
            Date (ex: 19 October 2015) <span className="text-red-500">*</span>
          </label>
          <input
            id="dateDecision"
            name="dateDecision"
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
            htmlFor="pays"
            className="block text-sm font-medium text-gray-700"
          >
            Pays <span className="text-red-500">*</span>
          </label>
          <input
            id="pays"
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
            htmlFor="matiere"
            className="block text-sm font-medium text-gray-700"
          >
            Matière <span className="text-red-500">*</span>
          </label>
          <input
            id="matiere"
            name="matiere"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.matiere}
            onChange={handleChange}
          />
        </div>

        {/* Lien source */}
        <div>
          <label
            htmlFor="lienSource"
            className="block text-sm font-medium text-gray-700"
          >
            Lien source
          </label>
          <input
            id="lienSource"
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
            htmlFor="statut"
            className="block text-sm font-medium text-gray-700"
          >
            Statut
          </label>
          <select
            id="statut"
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
            htmlFor="article"
            className="block text-sm font-medium text-gray-700"
          >
            Article
          </label>
          <input
            id="article"
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
            htmlFor="articleMisAjour"
            className="block text-sm font-medium text-gray-700"
          >
            Article mis à jour
          </label>
          <input
            id="articleMisAjour"
            name="articleMisAjour"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.articleMisAjour}
            onChange={handleChange}
          />
        </div>

        {/* Type Décision */}
        <div>
          <label
            htmlFor="colonne1"
            className="block text-sm font-medium text-gray-700"
          >
            TypeDecision
          </label>

          <select
            name="typeDecision"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            value={formData.typeDecision}
            onChange={handleChange}
          >
            <option value="">Sélectionner un type de décision</option>
            <option value="Ordonnance">Ordonnance</option>
            <option value="Avis">Avis</option>
            <option value="Arrêt">Arrêt</option>
          </select>
          {/* <input
            id="typeDecision"
            name="typeDecision"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.typeDecision}
            onChange={handleChange}
          /> */}
        </div>

        {/* Résumé */}

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">
            Résumé (Éditeur Markdown)
          </label>
          <MarkdownEditor
            value={formData.resume as string}
            onChange={(value: string) =>
              setFormData({ ...formData, resume: value })
            }
          />
        </div>

        {error && (
          <p className="mt-2 text-center text-sm text-red-600 col-span-full">
            {error}
          </p>
        )}

        <div className="col-span-full">
          {" "}
          {/* Le bouton prend toute la largeur */}
          <button
            type="submit"
            disabled={loading}
            className="group relative md:w-[30%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enregistrement en cours...
              </>
            ) : (
              "Enregistrer la décision"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDecision;
