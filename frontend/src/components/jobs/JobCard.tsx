// client/src/components/JobCard.tsx
// import React from "react";

// Icônes de react-icons (npm install react-icons)
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
} from "react-icons/hi";
import type { Job } from "../../types";
import { Link } from "react-router-dom";

// Fonction pour formater la date
const timeSince = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 86400; // jours
  if (interval > 1) return "il y a " + Math.floor(interval) + " jours";
  interval = seconds / 3600; // heures
  if (interval > 1) return "il y a " + Math.floor(interval) + " heures";
  return "à l'instant";
};

const JobCard = ({ job }: { job: Job }) => {
  // Traduction simple pour le statut de télétravail
  const remoteStatus = job.remote === "Non" ? "Présentiel" : job.remote;

  return (
    <Link to={`/jobs/${job.id}`} className="block h-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* En-tête de la carte */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img
              // src={"job.logo"}
              src="https://th.bing.com/th/id/OIP.vVpm8PV3D5teNMmSjKaBygHaHa?w=198&h=197&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
              alt={`Logo de ${job.company}`}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Corps de la carte avec les tags */}
        <div className="p-6 flex-grow">
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <HiOutlineLocationMarker className="text-gray-400" />{" "}
              {job.location}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <HiOutlineBriefcase className="text-gray-400" />{" "}
              {job.contractType}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <HiOutlineSparkles className="text-gray-400" />{" "}
              {job.experienceLevel}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <HiOutlineAcademicCap className="text-gray-400" /> {job.sector}
            </span>
          </div>
          <div className="mt-4">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                job.remote === "Non"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {remoteStatus}
            </span>
          </div>
        </div>

        {/* Pied de la carte */}
        <div className="p-6 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <HiOutlineCalendar />
            <span>{timeSince(job.postedDate)}</span>
          </div>
          <a
            href="#"
            className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voir l'offre
          </a>
        </div>
      </div>
    </Link>
  );
};
export default JobCard;
