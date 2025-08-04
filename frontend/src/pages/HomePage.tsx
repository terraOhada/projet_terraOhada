import React from "react";
import useDecisions from "../hooks/useDecisions";
import type { FilterParams } from "../types";
import SearchHeader from "../components/HomePage/SearchHeader";
import AdvancedFilters from "../components/HomePage/AdvancedFilters";
import DecisionList from "../components/HomePage/DecisionList";
import { DecisionListSkeleton } from "../components/ui/DecisionSkeleton";

const HomePage: React.FC = () => {
  const { decisions, isLoading, filters, setFilters, resetFilters } =
    useDecisions();

  const handleSearch = (searchParams: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...searchParams }));
  };

  const handleAdvancedFilter = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
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
  );
};

export default HomePage;
