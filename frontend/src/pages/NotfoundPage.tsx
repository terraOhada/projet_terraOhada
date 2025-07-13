// src/components/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-800 p-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-blue-600 mb-4 animate-bounce-slow">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 text-center">
        Oups ! Cette page est introuvable.
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Il semble que la page que vous recherchez n'existe pas ou a été
        déplacée.
      </p>
      <Link
        to="/" // Lien vers votre page d'accueil ou tableau de bord
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
