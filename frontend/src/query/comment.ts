import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { userStore } from "../store/store";
import type { CommentProfileProps } from "../pages/profile/CommentProfile";
import { COMMENT_URL } from "../api/api";

export const useUserComments = () => {
  const { user } = userStore();

  const {
    data: comments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CommentProfileProps[]>({
    queryKey: ["userComments", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        toast.error(
          "Aucune décision sélectionnée pour afficher les commentaires."
        );
        return [];
      }

      const response = await axios.get(
        `${COMMENT_URL}/commentaire-par-utilisateur/${user.id}`
      );

      if (!response.data.success) {
        throw new Error("Erreur lors de la récupération des commentaires.");
      }

      return response.data.data;
    },
    enabled: !!user?.id, // Active la requête seulement si l'utilisateur est connecté
    staleTime: 1000 * 60 * 5, // 5 minutes avant de considérer les données comme périmées
    retry: 2, // 2 tentatives en cas d'échec
  });

  return {
    comments,
    isLoading,
    isError,
    error,
    refetchComments: refetch,
  };
};
