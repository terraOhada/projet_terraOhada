import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { JOB_URL } from "../../api/api";
import type { Job } from "../../types"; // Réutiliser le type Job

// Icônes
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineStar,
  HiOutlineCurrencyDollar,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import { ApplyModal } from "../../components/jobs/ApplyModal";

// Type pour la réponse de notre nouvelle API
interface JobDetailResponse {
  job: Job;
  similarJobs: Job[];
}

// Fonction de fetch pour une seule offre
const fetchJobById = async (id: string): Promise<JobDetailResponse> => {
  const { data } = await axios.get(`${JOB_URL}/single-job/${id}`);
  return data;
};

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // --- État pour contrôler l'ouverture de la modale ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id], // Clé unique pour cette offre
    queryFn: () => fetchJobById(id!),
    enabled: !!id, // N'exécute la requête que si l'ID existe
  });

  if (isLoading)
    return <div className="text-center p-10">Chargement de l'offre...</div>;
  if (error)
    return (
      <div className="text-center p-10 text-red-500">
        Erreur : L'offre n'a pas pu être chargée.
      </div>
    );
  if (!data) return null;

  const { job, similarJobs } = data;

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- COLONNE PRINCIPALE --- */}
            <main className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-sm">
              {/* En-tête de l'offre */}
              <div className="flex items-start gap-4">
                <img
                  // src={job.logo}
                  src="https://th.bing.com/th/id/OIP.vVpm8PV3D5teNMmSjKaBygHaHa?w=198&h=197&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                  alt={`Logo de ${job.company}`}
                  className="w-16 h-16 rounded-lg object-cover border hidden sm:block"
                />
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    {job.title}
                  </h1>
                  <p className="mt-2 text-lg text-gray-600">{job.company}</p>
                </div>
              </div>

              {/* Informations clés */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-gray-700">
                <span className="flex items-center gap-2">
                  <HiOutlineLocationMarker /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <HiOutlineBriefcase /> {job.contractType}
                </span>
                <span className="flex items-center gap-2">
                  <HiOutlineAcademicCap /> {job.experienceLevel}
                </span>
                <span className="flex items-center gap-2">
                  <HiOutlineCurrencyDollar /> Salaire non spécifié
                </span>
              </div>

              {/* Boutons d'action */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  Postuler Maintenant
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto">
                  <HiOutlineStar /> Sauvegarder
                </button>
              </div>

              {/* Corps de la description */}
              <div className="mt-10 prose prose-lg max-w-none">
                <h4>À propos de {job.company}</h4>
                <p>
                  {job.company} est un leader dans le secteur de la {job.sector}{" "}
                  en Côte d'Ivoire, connu pour son innovation et son
                  environnement de travail dynamique.
                </p>
                <h4>Missions / Responsabilités</h4>
                <ul>
                  <li>
                    Développer et maintenir des applications web performantes.
                  </li>
                  <li>Collaborer avec les équipes de design et de produit.</li>
                  <li>
                    Participer à la révision de code et au mentorat des juniors.
                  </li>
                </ul>
                <h4>Profil recherché</h4>
                <p>
                  Vous avez une expérience significative de{" "}
                  {job.experienceLevel} dans un rôle similaire. Vous maîtrisez
                  les technologies modernes et êtes passionné(e) par la création
                  de produits de qualité.
                </p>
              </div>
            </main>

            {/* --- BARRE LATÉRALE --- */}
            <aside className="space-y-8">
              {/* Résumé de l'offre */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">Résumé de l'offre</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Entreprise:</strong> {job.company}
                  </p>
                  <p>
                    <strong>Lieu:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Contrat:</strong> {job.contractType}
                  </p>
                  <p>
                    <strong>Expérience:</strong> {job.experienceLevel}
                  </p>
                </div>
              </div>

              {/* Offres similaires */}
              {similarJobs.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Offres similaires</h3>
                  <div className="space-y-4">
                    {similarJobs.map((simJob) => (
                      <Link
                        to={`/jobs/${simJob.id}`}
                        key={simJob.id}
                        className="block hover:bg-gray-50 p-3 rounded-lg"
                      >
                        <p className="font-bold text-gray-800">
                          {simJob.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {simJob.company} - {simJob.location}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* --- On rend la modale ici --- */}

      <ApplyModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default JobDetailPage;
