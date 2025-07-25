// src/layout/ProfileLayout.tsx
import React, { useState } from "react"; // Importez useState
import { Outlet, Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../components/others/ScrollToTop"; // Assurez-vous que le chemin est correct
import {
  User,
  Heart,
  LogOut,
  BriefcaseBusiness,
  Menu,
  X,
  MessageCircleIcon,
} from "lucide-react"; // Importez Menu et X pour le toggle
import { userStore } from "../store/store";
import LogoTerraOhada from "../assets/logo TO.png";
import toast from "react-hot-toast";
import Couverture from "../assets/images/couverture.jpeg";

const ProfileLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, clearUser } = userStore(); // Importez votre store pour gérer l'utilisateur
  // const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la visibilité de la sidebar

  const handleLogout = () => {
    clearUser(); // Appel de la fonction pour vider l'utilisateur du store
    toast.success("Déconnexion réussie !");
    setTimeout(() => {
      navigate("/"); // Redirige vers la page d'accueil après la déconnexion
    }, 1000);
  };

  const scrollToSection = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className=" relative flex flex-col md:flex-row min-h-screen"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute h-full w-full bg-ohada-blue-for/40"></div>{" "}
      {/* Passe en flex-row sur md */}
      <ScrollToTop />
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-blue-600 text-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed rounded-e-md h-screen inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col z-50 transform 
                   ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                   md:relative md:translate-x-0 md:border-r md:border-gray-200 
                   transition-transform duration-300 ease-in-out`}
      >
        <div
          className="flex items-center justify-center mb-6 cursor-pointer"
          onClick={() => scrollToSection("/")}
        >
          <img
            src={LogoTerraOhada}
            alt="Logo"
            className="w-14 h-14 object-contain rounded-full border-2 border-ohada-blue-one p-2"
          />
          <h2 className="text-2xl font-bold text-gray-900 ml-3">Mon profile</h2>
          {/* Close button for mobile sidebar */}
          <button
            className="md:hidden absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow space-y-2">
          {user?.role !== "USER" && (
            <Link
              to="/tableau-de-bord"
              className="flex text-sm items-center w-full px-4 py-2 font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
            >
              <BriefcaseBusiness className="w-5 h-5 mr-3" />
              Tableau de bord
            </Link>
          )}

          <h3 className="text-sm font-semibold text-gray-500 uppercase mt-6 mb-2">
            Profile
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => scrollToSection("")}
                className="flex items-center w-full px-4 py-2 text-md font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              >
                <User className="w-5 h-5 mr-3" />
                Mon profil
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("favoris")}
                className="flex items-center w-full px-4 py-2 text-md font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 mr-3" />
                Mes favoris
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("commentaires")}
                className="flex items-center w-full px-4 py-2 text-md font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              >
                <MessageCircleIcon className="w-5 h-5 mr-3" />
                Commentaires
              </button>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-md font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Deconnexion
            </button>
          </div>
        </nav>
      </div>
      {/* Main Content Area */}
      <div className="z-40 flex-grow p-4 md:p-8 mt-16 md:mt-0">
        {" "}
        {/* Add top margin on mobile to clear the button */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
