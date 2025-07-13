import { useNavigate } from "react-router-dom";
import type { IDecision } from "../../types";

// Composant pour une carte de décision [cite: 15, 23, 32, 39]
const DecisionCard: React.FC<{ decision: IDecision }> = ({ decision }) => {
  const navigate = useNavigate();

  const displayJurisdiction =
    decision.juridiction === "CCJA"
      ? "CCJA"
      : `${decision.juridiction}, ${decision.pays || ""}`;

  const handleNavigateToDecision = (decision: IDecision) => {
    console.log("Navigating to decision detail page for:", decision.id);
    // Ici, vous pouvez utiliser useNavigate de react-router-dom pour naviguer

    navigate(`/decisions/${decision.id}`, { state: { item: decision } });
  };
  // Logique pour naviguer vers la page de détail de la décision

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 max-full mx-auto md:mx-0 border-t-4 border-ohada-blue">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {decision.titreDecision}
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        {decision.dateDecision} - {displayJurisdiction}
      </p>
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {decision.resume ||
          "Aucune description disponible pour cette décision."}
      </p>
      {/* <div className="flex flex-wrap gap-2 mb-4">
        {decision.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div> */}
      <button
        className=" bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-600"
        onClick={() => handleNavigateToDecision(decision)}
      >
        Lire la décision
      </button>
    </div>
  );
};

export default DecisionCard;
