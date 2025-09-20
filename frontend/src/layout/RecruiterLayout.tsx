import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const RecruiterLayout: React.FC = () => {
  // Styles pour les liens de navigation
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg";
  const activeLinkStyle = "bg-blue-100 text-blue-700 font-bold";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-2">
              <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase">
                Espace Recruteur
              </h3>
              <NavLink
                to="/recruiter/dashboard"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                }
                end
              >
                Tableau de bord
              </NavLink>
              <NavLink
                to="/recruiter/jobs"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                }
              >
                Mes Offres
              </NavLink>
            </div>
          </aside>
          <main className="w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLayout;
