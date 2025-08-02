import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import type { IFavorite } from "../types";
import { userStore } from "../store/store";
import { FAVORI_URL } from "../api/api";

const FAVORITES_QUERY_KEY = "favorites";

export const useFavorites = () => {
  const { user } = userStore();
  const queryClient = useQueryClient();

  // Récupération des favoris
  const {
    data: favorites = [],
    isLoading,
    isError,
    error,
  } = useQuery<IFavorite[], Error>({
    queryKey: [FAVORITES_QUERY_KEY, user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await axios.get(
        `${FAVORI_URL}/toutes-favorites/${user.id}`
      );
      return response.data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation pour supprimer un favori
  const removeFavoriteMutation = useMutation({
    mutationFn: async (decisionId: string) => {
      if (!user?.id) throw new Error("Utilisateur non connecté");
      const response = await axios.delete(
        `${FAVORI_URL}/supprimer-favorite/${user.id}`,
        { data: { decisionId } }
      );
      return response.data;
    },
    onSuccess: (data, decisionId) => {
      toast.success(data.message);
      // Mise à jour optimiste du cache
      queryClient.setQueryData<IFavorite[]>(
        [FAVORITES_QUERY_KEY, user?.id],
        (oldFavorites = []) =>
          oldFavorites.filter((fav) => fav.decisionId !== decisionId)
      );
    },
    onError: (error) => {
      console.error("Erreur suppression:", error);
      toast.error("Échec de la suppression du favori");
    },
  });

  const handleRemoveFavorite = (decisionId: string) => {
    removeFavoriteMutation.mutate(decisionId);
  };

  return {
    favorites,
    isLoading,
    isError,
    error,
    handleRemoveFavorite,
    isRemoving: removeFavoriteMutation.isPending,
  };
};
