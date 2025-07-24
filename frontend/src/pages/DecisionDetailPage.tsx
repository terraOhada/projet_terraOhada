/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/DecisionDetailPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

import type { IDecision, IUser } from "../types";
import { userStore } from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { COMMENT_URL, FAVORI_URL } from "../api/api";
// Assurez-vous d'importer l'interface

// Définir une interface pour un commentaire
export interface IComment {
  id: string;
  decisionId: string;
  userId: string;
  commentBy: string; // Nom de l'utilisateur qui a comment
  date: string;
  contenu: string; // Contenu du commentaire
  user: IUser; // Informations sur l'utilisateur
  createdAt: Date; // Date de création du commentaire
  updatedAt: Date; // Date de mise à jour du commentaire
}

const DecisionDetailPage: React.FC = () => {
  const { user } = userStore();
  const { state } = useLocation();

  const decision: IDecision = state?.item ? state.item : null;
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [commentAuthor, setCommentAuthor] = useState<string>(
    user?.nom ? user.nom : ""
  ); // Simule un nom d'utilisateur
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");

  const handleFavoriteToggle = async (decisionId: string) => {
    if (!user || !user?.id) {
      toast.error("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }
    if (!decisionId) return;
    setIsFavorited((prev) => !prev);

    if (!isFavorited) {
      try {
        const response = await axios.post(
          `${FAVORI_URL}/ajouter-favorite/${user?.id}`,
          {
            decisionId: decisionId,
          }
        );

        if (response.status === 201) {
          toast.success(response.data.message || "Ajouté comme favori 💖");
        }
      } catch (error: any) {
        toast.error(error.response.data.message || "Erreur d'ajout 😒");
        //
      }
    } else {
      try {
        const response = await axios.delete(
          `${FAVORI_URL}/supprimer-favorite/${user?.id}`,
          {
            data: {
              decisionId,
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message || "Ajouté comme favori 💖");
        }
      } catch (error: any) {
        toast.error(error.response.data.message || "Erreur d'ajout 😒");
      }
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      toast.error("Le commentaire ne peut pas être vide.");
      return;
    }
    if (!commentAuthor.trim()) {
      toast.error("Veuillez entrer votre nom.");
      return;
    }

    if (!decision || !decision.id) {
      toast.error("Aucune décision sélectionnée.");
      return;
    }

    if (!user || !user.id) {
      toast.error("Veuillez vous connecter pour ajouter un commentaire.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${COMMENT_URL}/ajouter-commentaire`, {
        decisionId: decision.id,
        userId: user.id,
        nom: commentAuthor,
        contenu: newCommentText,
      });

      if (response.data.success) {
        toast.success(
          response.data.message || "Commentaire ajouté avec succès !"
        );
        fetchComments(); // Rafraîchir la liste des commentaires
        setLoading(false);
        setNewCommentText("");
        setCommentAuthor(user.nom || "Anonyme");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'ajout du commentaire."
      );
      setLoading(false);
      console.error("Erreur lors de l'ajout du commentaire:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!decision || !decision.id) {
      toast.error(
        "Aucune décision sélectionnée pour afficher les commentaires."
      );
      return;
    }
    try {
      const response = await axios.get(
        `${COMMENT_URL}/commentaire-par-decision/${decision.id}`
      );
      if (response.data.success) {
        setComments(response.data.data);
      } else {
        console.error("Erreur lors de la récupération des commentaires.");
      }
    } catch (error: any) {
      console.error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des commentaires.",
        error
      );
    }
  };

  useEffect(() => {
    if (decision && decision.id) {
      fetchComments();
    }
  }, [decision, decision.id]);

  // console.log("comment", comments);

  if (!decision) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Aucune décision à afficher.</p>
      </div>
    );
  }

  // const displayJurisdiction =
  //   decision.juridiction === "CCJA"
  //     ? "CCJA"
  //     : `${decision.juridiction}, ${decision.pays || ""}`;

  if (!decision) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            Aucune décision sélectionnée
          </h3>
          <p className="mt-2 text-gray-600">
            Veuillez sélectionner une décision depuis la liste
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header avec bouton retour */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour aux décisions
          </Link>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête avec titre et favori */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-100 bg-blue-900/30 rounded-full mb-2">
                  {decision.juridiction === "CCJA"
                    ? "CCJA"
                    : `${decision.juridiction}, ${decision.pays}`}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {decision.titreDecision}
                </h1>
              </div>
              <button
                onClick={() => handleFavoriteToggle(decision.id as string)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title={
                  isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"
                }
              >
                <svg
                  className={`w-6 h-6 ${
                    isFavorited
                      ? "text-yellow-400 fill-current"
                      : "text-white/80 stroke-current"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    strokeWidth={isFavorited ? 0 : 2}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "details"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Détails
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "comments"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Commentaires ({comments.length})
              </button>
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6 sm:p-8">
            {activeTab === "details" ? (
              <>
                {/* Métadonnées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Date
                    </h3>
                    <p className="text-gray-900 font-medium">
                      {decision.dateDecision}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Pays
                    </h3>
                    <p className="text-gray-900 font-medium">{decision.pays}</p>
                  </div>
                </div>

                {/* Résumé */}
                {decision.resume && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Résumé
                    </h2>
                    <div className="prose max-w-none">
                      <MarkdownPreview
                        source={decision.resume}
                        style={{
                          backgroundColor: "transparent",
                          padding: 10,
                          border: "2px solid blue",
                          borderRadius: "5px",
                          color: "black",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Lien source */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Texte intégral
                  </h3>
                  <p className="text-blue-700 mb-3">
                    Décision publique rendue par la Cour Commune de Justice et
                    d'Arbitrage (CCJA) de l'OHADA
                  </p>
                  <a
                    href={decision.lienSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Accéder au document original
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Formulaire de commentaire */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ajouter un commentaire
                  </h3>
                  <form onSubmit={handleAddComment}>
                    <div className="mb-4">
                      <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Partagez votre analyse ou posez une question..."
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Publication...
                          </span>
                        ) : (
                          "Publier le commentaire"
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Liste des commentaires */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Commentaires ({comments.length})
                  </h3>
                  {comments.length > 0 ? (
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                {comment.commentBy.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {comment.commentBy}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">
                                {comment.contenu}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Aucun commentaire
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Soyez le premier à commenter cette décision
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionDetailPage;
