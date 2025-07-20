import React from "react";

// import TerraOhadaLogo from './assets/logo TO.png'; // Adjust path as needed
// import Couverture from './assets/images/couverture.jpeg'; // Adjust path as needed

import SidebarDash from "../../components/adminComponents/LayoutDash/SidebarDash";
import AddDecision from "../../components/adminComponents/AddDecision";

// --- Image URLs ---
// Using direct URLs for images to avoid local path resolution issues

const Couverture =
  "https://placehold.co/1920x1080/0e4194/ffffff?text=Background"; // Placeholder for couverture.jpeg

// --- Interfaces ---
export interface Decision {
  id: string; // MongoDB _id will be a string
  idInterne: string;
  titreDecision: string;
  juridiction: string;
  date: string; // Stored as string for display, backend handles Date object
  pays: string;
  matiere: string;
  resume?: string;
  lienSource?: string;
  statut?: string;
  article?: string;
  articleMisAjour?: string;
  colonne1?: string;
  commentsCount?: number; // Added for statistics
}

export interface Comment {
  id: string;
  decisionId: string;
  author: string;
  content: string;
  createdAt: string;
}

// --- Main App Component ---
const ModalDecision: React.FC = () => {
  // Default active section

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Couverture})`,
          animation: "scroll 60s linear infinite",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>
      </div>

      {/* Sidebar */}
      <div className="relative z-20 h-full md:h-screen">
        <SidebarDash />
      </div>

      {/* Main Content Area */}
      <main className="relative z-20 flex-1 p-6 md:p-10 flex items-center justify-center">
        <AddDecision />
      </main>
    </div>
  );
};

export default ModalDecision;
