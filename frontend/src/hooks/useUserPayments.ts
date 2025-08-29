import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PLAN_URL } from "../api/api";

// Définition des types pour les données reçues de l'API
interface PlanInfo {
  name: string;
}

export interface Payment {
  id: string;
  transactionId: number;
  status: "successful" | "failed" | "pending" | "cancelled";
  amount: number; // En centimes
  currency: string;
  createdAt: string; // Date au format ISO
  plan: PlanInfo | null;
}

// La fonction est maintenant capable de prendre un userId optionnel
const fetchUserPayments = async (userId?: string): Promise<Payment[]> => {
  // On adapte l'URL en fonction de la présence de userId
  const url = `${PLAN_URL}/user/payments/${userId}`; // Route pour un admin qui consulte un utilisateur
  const { data } = await axios.get(url);
  return data.data;
};

// Le hook accepte maintenant un userId optionnel
export const useUserPayments = (userId?: string) => {
  return useQuery({
    // La queryKey inclut le userId pour créer un cache unique par utilisateur
    queryKey: ["userPayments", userId],

    // On passe le userId à la fonction de récupération
    queryFn: () => fetchUserPayments(userId),

    // Optionnel : ne pas lancer la requête si l'ID d'un admin n'est pas encore disponible
    enabled: !!userId, // Pour le cas admin. Si vous voulez toujours l'activer, retirez cette ligne.
  });
};
