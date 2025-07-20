import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Filter, X } from "lucide-react";

const AdvancedFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    year: "",
    legalSubject: "",
    jurisdiction: "",
    tags: [],
    law: "",
    lawyer: "",
    contract: "",
  });

  const countries = [
    "Bénin",
    "Burkina Faso",
    "Cameroun" /* autres pays OHADA */,
  ];
  const legalSubjects = [
    "Droit des sociétés",
    "Droit fiscal" /* autres sujets */,
  ];
  const jurisdictions = ["Cour Commune", "Tribunal Régional" /* autres */];
  const tags = ["OHADA", "Commerce", "Fiscalité" /* autres tags */];

  const handleFilterChange = (field: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      country: "",
      year: "",
      legalSubject: "",
      jurisdiction: "",
      tags: [],
      law: "",
      lawyer: "",
      contract: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold flex items-center">
          <Filter className="mr-2" size={20} />
          Filtre avancé
        </h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tous les pays</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Année */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Année
              </label>
              <input
                type="number"
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="2023"
              />
            </div>

            {/* Sujet juridique */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet juridique
              </label>
              <select
                value={filters.legalSubject}
                onChange={(e) =>
                  handleFilterChange("legalSubject", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tous les sujets</option>
                {legalSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Juridiction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Juridiction
              </label>
              <select
                value={filters.jurisdiction}
                onChange={(e) =>
                  handleFilterChange("jurisdiction", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes juridictions</option>
                {jurisdictions.map((jur) => (
                  <option key={jur} value={jur}>
                    {jur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deuxième ligne de filtres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <select
                multiple
                value={filters.tags}
                onChange={(e) =>
                  handleFilterChange(
                    "tags",
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md h-[42px]"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Droit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Droit
              </label>
              <input
                type="text"
                value={filters.law}
                onChange={(e) => handleFilterChange("law", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Référence légale"
              />
            </div>

            {/* Juriste */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Juriste
              </label>
              <input
                type="text"
                value={filters.lawyer}
                onChange={(e) => handleFilterChange("lawyer", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nom du juriste"
              />
            </div>

            {/* Contrat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contrat
              </label>
              <input
                type="text"
                value={filters.contract}
                onChange={(e) => handleFilterChange("contract", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type de contrat"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={resetFilters}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <X className="mr-2" size={16} />
              Réinitialiser
            </button>
            <button
              onClick={() => console.log("Filtres appliqués:", filters)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Search className="mr-2" size={16} />
              Appliquer les filtres
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
