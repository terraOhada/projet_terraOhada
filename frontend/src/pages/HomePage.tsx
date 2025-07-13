import { useState, useMemo, useEffect, useCallback } from "react"; // Importez useState et useMemo

import Couverture from "../assets/images/couverture.jpeg";
import { Search } from "lucide-react";
import DecisionCard from "../components/HomePage/DecisionCard"; // Assurez-vous que le chemin est correct
import type { Decision } from "./admin/DecisionDashboard";
import { DECISION_URL } from "../api/api";
import toast from "react-hot-toast";
import { userStore } from "../store/store";

// Définissez le nombre d'éléments par page
const ITEMS_PER_PAGE = 3; // Vous pouvez ajuster ce nombre

const HomePage = () => {
  const { user } = userStore();
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDecisions = decisions;

  const totalPages = Math.ceil(filteredDecisions.length / ITEMS_PER_PAGE);

  // Utiliser useMemo pour calculer les décisions de la page actuelle
  const currentDecisions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return decisions.slice(startIndex, endIndex);
  }, [currentPage, decisions]); // Recalcule quand la page ou les filtres changent

  // Fonctions de navigation pour la pagination
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Logique pour afficher un ensemble de numéros de page
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Nombre de pages visibles dans les contrôles
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Ajuster si l'on est vers la fin pour toujours montrer 'maxPagesToShow' pages si possible
    if (
      endPage - startPage + 1 < maxPagesToShow &&
      totalPages >= maxPagesToShow
    ) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const fetchDecisions = useCallback(async () => {
    if (!user || !user.id) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${DECISION_URL}/toutes-decisions/${user.id}`
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data: Decision[] = await response.json();
      // console.log("data", data);
      setDecisions(data.data);
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

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero & Search with carousel background */}
      <section className="relative overflow-hidden bg-blue-50 py-10 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>

        <div
          className="absolute top-0 left-0 w-full h-full z-0 animate-scroll bg-repeat-x"
          style={{
            backgroundImage: `url(${Couverture})`,
            backgroundSize: "cover",
            animation: "scroll 60s linear infinite",
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-6xl max-w-4xl font-bold text-ohada-white mb-4">
            Recherche juridique des décisions de la cour OHADA
          </h1>
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="col-span-2 px-4 py-2 border border-gray-300 rounded-md w-full"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full">
                <option>Pays</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full">
                <option>Année</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full">
                <option>Sujet Juridique</option>
              </select>
              <button className="bg-ohada-blue-for hover:bg-ohada-blue-three text-white px-1 py-2 w-10 h-10 rounded-md flex items-center justify-center">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { background-position: 0 0; }
            100% { background-position: -1000px 0; }
          }
          .animate-slide-down {
            animation: slideDown 0.3s ease-out forwards;
          }
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Filters and Results */}
      <section className="py-10 px-4 md:max-w-7xl mx-auto flex flex-col md:flex-row gap-5">
        {/* Filters */}
        <div className="bg-ohada-blue-one md:w-3/12 h-96 text-ohada-white p-4 rounded shadow-sm space-y-4">
          <h4>Filtre avancé</h4>
          <div>
            <label className="block font-semibold mb-1">Pays</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Année</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Sujet juridique</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Jurisdiction</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Tags</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Droit</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Juriste</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Contrat</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div>En cours de téléchargement</div>
        ) : error ? (
          <div>Aucune donnée disponible</div>
        ) : (
          <div className="md:col-span-3 space-y-6 lg:w-9/12 md:w-9/12">
            {/* Utilisez currentDecisions ici */}
            {currentDecisions.map((item) => (
              // Assurez-vous que 'item.id' est unique, sinon utilisez 'item.titre + index'
              <DecisionCard key={item.id} decision={item} />
            ))}

            {/* Contrôles de pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap gap-y-4 justify-center items-center space-x-2 mt-8">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-200"
                >
                  Précédent
                </button>

                {/* Bouton pour la première page si pas dans les visibles */}
                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } transition-colors duration-200`}
                    >
                      1
                    </button>
                    {getPageNumbers()[0] > 2 && (
                      <span className="text-gray-600 px-2 py-2">...</span>
                    )}
                  </>
                )}

                {/* Numéros de page */}
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors duration-200`}
                  >
                    {pageNumber}
                  </button>
                ))}

                {/* Bouton pour la dernière page si pas dans les visibles */}
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] <
                      totalPages - 1 && (
                      <span className="text-gray-600 px-2 py-2">...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } transition-colors duration-200`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-200"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
