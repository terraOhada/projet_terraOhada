import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PLAN_URL } from "../api/api";

// Définition des types pour les données de retour
interface PlanInfo {
  name: string;
  interval: "monthly" | "yearly";
}

interface SubscriptionStatus {
  isActive: boolean;
  plan: PlanInfo | null;
}

// Fonction qui fait l'appel API avec l'ID de l'utilisateur
const fetchSubscriptionStatus = async (
  userId: string
): Promise<SubscriptionStatus> => {
  // Note : Assurez-vous d'avoir cette route sur votre backend
  const { data } = await axios.get(
    `${PLAN_URL}/user/subscription-status/${userId}`
  );
  return data.data;
};

/**
 * Custom Hook pour récupérer le statut d'abonnement d'un utilisateur spécifique.
 * @param userId - L'ID de l'utilisateur dont on veut vérifier le statut.
 */
export const useSubscriptionStatus = (userId: string) => {
  return useQuery({
    // La clé de requête est dynamique et inclut l'ID de l'utilisateur
    queryKey: ["subscriptionStatus", userId],

    // La fonction de requête reçoit l'ID de l'utilisateur
    queryFn: () => fetchSubscriptionStatus(userId),

    // Important : On n'exécute la requête que si userId est une valeur valide
    // Cela évite les appels inutiles si l'ID n'est pas encore chargé.
    enabled: !!userId,
  });
};
