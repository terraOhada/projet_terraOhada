import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { USERS_URL } from "../../api/api";

// Définir le type pour une candidature enrichie
interface EnrichedApplication {
  id: number;
  jobId: number;
  status: "Envoyée" | "Vue par le recruteur" | "Refusée";
  appliedAt: string;
  jobTitle: string;
  companyName: string;
}

// Fonction pour récupérer les candidatures
const fetchApplications = async (
  userId: string
): Promise<EnrichedApplication[]> => {
  const { data } = await axios.get(`${USERS_URL}/${userId}/applications`);
  return data;
};

// Composant pour le badge de statut
const StatusBadge = ({ status }: { status: EnrichedApplication["status"] }) => {
  const styles = {
    Envoyée: "bg-blue-100 text-blue-800",
    "Vue par le recruteur": "bg-yellow-100 text-yellow-800",
    Refusée: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const JobApplicationsPage: React.FC = () => {
  const currentUserId = "user_123";

  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications", currentUserId],
    queryFn: () => fetchApplications(currentUserId),
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Mes Candidatures
      </h1>

      {isLoading && <p>Chargement de vos candidatures...</p>}
      {error && <p className="text-red-500">Erreur lors du chargement.</p>}

      {applications && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 font-semibold">Poste</th>
                <th className="p-4 font-semibold">Entreprise</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-800">
                    {app.jobTitle}
                  </td>
                  <td className="p-4 text-gray-600">{app.companyName}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(app.appliedAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {applications?.length === 0 && (
        <p className="text-center p-8 text-gray-500">
          Vous n'avez encore postulé à aucune offre.
        </p>
      )}
    </div>
  );
};

export default JobApplicationsPage;
