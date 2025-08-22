import type { Plan } from "../../types";

interface PlanCardProps {
  plan: Plan;
  isPopular?: boolean;
  onSelect: (planId: string, paymentType?: "monthly" | "yearly") => void;
}

const PlanCard = ({ plan, isPopular = false, onSelect }: PlanCardProps) => {
  // Détermine la couleur en fonction du plan
  const getPlanColor = () => {
    switch (plan.name) {
      case "Premium":
        return "blue";
      case "Sponsorisé":
        return "yellow";
      default:
        return "gray";
    }
  };

  const color = getPlanColor();
  const isFree = plan.priceMonthly === 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${
        isPopular
          ? "border-2 border-ohada-blue-for transform scale-105"
          : "border-gray-200"
      } ${plan.name !== "Premium" ? "h-86" : ""}`}
    >
      {/* Header */}
      <div
        className={`px-6 py-4 ${
          isPopular
            ? "bg-ohada-blue-for text-white"
            : color === "yellow"
            ? "bg-ohada-blue-two"
            : "bg-gray-100"
        }`}
      >
        <h3 className="text-xl font-bold">{plan.name}</h3>
        {isFree ? (
          <p className="text-gray-600">Gratuit</p>
        ) : (
          <>
            <p>
              {/* {plan.priceMonthly} FCFA/mois ou {plan.priceYearly} FCFA/an */}
              Payant
            </p>
          </>
        )}
      </div>

      {/* Features */}
      <div className={`p-2`}>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-xs">
              <i
                className={`fas ${
                  feature.includes("(non inclus)")
                    ? "fa-times text-red-400"
                    : "fa-check text-green-500"
                } mr-2`}
              ></i>
              <span>{feature.replace("(non inclus)", "")}</span>
            </li>
          ))}
        </ul>

        {/* Bouton */}
        <button
          onClick={() =>
            isFree
              ? onSelect(plan.id)
              : plan.name === "Sponsorisé"
              ? (window.location.href = "/contact")
              : onSelect(plan.id, "monthly")
          }
          className={`w-full py-3 rounded-md font-medium hover:opacity-90 ${
            isPopular
              ? "bg-ohada-blue-for text-white"
              : color === "yellow"
              ? "bg-ohada-blue-two text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {isFree
            ? "Sélectionner"
            : plan.name === "Sponsorisé"
            ? "Nous contacter"
            : "Sélectionner"}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
