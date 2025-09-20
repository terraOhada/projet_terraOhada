import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// ex: .../api/jobs et .../api/applications
import { JOB_URL } from "../../../api/api";
import { HiOutlineDocumentDownload } from "react-icons/hi";

interface Applicant {
  id: number;
  applicantName: string;
  applicantHeadline: string;
  appliedAt: string;
  status: string;
}

// Fonctions API
const fetchApplicants = async (jobId: string): Promise<Applicant[]> => {
  const { data } = await axios.get(`${JOB_URL}/${jobId}/applicants`);
  //   console.log("data", data);
  return data;
};

const updateApplicantStatus = async ({
  appId,
  status,
}: {
  appId: number;
  status: string;
}) => {
  const { data } = await axios.put(`${JOB_URL}/applications/${appId}/status`, {
    status,
  });
  return data;
};

const ApplicantManagementPage: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  //   console.log("jobId", jobId);

  const { data: applicants, isLoading } = useQuery({
    queryKey: ["applicants", jobId],
    queryFn: () => fetchApplicants(jobId!),
    enabled: !!jobId,
  });

  const mutation = useMutation({
    mutationFn: updateApplicantStatus,
    onSuccess: () => {
      // Re-fetch les données des candidats pour mettre à jour l'UI instantanément
      queryClient.invalidateQueries({ queryKey: ["applicants", jobId] });
    },
  });

  const handleStatusChange = (appId: number, newStatus: string) => {
    mutation.mutate({ appId, status: newStatus });
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-sm border">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Gestion des Candidats
      </h1>
      {isLoading ? (
        <p>Chargement des candidats...</p>
      ) : (
        <div className="space-y-4">
          {/* --- En-tête du tableau (visible uniquement sur les écrans moyens et plus) --- */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg font-semibold text-sm text-gray-600">
            <div className="col-span-4">Candidat</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-3">Statut</div>
            <div className="col-span-2">CV</div>
          </div>

          {/* --- Liste des candidats --- */}
          {applicants?.map((app) => (
            <React.Fragment key={app.id}>
              {/* --- VUE CARTE (Mobile) --- */}
              <div className="block md:hidden bg-gray-50 border rounded-lg p-4 space-y-3">
                <div>
                  <p className="font-bold text-lg">{app.applicantName}</p>
                  <p className="text-sm text-gray-500">
                    {app.applicantHeadline}
                  </p>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">
                      Date:
                    </span>
                    <span>
                      {new Date(app.appliedAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">
                      Statut:
                    </span>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      className="p-1 border rounded-md bg-white text-sm"
                    >
                      <option>Envoyée</option>
                      <option>Vue par le recruteur</option>
                      <option>Présélectionné</option>
                      <option>Entretien planifié</option>
                      <option>Refusée</option>
                    </select>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 py-2 rounded-md"
                  >
                    <HiOutlineDocumentDownload size={18} /> Voir CV
                  </a>
                </div>
              </div>

              {/* --- VUE LIGNE DE TABLEAU (Desktop) --- */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center px-4 py-3 border-b hover:bg-gray-50">
                <div className="col-span-4">
                  <p className="font-bold text-gray-800">{app.applicantName}</p>
                  <p className="text-sm text-gray-500">
                    {app.applicantHeadline}
                  </p>
                </div>
                <div className="col-span-3 text-gray-600">
                  {new Date(app.appliedAt).toLocaleDateString("fr-FR")}
                </div>
                <div className="col-span-3">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="p-2 border rounded-md bg-gray-50 w-full"
                  >
                    <option>Envoyée</option>
                    <option>Vue par le recruteur</option>
                    <option>Présélectionné</option>
                    <option>Entretien planifié</option>
                    <option>Refusée</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <a
                    href="#"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Voir CV
                  </a>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantManagementPage;
