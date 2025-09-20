import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
// ex: http://localhost:5000/api/recruiter
import {
  HiOutlinePlus,
  HiOutlineBriefcase,
  HiOutlineUsers,
} from "react-icons/hi";
import { JOB_URL } from "../../../api/api";

// L'interface pour la réponse de notre API de statistiques
interface RecruiterStats {
  activeJobsCount: number;
  totalApplicationsCount: number;
}

// La fonction pour récupérer les données
const fetchRecruiterStats = async (): Promise<RecruiterStats> => {
  const { data } = await axios.get(`${JOB_URL}/recruiter/stats`);
  return data;
};

// Un composant interne pour afficher une carte de statistique
const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
}> = ({ icon, value, label }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

const RecruiterDashboardPage: React.FC = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recruiterStats"],
    queryFn: fetchRecruiterStats,
  });

  return (
    <div className="space-y-8">
      {/* --- En-tête de la page --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-gray-600">
            Bienvenue dans votre espace de recrutement.
          </p>
        </div>
        <Link
          to="/recruiter/jobs/new" // Note: cette route sera à créer pour le formulaire de création d'offre
          className="flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <HiOutlinePlus size={20} />
          Poster une nouvelle offre
        </Link>
      </div>

      {/* --- Section des statistiques clés --- */}
      {isLoading ? (
        <p>Chargement des statistiques...</p>
      ) : error ? (
        <p className="text-red-500">Impossible de charger les statistiques.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={<HiOutlineBriefcase size={28} />}
            value={stats?.activeJobsCount ?? 0}
            label="Offres Actives"
          />
          <StatCard
            icon={<HiOutlineUsers size={28} />}
            value={stats?.totalApplicationsCount ?? 0}
            label="Candidatures Reçues (Total)"
          />
        </div>
      )}

      {/* --- Section d'activité récente (placeholder) --- */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Activité Récente
        </h3>
        <p className="text-center text-gray-500 py-8">
          Ici s'afficheront les dernières candidatures reçues.
        </p>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
