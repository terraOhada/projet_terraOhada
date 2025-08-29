import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PLAN_URL } from "../api/api";

/**
 * Custom Hook pour récupérer la liste de tous les plans de paiement.
 * La logique de l'appel API est directement intégrée dans le hook.
 */
export const usePlans = () => {
  return useQuery({
    queryKey: ["allPlans"],
    // La fonction est maintenant une fonction fléchée asynchrone définie directement ici
    queryFn: async () => {
      const response = await axios.get(`${PLAN_URL}/tous-les-plans`);
      // On retourne directement les données, comme attendu par React Query
      return response.data.data;
    },
    // Vous pouvez ajouter d'autres options de React Query ici si nécessaire
    // staleTime: 300000, // ex: ne pas rafraîchir les données avant 5 minutes
  });
};
