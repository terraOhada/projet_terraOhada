// client/src/components/FilterSidebar.tsx
import React from "react";
import type { Filters } from "../../types";

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

// Données pour les filtres. Dans une vraie application, elles pourraient venir d'une API.
const contractOptions = ["CDI", "CDD", "Stage", "Freelance"];
const experienceOptions = ["Débutant", "1-3 ans", "3-5 ans", "+5 ans"];
const remoteOptions = ["Oui", "Hybride", "Non"];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
}) => {
  const handleMultiCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: keyof Filters
  ) => {
    const { value, checked } = e.target;
    const currentValues = filters[filterKey] as string[];

    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((item) => item !== value);
    }

    setFilters((prev) => ({ ...prev, [filterKey]: newValues }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4 lg:w-1/5 h-fit">
      <h3 className="text-xl font-bold mb-4">Filtres</h3>

      {/* Type de contrat */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Type de contrat</h4>
        {contractOptions.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 text-gray-700"
          >
            <input
              type="checkbox"
              value={option}
              checked={filters.contract.includes(option)}
              onChange={(e) => handleMultiCheckboxChange(e, "contract")}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* --- AJOUT : Niveau d'expérience --- */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Niveau d'expérience</h4>
        {experienceOptions.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 text-gray-700"
          >
            <input
              type="checkbox"
              value={option}
              checked={filters.experience.includes(option)}
              onChange={(e) => handleMultiCheckboxChange(e, "experience")}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* --- AJOUT : Télétravail --- */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Télétravail</h4>
        {remoteOptions.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 text-gray-700"
          >
            <input
              type="checkbox"
              value={option}
              checked={filters.remote.includes(option)}
              onChange={(e) => handleMultiCheckboxChange(e, "remote")}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* Date de publication */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Date de publication</h4>
        <div className="flex flex-col">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="date"
              value=""
              checked={filters.date === ""}
              onChange={handleRadioChange}
            />
            <span>Toutes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="date"
              value="24h"
              checked={filters.date === "24h"}
              onChange={handleRadioChange}
            />
            <span>Dernières 24h</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="date"
              value="7d"
              checked={filters.date === "7d"}
              onChange={handleRadioChange}
            />
            <span>Dernière semaine</span>
          </label>
        </div>
      </div>
    </aside>
  );
};
