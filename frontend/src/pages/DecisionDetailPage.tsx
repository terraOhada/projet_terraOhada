/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/DecisionDetailPage.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

import type { IDecision } from "../types";
import { userStore } from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { FAVORI_URL } from "../api/api";
// Assurez-vous d'importer l'interface

// Définir une interface pour un commentaire
interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

const DecisionDetailPage: React.FC = () => {
  const { user } = userStore();
  const { state } = useLocation();
  // console.log(state.item);
  // const { id } = useParams<{ id: string }>();
  const [decision, setDecision] = useState<IDecision | null>(state?.item);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // États pour les nouvelles fonctionnalités
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [commentAuthor, setCommentAuthor] = useState<string>(
    user?.nom ? user.nom : ""
  ); // Simule un nom d'utilisateur

  const handleFavoriteToggle = async (decisionId: string) => {
    if (!user || !user?.id) return;
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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim() && commentAuthor.trim()) {
      const newComment: Comment = {
        id:
          comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
        author: commentAuthor.trim(),
        text: newCommentText.trim(),
        date: new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setNewCommentText(""); // Réinitialiser le champ de texte après l'ajout
      // Ici, vous feriez un appel API pour envoyer le commentaire au backend
      // Ex: api.addComment(decision._id, newComment);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <p className="text-xl text-gray-700">Chargement de la décision...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
  //       <p className="text-xl text-red-600 mb-4">{error}</p>
  //       <Link
  //         to="/"
  //         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
  //       >
  //         Retour à la liste
  //       </Link>
  //     </div>
  //   );
  // }

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
              <a href={decision.lienSource} className="text-ohada-blue-three">
                {decision.lienSource}
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Envoyer le commentaire
            </button>
          </form>

          {/* Liste des commentaires existants */}
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <p className="text-gray-800 font-medium mb-1">
                    {comment.author}
                  </p>
                  <p className="text-gray-500 text-xs mb-2">{comment.date}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Aucun commentaire pour l'instant. Soyez le premier !
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default DecisionDetailPage;
