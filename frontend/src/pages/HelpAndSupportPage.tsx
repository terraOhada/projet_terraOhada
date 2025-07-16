import React from "react";
import { Mail, Search, User, Lightbulb, ChevronRight } from "lucide-react";

const HelpAndSupportPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header avec fond coloré */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Aide & Support</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Nous sommes là pour vous aider à tirer le meilleur parti de notre
            plateforme
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          {/* Section Accompagnement */}
          <section className="space-y-6">
            <div className="flex items-start">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Lightbulb className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Un accompagnement simple pour bien démarrer
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Notre solution est en version initiale (V1). Elle se concentre
                  sur l'essentiel : vous permettre de rechercher facilement des
                  décisions de jurisprudence OHADA via notre moteur de
                  recherche, accessible depuis votre espace personnel.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          {/* Section Fonctionnalités disponibles */}
          <section className="space-y-8">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Fonctionnalités disponibles
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Recherche simplifiée de jurisprudence
                  </h3>
                </div>
                <p className="text-gray-600 pl-12">
                  Tapez un mot-clé, un pays, une juridiction ou un thème pour
                  retrouver les décisions pertinentes.
                </p>
              </div>

              <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    Espace personnel sécurisé
                  </h3>
                </div>
                <p className="text-gray-600 pl-12">
                  Créez un compte en quelques clics pour accéder à l'historique
                  de vos recherches et enregistrer vos contenus favoris
                  (fonctionnalité en cours de déploiement).
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          {/* Section Besoin d'aide */}
          <section className="text-center py-8 bg-blue-50 rounded-xl">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Besoin d'aide ?
              </h2>
              <p className="text-gray-600 mb-6">
                Pour toute question liée à l'utilisation du moteur de recherche
                ou à votre espace personnel, notre équipe est à votre
                disposition.
              </p>
              <a
                href="mailto:gestion@terraohada.com"
                className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contactez-nous
              </a>
            </div>
          </section>

          {/* Section Évolutions */}
          <section className="text-center pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Évolutions à venir
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Nous améliorons continuellement la plateforme. Vos retours sont
              précieux pour façonner les prochaines versions.
            </p>
            <a
              href="mailto:gestion@terraohada.com"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group"
            >
              Partagez vos suggestions
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HelpAndSupportPage;
