import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Job } from "../../types";
import { JOB_URL } from "../../api/api";
import { HiX, HiCheckCircle } from "react-icons/hi";

// Simuler un utilisateur connecté
const currentUser = {
  id: "user_123",
  nom: "DAO",
  prenom: "Awa",
  email: "awa.dao@example.com",
  telephone: "+225 0708091011",
  resumeUrl: "/cv/CV_Awa_DAO_2025.pdf",
};

// Fonction qui envoie les données de candidature à l'API
const postApplication = async (applicationData: {
  jobId: number;
  coverLetter: string;
}) => {
  const { jobId, coverLetter } = applicationData;
  const payload = {
    userId: currentUser.id,
    resumeUrl: currentUser.resumeUrl,
    coverLetter,
  };
  const { data } = await axios.post(`${JOB_URL}/apply-job/${jobId}`, payload);
  return data;
};

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  const [coverLetter, setCoverLetter] = useState("");

  const mutation = useMutation({
    mutationFn: postApplication,
    onSuccess: () => {
      // Pas besoin de faire quoi que ce soit ici,
      // `isSuccess` passera à `true` et affichera le message de succès.
      console.log("Candidature envoyée avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la candidature:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ jobId: job.id, coverLetter });
  };

  // Ne rien rendre si la modale n'est pas ouverte
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ohada-blue-one/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative my-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <HiX size={24} />
        </button>

        {/* --- Étape 3 : Message de Succès --- */}
        {mutation.isSuccess ? (
          <div className="p-8 text-center">
            <HiCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Candidature envoyée !</h2>
            <p className="text-gray-600 mb-6">
              L'entreprise {job.company} a bien reçu votre profil. Bonne chance
              !
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Fermer
            </button>
          </div>
        ) : (
          /* --- Étapes 1 & 2 : Formulaire de candidature --- */
          <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-2xl font-bold mb-2">
              Postuler pour : {job.title}
            </h2>
            <p className="text-gray-600 mb-6">Chez {job.company}</p>

            <div className="space-y-4 bg-gray-50 p-4 rounded-md border">
              <h3 className="font-semibold">Vos informations</h3>
              <p>
                <strong>Nom :</strong> {currentUser.prenom} {currentUser.nom}
              </p>
              <p>
                <strong>Email :</strong> {currentUser.email}
              </p>
              <p>
                <strong>CV Actuel :</strong>{" "}
                <span className="text-blue-600">
                  {currentUser.resumeUrl.split("/").pop()}
                </span>
              </p>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Changer de CV
              </a>
            </div>

            <div className="mt-6">
              <label htmlFor="coverLetter" className="block font-semibold mb-2">
                Message pour le recruteur (Optionnel)
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={4}
                placeholder="Ajoutez une courte lettre de motivation..."
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-8 text-right">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {mutation.isPending
                  ? "Envoi en cours..."
                  : "Envoyer ma candidature"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
