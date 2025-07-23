// import React from "react";

const NoDataAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 text-center">
      {/* SVG Illustration */}
      <svg
        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mb-6 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3h18v18H3z" strokeWidth="1.5" />
        <path d="M8 8h8v8H8z" />
        <path d="M8 8v8" />
        <path d="M16 8v8" />
        <path d="M8 16h8" />
        <path d="M8 8h8" />
        <path d="M12 12v4" />
        <path d="M12 8v4" />
      </svg>

      {/* Message */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
        Aucune donnée disponible
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        Nous n'avons trouvé aucun résultat correspondant à votre recherche.
      </p>

      {/* Bouton d'action optionnel */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => {
          // Action à implémenter
          console.log("Action clicked");
        }}
      >
        Réessayer
      </button>

      {/* Variante avec icône */}
      <div className="mt-8 flex items-center justify-center text-gray-400">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm">
          Vous pouvez modifier vos critères de recherche
        </span>
      </div>
    </div>
  );
};

export default NoDataAvailable;
