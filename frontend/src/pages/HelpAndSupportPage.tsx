// src/pages/HelpAndSupportPage.tsx
import React from "react";
import { Mail, Search, User, Lightbulb } from "lucide-react"; // Importez les icônes

const HelpAndSupportPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center border-b pb-4">
          Aide & Support
        </h1>

        {/* Section Accompagnement */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-orange-500" />
            Un accompagnement simple pour bien démarrer
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Notre solution est en version initiale (V1). Elle se concentre sur
            l’essentiel : vous permettre de rechercher facilement des décisions
            de jurisprudence OHADA via notre moteur de recherche, accessible
            depuis votre espace personnel.
          </p>
        </section>

        <hr className="border-gray-200 mb-10" />

        {/* Section Fonctionnalités disponibles */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-500" />
            Fonctionnalités disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100 flex items-start">
              <Search className="w-7 h-7 mt-1 mr-4 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-medium text-blue-800 mb-2">
                  Recherche simplifiée de jurisprudence
                </h3>
                <p className="text-blue-700">
                  Tapez un mot-clé, un pays, une juridiction ou un thème pour
                  retrouver les décisions pertinentes.
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-100 flex items-start">
              <User className="w-7 h-7 mt-1 mr-4 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-medium text-green-800 mb-2">
                  Espace personnel sécurisé
                </h3>
                <p className="text-green-700">
                  Créez un compte en quelques clics pour accéder à l’historique
                  de vos recherches et enregistrer vos contenus favoris
                  (fonctionnalité en cours de déploiement).
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-200 mb-10" />

        {/* Section Besoin d’aide ? */}
        <section className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <Mail className="w-6 h-6 mr-3 text-red-500" />
            Besoin d’aide ?
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Pour toute question liée à l’utilisation du moteur de recherche ou à
            votre espace personnel, vous pouvez nous contacter à l’adresse
            suivante :
          </p>
          <a
            href="mailto:gestion@terraohada.com"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 text-lg"
          >
            <Mail className="w-5 h-5 mr-3" />
            gestion@terraohada.com
          </a>
        </section>

        <hr className="border-gray-200 mb-10" />

        {/* Section Évolutions à venir */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Évolutions à venir
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous améliorons continuellement la plateforme. Vos retours sont
            précieux pour façonner les prochaines versions. N’hésitez pas à nous
            écrire pour partager vos suggestions ou signaler un problème.
          </p>
          <a
            href="mailto:gestion@terraohada.com"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Partagez vos suggestions
          </a>
        </section>
      </div>
    </main>
  );
};

export default HelpAndSupportPage;
