import React, { useState } from "react";
import { ChevronDown, Filter, X, Search } from "lucide-react";
import { COUNTRIES, LEGAL_SUBJECTS } from "../../data/data";
import { generateYears } from "../../utils/util";

interface FiltersProps {
  query?: string;
  pays?: string;
  annee?: number | string;
  matiere?: string;
}

const AdvancedFilterMobile: React.FC<FiltersProps> = ({
  // query,
  pays,
  annee,
  matiere,
}) => {
  const [filters, setFilters] = useState({
    country: "",
    year: "",
    legalSubject: "",
    jurisdiction: "",
    law: "",
    lawyer: "",
    contract: "",
  });

  // console.log("country :", pays);
  // console.log("country2 :", filters.country);

  // Options pour les selects avec exemples
  const options = {
    countries: [
      { value: "", label: "Sélectionnez un pays (Ex: Bénin)" },
      { value: "BJ", label: "Bénin - Droit des affaires" },
      { value: "BF", label: "Burkina Faso - Droit fiscal" },
    ],
    years: [
      { value: "", label: "Sélectionnez une année (Ex: 2023)" },
      { value: "2023", label: "2023 - Textes en vigueur" },
      { value: "2022", label: "2022 - Réformes" },
    ],
    legalSubjects: [
      { value: "", label: "Sélectionnez un sujet (Ex: Droit des sociétés)" },
      { value: "corporate", label: "Droit des sociétés - Création SARL" },
      { value: "tax", label: "Droit fiscal - Impôts" },
    ],
    jurisdictions: [
      { value: "", label: "Sélectionnez une juridiction (Ex: CCJA)" },
      { value: "ccja", label: "CCJA - Contentieux OHADA" },
      { value: "tribunal", label: "Tribunal - Litiges" },
    ],
    laws: [
      { value: "", label: "Sélectionnez un texte (Ex: Acte uniforme)" },
      { value: "au", label: "Acte uniforme - Droit commercial" },
      { value: "reg", label: "Règlement - Procédures" },
    ],
    lawyers: [
      { value: "", label: "Sélectionnez un juriste (Ex: Expert OHADA)" },
      { value: "expert", label: "Expert OHADA - Conseil" },
      { value: "attorney", label: "Avocat - Représentation" },
    ],
    contracts: [
      { value: "", label: "Sélectionnez un contrat (Ex: Commercial)" },
      { value: "com", label: "Commercial - Vente" },
      { value: "partner", label: "Partenariat - Joint-venture" },
    ],
  };

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      country: "",
      year: "",
      legalSubject: "",
      jurisdiction: "",
      law: "",
      lawyer: "",
      contract: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 mb-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
        <div className="flex items-center">
          <Filter className="mr-2 text-blue-600" size={18} />
          <h2 className="font-medium text-gray-800">Filtres avancés OHADA</h2>
        </div>
        <ChevronDown size={18} />
      </div>

      <div className="p-4 border-t border-gray-200 space-y-5">
        {/* Pays */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pays
          </label>
          <select
            value={pays}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selectionnez un pays</option>
            {COUNTRIES.map((opt, i) => (
              <option key={i} value={opt.name}>
                {opt.name} ({opt.code})
              </option>
            ))}
          </select>
        </div>

        {/* Année */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Année
          </label>
          <select
            value={annee}
            onChange={(e) => handleChange("year", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selectionnez une année</option>
            {generateYears()
              .reverse()
              .map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>

        {/* Sujet juridique */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sujet juridique
          </label>
          <select
            value={matiere}
            onChange={(e) => handleChange("legalSubject", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selectionnez un sujet juridique</option>
            {LEGAL_SUBJECTS.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name} ({opt.category})
              </option>
            ))}
          </select>
        </div>

        {/* Juridiction */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Juridiction
          </label>
          <select
            value={filters.jurisdiction}
            onChange={(e) => handleChange("jurisdiction", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {options.jurisdictions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Droit */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Droit
          </label>
          <select
            value={filters.law}
            onChange={(e) => handleChange("law", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {options.laws.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Juriste */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Juriste
          </label>
          <select
            value={filters.lawyer}
            onChange={(e) => handleChange("lawyer", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {options.lawyers.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Contrat */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contrat
          </label>
          <select
            value={filters.contract}
            onChange={(e) => handleChange("contract", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {options.contracts.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
          >
            <X className="mr-2" size={16} />
            Réinitialiser
          </button>
          <button
            onClick={() => console.log(filters)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Search className="mr-2" size={16} />
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterMobile;
