/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { HeartOff, Eye, X, ExternalLink } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import type { IDecision } from "../../types";
import DetailItem from "../../components/ui/DetailItem";
import { motion } from "motion/react";
import { useFavorites } from "../../query";

const FavorisProfile = () => {
  const [selectedDecision, setSelectedDecision] = useState<IDecision | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    favorites,
    isLoading,
    isError,
    error,
    handleRemoveFavorite,
    isRemoving,
  } = useFavorites();

  const openModal = (decision: IDecision) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const formatSub = (text: string, taille: number = 30) => {
    return text.substring(0, taille) + "...";
  };

  if (isLoading) return <div className="text-center py-8">Chargement...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center py-8">{error?.message}</div>
    );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Mes décisions favorites
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">Aucune décision favorite</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Juridiction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Résumé
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {favorites.map(({ decision, id }) => (
                <tr key={id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">
                      {formatSub(decision.titreDecision)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{decision.juridiction}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{decision.dateDecision}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600 line-clamp-2 max-w-xs">
                      {decision.resume}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openModal(decision)}
                        className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                        aria-label="Voir les détails"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() =>
                          handleRemoveFavorite(decision.id as string)
                        }
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        aria-label="Retirer des favoris"
                      >
                        {isRemoving ? "Suppression..." : <HeartOff size={20} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modale de détails (identique à l'original) */}
      {isModalOpen && selectedDecision && (
        <div className="fixed inset-0 bg-ohada-blue-for/40 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedDecision.titreDecision}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1 transition-colors duration-200 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <DetailItem
                    label="ID Interne"
                    value={selectedDecision.idInterne}
                    // className="border-b border-gray-100 pb-2"
                  />
                  <DetailItem
                    label="Juridiction"
                    value={selectedDecision.juridiction}
                    // className="border-b border-gray-100 pb-2"
                  />
                  <DetailItem
                    label="Pays"
                    value={selectedDecision.pays}
                    // className="border-b border-gray-100 pb-2"
                  />
                </div>
                <div className="space-y-4">
                  <DetailItem
                    label="Date"
                    value={selectedDecision.dateDecision}
                    // className="border-b border-gray-100 pb-2"
                  />
                  <DetailItem
                    label="Matière"
                    value={selectedDecision.matiere}
                    // className="border-b border-gray-100 pb-2"
                  />
                  {selectedDecision.lienSource && (
                    <DetailItem
                      label="Lien source"
                      value={
                        <a
                          href={selectedDecision.lienSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline break-all transition-colors duration-200"
                        >
                          {selectedDecision.lienSource}
                        </a>
                      }
                      // className="border-b border-gray-100 pb-2"
                    />
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">
                  Résumé
                </h4>
                <div className="prose max-w-none p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <MarkdownPreview
                    source={selectedDecision.resume}
                    className="markdown-body"
                    style={{ backgroundColor: "InfoText", color: "black" }}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {selectedDecision.lienSource && (
                  <a
                    href={selectedDecision.lienSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Voir la source
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FavorisProfile;
