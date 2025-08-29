import React, { useState } from "react";
import axios from "axios";
import { getPlanId } from "../../data/data";
import { PLAN_URL } from "../../api/api";

interface PropsPlan {
  currentPlan: string;
  userId: string;
}

// Ce composant reçoit l'ID du plan Flutterwave de l'abonnement actuel de l'utilisateur
const ManageSubscription: React.FC<PropsPlan> = ({
  currentPlan,
  userId,
}: PropsPlan) => {
  const [uiState, setUiState] = useState("idle"); // 'idle', 'loading', 'cancelled', 'error'

  const currentPlanId = getPlanId(currentPlan);

  const handleCancel = async () => {
    // Toujours demander une confirmation
    if (
      !window.confirm("Êtes-vous sûr de vouloir résilier votre abonnement ?")
    ) {
      return;
    }

    setUiState("loading");
    try {
      await axios.put(
        `${PLAN_URL}/subscriptions/cancel/${currentPlanId}?userId=${userId}`
      );
      setUiState("cancelled");
      alert("Votre abonnement a été résilié.");
    } catch (error) {
      setUiState("error");
      console.error("La résiliation a échoué:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (uiState === "cancelled") {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md">
        <h3 className="font-bold">Abonnement Résilié</h3>
        <p className="text-sm">Vous ne serez plus facturé pour ce plan.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-xl font-bold">Mon Abonnement</h3>
      <p className="text-gray-600 mt-2">Vous êtes abonné au plan Premium.</p>
      <button
        onClick={handleCancel}
        disabled={uiState === "loading"}
        className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400"
      >
        {uiState === "loading"
          ? "Résiliation en cours..."
          : "Résilier l’abonnement"}
      </button>
      {uiState === "error" && (
        <p className="text-red-500 mt-2">La résiliation a échoué.</p>
      )}
    </div>
  );
};

export default ManageSubscription;
