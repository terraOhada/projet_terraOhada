import React from "react";
import type { FilterParams } from "../../types";
import { SUJETS_JURIDIQUES } from "../../data/data";

interface AdvancedFiltersProps {
  filters: FilterParams;
  onFilterChange: (newFilters: Partial<FilterParams>) => void;
  onReset: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Filtres avancés OHADA
      </h2>

      <div className="space-y-4">
        {/* Sujet juridique */}
        <div>
          <label
            htmlFor="legalSubject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sujet juridique
          </label>
          <select
            id="legalSubject"
            name="legalSubject"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filters.legalSubject || ""}
            onChange={handleChange}
          >
            <option value="">Sélectionnez un sujet juridique</option>
            {SUJETS_JURIDIQUES.map((juridiction, i) => (
              <option key={i} value={juridiction}>
                {juridiction.substring(0, 30) + "..."}
              </option>
            ))}
          </select>
        </div>

        {/* Juridiction */}
        <div>
          <label
            htmlFor="jurisdiction"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Juridiction
          </label>
          <select
            id="jurisdiction"
            name="jurisdiction"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filters.jurisdiction || ""}
            onChange={handleChange}
          >
            <option value="">Sélectionnez une juridiction</option>
            <option value="CCJA">CCJA</option>
            <option value="Cour suprême">Cour suprême</option>
            <option value="Tribunal commerce">Tribunal de commerce</option>
          </select>
        </div>

        {/* Texte de droit */}
        <div>
          <label
            htmlFor="legalText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Texte juridique
          </label>
          <select
            id="legalText"
            name="legalText"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filters.legalText || ""}
            onChange={handleChange}
          >
            <option value="">Sélectionnez un texte</option>
            <option value="Acte uniforme">Acte uniforme</option>
            <option value="Code OHADA">Code OHADA</option>
            <option value="Règlement">Règlement</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition duration-200"
          >
            Réinitialiser
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
