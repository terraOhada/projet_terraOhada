import React, { useEffect, useState } from "react";
import useDecisions from "../hooks/useDecisions";
import type { FilterParams } from "../types";
import SearchHeader from "../components/HomePage/SearchHeader";
import AdvancedFilters from "../components/HomePage/AdvancedFilters";
import DecisionList from "../components/HomePage/DecisionList";
import { DecisionListSkeleton } from "../components/ui/DecisionSkeleton";
import { userStore } from "../store/store";
import { BetaWelcomeModal } from "../components/popups/BetaWelcomeModal";

const HomePage: React.FC = () => {
  const { user } = userStore();
  const isAuthenticated = !!user;
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const { decisions, isLoading, filters, setFilters, resetFilters } =
    useDecisions();

  const handleSearch = (searchParams: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...searchParams }));
  };

  const handleAdvancedFilter = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Clé unique pour le localStorage
  const BETA_WELCOME_KEY = "terraohada-beta-welcome-seen-v1";

  // --- LOGIQUE D'AFFICHAGE DU POPUP DE BIENVENUE ---
  useEffect(() => {
    // 1. Vérifier si l'utilisateur a déjà vu le popup
    const hasSeenPopup = localStorage.getItem(BETA_WELCOME_KEY);

    // 2. Si l'utilisateur n'est PAS connecté ET qu'il n'a PAS vu le popup
    if (!isAuthenticated && !hasSeenPopup) {
      // On ouvre la modale
      setIsBetaModalOpen(true);
    }
  }, [isAuthenticated]); // Se déclenche au chargement et si le statut de connexion change

  const handleCloseBetaModal = () => {
    // On ferme la modale
    setIsBetaModalOpen(false);
    // Et on enregistre dans le localStorage que l'utilisateur l'a vue
    localStorage.setItem(BETA_WELCOME_KEY, "true");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header avec recherche */}
          <SearchHeader onSearch={handleSearch} />

          {/* Contenu principal */}
          <div className="mt-6 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Colonne des filtres - cachée sur mobile si nécessaire */}
            <div className="lg:col-span-1">
              <AdvancedFilters
                filters={filters}
                onFilterChange={handleAdvancedFilter}
                onReset={resetFilters}
              />
            </div>

            {/* Liste des résultats */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <DecisionListSkeleton />
              ) : (
                <DecisionList decisions={decisions} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Rendu de la Modale de Bienvenue --- */}
      <BetaWelcomeModal
        isOpen={isBetaModalOpen}
        onClose={handleCloseBetaModal}
      />
    </>
  );
};

export default HomePage;
