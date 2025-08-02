/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { IComment } from "../DecisionDetailPage";
import type { IDecision } from "../../types";
import { useUserComments } from "../../query/comment";

export interface CommentProfileProps {
  id: string;
  contenu: string;
  createdAt: Date;
  comment: IComment;
  decision: IDecision;
}

const CommentProfile: React.FC = () => {
  const { comments, isLoading, isError, error, refetchComments } =
    useUserComments();
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <div>Chargement des commentaires...</div>;
  }

  if (isError) {
    return (
      <div>
        Erreur: {error?.message}
        <button onClick={() => refetchComments()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      {/* Version desktop */}
      <table className="hidden md:table min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Juridiction
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID décision
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Lien téléchargement
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Commentaire
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Statut Décision
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comment.decision.juridiction || "N/A"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comment.decision.idInterne || "N/A"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a
                    href={comment.decision.lienSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lien téléchargement
                  </a>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                  {comment.contenu || "Aucun commentaire"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      comment.decision.statut === "Validé"
                        ? "bg-green-100 text-green-800"
                        : comment.decision.statut === "Incomplet"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {comment.decision.statut || "En attente"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-4 text-center text-sm text-gray-500"
              >
                Aucun commentaire trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Version mobile */}
      <div className="md:hidden space-y-4 p-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {comment.decision.juridiction || "N/A"}
                    </p>
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        comment.decision.statut === "Validé"
                          ? "bg-green-100 text-green-800"
                          : comment.decision.statut === "Rejeté"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {comment.decision.statut || "En attente"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {comment.decision.idInterne || "N/A"}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    <a
                      href={comment.decision.lienSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Lien téléchargement
                    </a>
                  </p>
                  <div className="mt-2 text-sm text-gray-700">
                    {comment.contenu}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 p-4">
            Aucun commentaire trouvé
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentProfile;
