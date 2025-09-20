import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineDocumentText,
} from "react-icons/hi";

const CandidateLayout: React.FC = () => {
  // Simuler l'utilisateur connecté
  //   const currentUserId = "user_123";

  // Exemple de récupération de données de profil pour le widget
  // Dans une vraie app, vous utiliseriez Tanstack Query ici
  const profileCompletion = 75;

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg";
  const activeLinkStyle = "bg-blue-100 text-blue-700 font-bold";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* --- MENU DE NAVIGATION (SIDEBAR) --- */}
          <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
            <div className="bg-white p-2 rounded-xl shadow-sm  space-y-2">
              <NavLink
                to=""
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                }
                end
              >
                <HiOutlineDocumentText size={20} /> Mes Candidatures
              </NavLink>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                }
              >
                <HiOutlineUser size={20} /> Mon Profil
              </NavLink>
              <NavLink
                to="offres-sauvegardees"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                }
              >
                <HiOutlineStar size={20} /> Offres Sauvegardées
              </NavLink>
            </div>

            {/* --- WIDGET PROFIL --- */}
            <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
              <h4 className="font-bold mb-2">Votre Profil</h4>
              <p className="text-sm text-gray-600 mb-3">
                Complété à {profileCompletion}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              <a
                href="#"
                className="text-blue-600 hover:underline text-sm mt-4 inline-block"
              >
                Mettre à jour mon profil
              </a>
            </div>
          </aside>

          {/* --- CONTENU DE LA PAGE ACTIVE --- */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <Outlet />{" "}
            {/* C'est ici que React Router affichera la page (ex: DashboardApplicationsPage) */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CandidateLayout;
