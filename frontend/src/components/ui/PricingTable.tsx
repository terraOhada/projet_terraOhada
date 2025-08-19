// import React from 'react';

const PricingTable = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tarifs Terraohada – Abonnez-vous dès aujourd’hui
      </h1>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] md:min-w-full">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-gray-200">
            <div className="col-span-1 p-4 bg-gray-50 font-medium"></div>
            <div className="p-4 bg-blue-50 font-medium text-center">
              <h3 className="font-bold">Basique (Gratuit)</h3>
            </div>
            <div className="p-4 bg-green-50 font-medium text-center">
              <h3 className="font-bold">Premium Afrique</h3>
              <p className="text-sm">5 000 FCFA/mois ou 50 000 FCFA/an</p>
            </div>
            <div className="p-4 bg-purple-50 font-medium text-center">
              <h3 className="font-bold">Premium Europe</h3>
              <p className="text-sm">9,50 €/mois ou 89 €/an</p>
            </div>
          </div>

          {/* Table Rows */}
          {tableData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-0 border-b border-gray-200"
            >
              <div className="col-span-1 p-4 bg-gray-50 font-medium">
                {row.feature}
              </div>
              <div className="p-4 bg-white text-center">
                {renderCell(row.basique)}
              </div>
              <div className="p-4 bg-white text-center">
                {renderCell(row.premiumAfrique)}
              </div>
              <div className="p-4 bg-white text-center">
                {renderCell(row.premiumEurope)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition">
            Commencer gratuitement
          </button>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-ohada-blue-two text-white rounded-lg font-medium hover:bg-ohada-blue-for transition">
            S'abonner Premium Afrique
          </button>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-ohada-blue-for text-white rounded-lg font-medium hover:bg-ohada-blue-two transition">
            S'abonner Premium Europe
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to render cell content
const renderCell = (content: string | boolean) => {
  if (typeof content === "boolean") {
    return content ? (
      <span className="text-green-500 font-bold">Oui</span>
    ) : (
      <span className="text-gray-400">Non</span>
    );
  }
  return <span>{content}</span>;
};

// Table data
const tableData = [
  {
    feature: "Visibilité dans l'annuaire",
    basique: "Nom, pays, métier et spécialité visibles",
    premiumAfrique:
      "Profil complet avec photo, bio détaillée, expériences et domaines d'expertise",
    premiumEurope:
      "Profil complet avec photo, bio détaillée, expériences et domaines d'expertise",
  },
  {
    feature: "Coordonnées visibles",
    basique: false,
    premiumAfrique: true,
    premiumEurope: true,
  },
  {
    feature: "Liens réseaux sociaux",
    basique: false,
    premiumAfrique: true,
    premiumEurope: true,
  },
  {
    feature: "Mise en avant prioritaire",
    basique: false,
    premiumAfrique: "Oui (home + résultats de recherche)",
    premiumEurope: "Oui (home + résultats de recherche)",
  },
  {
    feature: "Badge Premium",
    basique: false,
    premiumAfrique: 'Oui ("Avocat Premium", "Juriste vérifié"...)',
    premiumEurope: 'Oui ("Avocat Premium", "Juriste vérifié"...)',
  },
  {
    feature: "Publication sur la plateforme",
    basique: false,
    premiumAfrique: "Oui (articles, analyses, événements)",
    premiumEurope: "Oui (articles, analyses, événements)",
  },
  {
    feature: "Accès à des offres exclusives",
    basique: false,
    premiumAfrique: "Oui (emplois, partenariats, appels à projets)",
    premiumEurope: "Oui (emplois, partenariats, appels à projets)",
  },
  {
    feature: "Réductions partenaires",
    basique: false,
    premiumAfrique: "Oui (formations, outils, conférences)",
    premiumEurope: "Oui (formations, outils, conférences)",
  },
];

export default PricingTable;
