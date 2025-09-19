// client/src/components/SearchBar.tsx
import React from "react";
import type { Filters } from "../../types";

// Définition des props que le composant attend
interface SearchBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  setFilters,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Le refetching est déjà géré par Tanstack Query car les filtres changent,
    // mais on peut utiliser ce bouton pour une action de recherche explicite si besoin.
    console.log("Recherche lancée avec les filtres :", filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center"
    >
      <div className="flex-grow w-full">
        <label htmlFor="q" className="sr-only">
          Quoi ?
        </label>
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Quoi ? (Poste, mot-clé...)"
          value={filters.q}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex-grow w-full">
        <label htmlFor="location" className="sr-only">
          Où ?
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Où ? (Ville, commune...)"
          value={filters.location}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
      >
        Rechercher
      </button>
    </form>
  );
};
