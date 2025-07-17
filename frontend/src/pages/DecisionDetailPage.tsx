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

  console.log("comment", comments);

  if (!decision) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Aucune décision à afficher.</p>
      </div>
    );
  }

  const displayJurisdiction =
    decision.juridiction === "CCJA"
      ? "CCJA"
      : `${decision.juridiction}, ${decision.pays || ""}`;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Retour à la liste des décisions
        </Link>

        <div className="flex justify-between items-start mb-4">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 pr-4">
            {decision.titreDecision}
          </h1>
          <button
            onClick={() => handleFavoriteToggle(decision.id as string)}
            className={`flex items-center space-x-2 p-2 rounded-full transition-colors duration-200 ${
              isFavorited
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            title={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <svg
              className={`w-6 h-6 ${
                isFavorited ? "fill-current" : "stroke-current"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isFavorited ? (
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              ) : (
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>

        <p className="text-md text-gray-600 mb-2">
          <span className="font-semibold">Date :</span> {decision.dateDecision}
        </p>
        <p className="text-md text-gray-600 mb-2">
          <span className="font-semibold">Juridiction :</span>{" "}
          {displayJurisdiction}
        </p>
        <p className="text-md text-gray-600 mb-6">
          <span className="font-semibold">Pays :</span> {decision.pays}
        </p>

        {decision.resume && (
          <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6 rounded">
            <h2 className="font-semibold text-lg mb-2">Résumé</h2>
            <MarkdownPreview
              source={decision.resume}
              style={{
                padding: 16,
                backgroundColor: "blue",
                borderRadius: "5px",
              }}
            />
          </div>
        )}

        <div className="mb-6">
          <h2 className="font-semibold text-xl text-gray-800 mb-3">
            Lien de téléchargement
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            <p>
              Texte intégral reproduit à partir de la décision publique rendue
              par la Cour Commune de Justice et d’Arbitrage (CCJA) de l’OHADA,
              le 18 juin 2015.{" "}
            </p>
            <span>
              Source :{" "}
              <a
                href={decision.lienSource}
                target="_blank"
                className="text-ohada-blue-three"
              >
                lien de téléchargement
              </a>
            </span>
          </div>
        </div>

        {/* <div className="flex flex-wrap gap-2 mb-8">
          {decision.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div> */}

        {/* Section Commentaires */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Commentaires
          </h2>

          {/* Formulaire pour ajouter un commentaire */}
          <form
            onSubmit={handleAddComment}
            className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Ajouter un commentaire
            </h3>
            <div className="mb-4">
              <label
                htmlFor="commentAuthor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Votre Nom
              </label>
              <input
                type="text"
                id="commentAuthor"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newComment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Votre Commentaire
              </label>
              <textarea
                id="newComment"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Écrivez votre commentaire ici..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              {loading ? "Envoi en cours..." : "Envoyer le commentaire"}
            </button>
          </form>

          {/* Liste des commentaires existants */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Commentaires récents et verifiés ({comments.length})
            </h3>
            {comments && comments.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-ohada-blue-two/5 p-4 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start space-x-4 mb-2">
                        <img
                          src={
                            comment.user.photo ? comment.user.photo : "Anonyme"
                          }
                          alt="photo"
                          width={40}
                          height={40}
                          className="rounded-full mb-2 border border-gray-300"
                        />
                        <p className="flex flex-col text-gray-800 font-medium mb-1">
                          <span>
                            <strong>Auteur :</strong> {comment.commentBy}
                          </span>
                          <span>
                            <strong>Commenté le :</strong>{" "}
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs mb-2">
                        {comment.date}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Commentaire :</strong> {comment.contenu}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-600">
                Aucun commentaire pour l'instant. Soyez le premier !
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DecisionDetailPage;
