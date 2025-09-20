import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { JOB_URL } from "../../../api/api";
import {
  HiOutlineArrowRight,
  HiOutlineCalendar,
  HiOutlineUsers,
} from "react-icons/hi";
// ex: http://localhost:5000/api/recruiter

interface RecruiterJob {
  id: number;
  title: string;
  postedDate: string;
  applicationCount: number;
}

const fetchRecruiterJobs = async (): Promise<RecruiterJob[]> => {
  const { data } = await axios.get(`${JOB_URL}/recruiter/jobs`);
  return data;
};

const RecruiterJobsListPage: React.FC = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["recruiterJobs"],
    queryFn: fetchRecruiterJobs,
  });

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Mes Offres d'Emploi</h1>
        {/* Vous pourriez ajouter un bouton "Créer une offre" ici */}
      </div>

      {isLoading ? (
        <p>Chargement de vos offres...</p>
      ) : (
        <div className="space-y-4">
          {/* --- En-tête du tableau (visible sur Desktop uniquement) --- */}
          <div className="hidden md:grid grid-cols-10 gap-4 px-4 py-2 bg-gray-50 rounded-lg font-semibold text-sm text-gray-600">
            <div className="col-span-4">Titre du poste</div>
            <div className="col-span-2">Date de publication</div>
            <div className="col-span-2">Candidatures</div>
            <div className="col-span-2">Actions</div>
          </div>

          {/* --- Liste des offres --- */}
          {jobs?.map((job) => (
            <React.Fragment key={job.id}>
              {/* --- VUE CARTE (Mobile) --- */}
              <div className="block md:hidden border rounded-lg p-4 bg-gray-50">
                <p className="font-bold text-lg mb-3">{job.title}</p>
                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <HiOutlineCalendar /> Date :
                    </span>
                    <span className="font-medium">
                      {new Date(job.postedDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <HiOutlineUsers /> Candidats :
                    </span>
                    <span className="font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {job.applicationCount}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/recruiter/jobs/${job.id}/applicants`}
                  className="flex items-center justify-center gap-2 mt-4 w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 py-2 rounded-md"
                >
                  Voir les candidats <HiOutlineArrowRight />
                </Link>
              </div>

              {/* --- VUE LIGNE (Desktop) --- */}
              <div className="hidden md:grid grid-cols-10 gap-4 items-center px-4 py-3 border-b hover:bg-gray-50">
                <div className="col-span-4 font-bold text-gray-800">
                  {job.title}
                </div>
                <div className="col-span-2 text-gray-600">
                  {new Date(job.postedDate).toLocaleDateString("fr-FR")}
                </div>
                <div className="col-span-2 text-gray-600">
                  {job.applicationCount} candidat(s)
                </div>
                <div className="col-span-2">
                  <Link
                    to={`/recruiter/jobs/${job.id}/applicants`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Voir les candidats
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ))}
          {jobs?.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              Vous n'avez posté aucune offre pour le moment.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecruiterJobsListPage;
