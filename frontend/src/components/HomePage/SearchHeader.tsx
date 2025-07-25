import React, { useState } from "react";
import type { FilterParams } from "../../types";
import { COUNTRIES } from "../../data/data";
import { generateAllYears } from "../../utils/util";
import Couverture from "../../assets/images/couverture.jpeg";

interface SearchHeaderProps {
  onSearch: (params: Pick<FilterParams, "query" | "year" | "country">) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    query: "",
    year: "",
    country: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  return (
    <div
      className="relative border p-4 md:p-8 h-[400px] lg:h-[300px]"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundSize: "cover",
        animation: "scroll 60s linear infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-0 opacity-50"></div>

      <div className="absolute inset-x-5 md:inset-x-10 z-20 bg-white/80 p-4 md:p-6 rounded-lg shadow-sm mb-6 border">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Rechercher...</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Barre de recherche principale */}
          <div className="relative">
            <input
              type="text"
              name="query"
              placeholder="Rechercher une décision, un texte juridique..."
              className="w-full p-3 pl-10 border border-ohada-blue-for rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={localFilters.query}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filtres rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pays */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pays
              </label>
              <select
                id="country"
                name="country"
                className="w-full p-2 border border-ohada-blue-for rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={localFilters.country}
                onChange={handleChange}
              >
                <option value="">Tous les pays</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Année */}
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Année
              </label>
              <select
                id="year"
                name="year"
                className="w-full p-2 border border-ohada-blue-for rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={localFilters.year}
                onChange={handleChange}
              >
                <option value="">Toutes années</option>
                {generateAllYears()
                  .reverse()
                  .map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>

            {/* Bouton */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
              >
                Appliquer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchHeader;
