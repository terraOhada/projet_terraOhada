/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { XIcon, Loader2 } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import { DECISION_URL } from "../../api/api";
import { userStore } from "../../store/store";
import axios from "axios";
import type { IDecision } from "../../types";

// --- Edit Decision Modal Component ---
interface EditDecisionModalProps {
  decision: IDecision;
  onClose: () => void;
  onDecisionUpdated: (updatedDecision: IDecision) => void;
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
          response.data.message || "Décision mise à jour avec succès !",
          {
            position: "bottom-center",
            style: {
              background: "#4BB543",
              color: "#fff",
            },
          }
        );
        onDecisionUpdated(response.data.data);
        onClose();
      } else {
        setError(response.data.message || "Erreur lors de la mise à jour.");
        toast.error(response.data.message || "Échec de la mise à jour.", {
          position: "bottom-center",
        });
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
        err.response.data.message || "Erreur réseau. Veuillez réessayer.",
        {
          position: "bottom-center",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.95, y: 20, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1 },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 + 0.2 },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-ohada-blue-for/40 bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      >
        <motion.div
          variants={modalVariants}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto border border-gray-200"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-all"
          >
            <XIcon className="h-6 w-6" />
          </motion.button>

          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-ohada-blue-one mb-6 text-center"
          >
            Modifier la décision
          </motion.h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* ID Interne */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                ID Interne <span className="text-red-500">*</span>
              </label>
              <input
                name="idInterne"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                value={formData.idInterne}
                readOnly
              />
            </motion.div>

            {/* Titre de la décision */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Titre de la décision <span className="text-red-500">*</span>
              </label>
              <textarea
                name="titreDecision"
                rows={3}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.titreDecision}
                onChange={handleChange}
              />
            </motion.div>

            {/* Juridiction */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Juridiction <span className="text-red-500">*</span>
              </label>
              <input
                name="juridiction"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.juridiction}
                onChange={handleChange}
              />
            </motion.div>

            {/* Date */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                name="date"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="Ex: 19 October 2015"
                value={formData.dateDecision}
                onChange={handleChange}
              />
            </motion.div>

            {/* Pays */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Pays <span className="text-red-500">*</span>
              </label>
              <input
                name="pays"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.pays}
                onChange={handleChange}
              />
            </motion.div>

            {/* Matière */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Matière <span className="text-red-500">*</span>
              </label>
              <input
                name="matiere"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.matiere}
                onChange={handleChange}
              />
            </motion.div>

            {/* Résumé */}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Résumé
              </label>
              <MarkdownEditor
                value={formData.resume as string}
                onChange={(value: string) =>
                  setFormData({ ...formData, resume: value })
                }
                // className="border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all"
              />
            </motion.div>

            {/* Lien source */}
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Lien source
              </label>
              <input
                name="lienSource"
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.lienSource}
                onChange={handleChange}
              />
            </motion.div>

            {/* Statut */}
            <motion.div
              custom={8}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <select
                name="statut"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.statut}
                onChange={handleChange}
              >
                <option value="">Sélectionner un statut</option>
                <option value="Validé">Validé</option>
                <option value="Incomplet">Incomplet</option>
              </select>
            </motion.div>

            {/* Article */}
            <motion.div
              custom={9}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Article
              </label>
              <input
                name="article"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.article}
                onChange={handleChange}
              />
            </motion.div>

            {/* Article mis à jour */}
            <motion.div
              custom={10}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                Article mis à jour
              </label>
              <input
                name="articleMisAjour"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.articleMisAjour}
                onChange={handleChange}
              />
            </motion.div>

            {/* Colonne 1 */}
            <motion.div
              custom={11}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <label className="block text-sm font-medium text-gray-700">
                typeDecision
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
                name="typeDecision"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={formData.typeDecision}
                onChange={handleChange}
              /> */}
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-center text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}

            <motion.div
              custom={12}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
              className="flex justify-end space-x-3 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all flex items-center justify-center min-w-[120px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    En cours...
                  </>
                ) : (
                  "Mettre à jour"
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditDecisionModal;
