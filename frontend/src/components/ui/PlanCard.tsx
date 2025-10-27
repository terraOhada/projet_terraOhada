// import React from 'react';
// Assurez-vous d'importer les types depuis votre fichier central de types

import type { IPlan, PaidPlan } from "../../types";

interface PlanCardProps {
  plan: IPlan;
  alternatePlan?: PaidPlan;
  isPopular?: boolean;
  onSelect: (flutterwaveId: number) => void;
}

/**
 * Affiche le prix formaté en fonction du type de plan et de la devise alternative.
 */
const PlanPrice = ({
  plan,
  alternatePlan,
}: {
  plan: IPlan;
  alternatePlan?: PaidPlan;
}) => {
  switch (plan.type) {
    case "free":
      return <p className="text-3xl font-bold">Gratuit</p>;

    case "paid": {
      const intervalText = plan.interval === "monthly" ? "mois" : "an";
      return (
        <div>
          <p className="text-3xl font-bold">
            {(plan.amount / 100).toLocaleString("fr-FR")} {plan.currency}
            <span className="text-lg font-normal"> / {intervalText}</span>
          </p>
          {alternatePlan && (
            <p className="text-md text-gray-700 mt-1">
              ou {(alternatePlan.amount / 100).toLocaleString("fr-FR")}{" "}
              {alternatePlan.currency}
            </p>
          )}
        </div>
      );
    }

    case "quote":
      return <p className="text-xl font-semibold">{plan.contactText}</p>;

    default:
      return null;
  }
};

const PlanCard = ({
  plan,
  alternatePlan,
  isPopular = false,
  onSelect,
}: PlanCardProps) => {
  const handleButtonClick = () => {
    // Le bouton déclenche l'action appropriée en fonction du type de plan
    switch (plan.type) {
      case "paid":
        // On envoie l'ID Flutterwave du plan principal affiché
        onSelect(plan.flutterwaveId);
        break;
      case "quote":
        // Redirection pour les plans sur devis
        window.location.href = "/contact";
        break;
      case "free":
        // Aucune action de paiement pour le plan gratuit
        console.log("Plan gratuit sélectionné.");
        break;
    }
  };

  const getButtonText = () => {
    switch (plan.type) {
      case "free":
        return "Plan actuel";
      case "paid":
        return "Bientôt disponible";
      // return "Choisir ce plan";
      case "quote":
        return "Bientôt disponible";
      // return "Nous contacter";
    }
  };

  // Logique de thème pour le style
  const theme = isPopular ? "popular" : plan.type;

  const containerClasses = {
    popular: "border-2 border-blue-500 transform scale-105 shadow-2xl",
    paid: "border-ohada-blue-for shadow-lg",
    quote: "border-ohada-blue-three shadow-lg",
    free: "border-gray-200 shadow-lg",
  };

  const headerClasses = {
    popular: "bg-blue-500 text-white",
    paid: "bg-ohada-blue-for",
    quote: "bg-ohada-blue-three",
    free: "bg-gray-50",
  };

  const buttonClasses = {
    popular: "bg-blue-500 text-white hover:bg-blue-600",
    paid: "bg-ohada-blue-for text-white cursor-pointer hover:bg-ohada-blue-three",
    quote:
      "bg-ohada-blue-for text-white cursor-pointer hover:bg-ohada-blue-one",
    free: "bg-gray-300 text-gray-600 cursor-not-allowed",
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden border flex flex-col ${containerClasses[theme]}`}
    >
      {/* Header */}
      <div className={`px-6 py-4 text-center ${headerClasses[theme]}`}>
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <div className="h-20 flex items-center justify-center mt-2">
          <PlanPrice plan={plan} alternatePlan={alternatePlan} />
        </div>
      </div>

      {/* Features */}
      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer avec le bouton */}
      <div className="p-6 mt-auto">
        <button
          onClick={handleButtonClick}
          disabled={
            plan.type === "free" ||
            plan.type === "paid" ||
            plan.type === "quote"
          }
          className={`w-full py-3 rounded-md font-semibold transition-colors ${buttonClasses[theme]}`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
