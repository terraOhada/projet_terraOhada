/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { HeartOff, Eye, X } from "lucide-react";
import axios from "axios";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { userStore } from "../../store/store";
import { FAVORI_URL } from "../../api/api";
import type { IDecision, IFavorite } from "../../types";
import DetailItem from "../../components/ui/DetailItem";
import toast from "react-hot-toast";

const FavorisProfile = () => {
  const { user } = userStore();
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDecision, setSelectedDecision] = useState<IDecision | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer les favoris
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !user?.id) return;
      try {
        const response = await axios.get(
          `${FAVORI_URL}/toutes-favorites/${user?.id}`
        );
        // console.log("response", response);
        setFavorites(response.data);
      } catch (err: any) {
        console.log(err);
        setError(err.response?.data?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (decisionId: string) => {
    if (!user || !user.id) return;
    try {
      const response = await axios.delete(
        `${FAVORI_URL}/supprimer-favorite/${user?.id}`,
        {
          data: { decisionId },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFavorites(favorites.filter((fav) => fav.decisionId !== decisionId));
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const openModal = (decision: IDecision) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 px-4">Mes décisions favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">Aucune décision favorite</p>
      ) : (
        <div className="space-y-4 px-4">
          {favorites.map(({ decision, id }) => (
            <div
              key={id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {decision.titreDecision}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {decision.juridiction} • {decision.dateDecision}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(decision)}
                    className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                    aria-label="Voir les détails"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(decision.id as string)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    aria-label="Retirer des favoris"
                  >
                    <HeartOff size={20} />
                  </button>
                </div>
              </div>

              {decision.resume && (
                <div className="mt-3 text-gray-700">
                  <p className="line-clamp-2">{decision.resume}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modale de détails */}
      {isModalOpen && selectedDecision && (
        <div className="fixed inset-0 bg-ohada-blue-for/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">
                  {selectedDecision.titreDecision}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <DetailItem
                    label="ID Interne"
                    value={selectedDecision.idInterne}
                  />
                  <DetailItem
                    label="Juridiction"
                    value={selectedDecision.juridiction}
                  />
                  <DetailItem label="Pays" value={selectedDecision.pays} />
                </div>
                <div className="space-y-3">
                  <DetailItem
                    label="Date"
                    value={selectedDecision.dateDecision}
                  />
                  <DetailItem
                    label="Matière"
                    value={selectedDecision.matiere}
                  />
                  {selectedDecision.lienSource && (
                    <DetailItem
                      label="Lien source"
                      value={
                        <a
                          href={selectedDecision.lienSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {selectedDecision.lienSource}
                        </a>
                      }
                    />
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Résumé</h4>
                <div className="prose max-w-none p-4 bg-gray-50 rounded-md">
                  <MarkdownPreview
                    source={selectedDecision.resume}
                    style={{
                      padding: 16,
                      backgroundColor: "blue",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavorisProfile;
