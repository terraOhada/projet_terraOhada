// import React from 'react'

import { useState } from "react";
import ProfileCard from "../components/annuaire/ProfileCard";
import PricingSection from "../components/ui/PricingSection";
// import VedetteSkeleton from "../components/ui/VedetteSkeleton";
import { useProfiles } from "../hooks/useProfiles";
import { PaginationAnnuaireProfile } from "../components/ui/PaginationAnnuaireProfile";
import { AllProfilesSkeleton } from "../components/ui/AllProfilesSkeleton";
import { FeaturedProfilesSkeleton } from "../components/ui/FeaturedProfilesSkeleton";
import { Link } from "react-router-dom";
import PricingTable from "../components/ui/PricingTable";
import { COUNTRIES } from "../data/data";
// import ProfileCardVedette from "../components/ui/ProfileCardVedette";
// import QuizOHADA from "../components/ui/QuizOhada";
// import ProfileCardVedette from "../components/ui/ProfileCardVedette";

const ExplorerAnnuaire = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { profiles, loading, error } = useProfiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  // console.log("selectedExperience", selectedExperience);
  // New state to handle sorting
  const [sortBy, setSortBy] = useState("");

  // console.log("profiles", profiles);

  // Map experience strings to a numerical value for sorting
  const experienceOrder = {
    "Moins de 2 ans": 1,
    "2-5 ans": 2,
    "5-10 ans": 3,
    "10-15 ans": 4,
    "15-20 ans": 5,
    "20 ans et plus": 6,
  };

  // Filter profiles based on state
  const filteredProfiles = profiles.filter((profile) => {
    // Search filter
    const matchesSearchTerm = profile.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Country filter
    const matchesCountry =
      selectedCountry === "" || profile.country === selectedCountry;

    // Job filter
    const matchesJob = selectedJob === "" || profile.jobTitle === selectedJob;

    // Specialty filter
    const matchesSpecialty =
      selectedSpecialty === "" || profile.specialties === selectedSpecialty;

    // Experience filter
    const matchesExperience =
      selectedExperience === "" || profile.experience === selectedExperience;
    // (profile.experience && profile.experience.includes(selectedExperience));

    return (
      matchesSearchTerm &&
      matchesCountry &&
      matchesJob &&
      matchesSpecialty &&
      matchesExperience
    );
  });

  // Sort filtered profiles based on the 'sortBy' state
  const sortedProfiles = [...filteredProfiles];
  if (sortBy === "name") {
    sortedProfiles.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "experience") {
    // Correction de l'erreur TypeScript en s'assurant que la clé existe avant d'y accéder.
    sortedProfiles.sort((a, b) => {
      const expA =
        experienceOrder[a.experience as keyof typeof experienceOrder] || 0;
      const expB =
        experienceOrder[b.experience as keyof typeof experienceOrder] || 0;
      return expA - expB;
    });
  }

  // Calcul des profils à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfiles = sortedProfiles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedProfiles.length / itemsPerPage);

  // const featuredProfiles = profiles.filter(p => p.isFeatured);

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  return (
    <div>
      {/* <!-- CTA Section --> */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez notre réseau de professionnels OHADA
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Augmentez votre visibilité et développez votre réseau professionnel
            dans l'espace OHADA
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/annuaire/rejoindre-annuaire"
              className="bg-white text-blue-800 px-8 py-4 rounded-md font-bold hover:bg-blue-100"
            >
              Créer un profil gratuit
            </Link>
            <a
              href="#pricing"
              className="bg-transparent border-2 border-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-blue-800"
            >
              Découvrir les options Premium
            </a>
          </div>
        </div>
      </section>

      {/* <!-- Search and Filters --> */}
      <section id="annuaire" className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher un professionnel..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <button
              onClick={() => setCurrentPage(1)} // Re-filter on button click
              className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800"
            >
              <i className="fas fa-search mr-2"></i> Rechercher
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Pays</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1); // Reset to first page
                }}
              >
                <option value="">Tous les pays</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name + "(" + country.code + ")"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Métier</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={selectedJob}
                onChange={(e) => {
                  setSelectedJob(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value={""}>Tous les métiers</option>
                <option value={"Avocat"}>Avocat</option>
                <option value={"Juriste d'entreprise"}>
                  Juriste d'entreprise
                </option>
                <option value={"Enseignant"}>Enseignant</option>
                <option value={"Consultant"}>Consultant</option>
                <option value={"Notaire"}>Notaire</option>
                <option value={"Huissier de justice"}>
                  Huissier de justice
                </option>
                <option value={"Magistrat"}>Magistrat</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Spécialité</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value={""}>Toutes les spécialités</option>
                <option value={"Droit des affaires"}>Droit des affaires</option>
                <option value={"Droit fiscal"}>Droit fiscal</option>
                <option value={"Droit des sociétés"}>Droit des sociétés</option>
                <option value={"Droit du travail"}>Droit du travail</option>
                <option value={"Droit pénal"}>Droit pénal</option>
                <option value={"Droit de la propriété intellectuelle"}>
                  Droit de la propriété intellectuelle
                </option>
                <option value={"Droit des contrats"}>Droit des contrats</option>
                <option value={"Droit OHADA"}>Droit OHADA</option>
                <option value={"Droit des assurances"}>
                  Droit des assurances
                </option>
                <option value={"Droit bancaire"}>Droit bancaire</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Expérience</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={selectedExperience}
                onChange={(e) => {
                  setSelectedExperience(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value={""}>Tous niveaux</option>
                <option value={"Moins de 2 ans"}>Moins de 2 ans</option>
                <option value={"2 à 5 ans"}>2-5 ans</option>
                <option value={"5 à 10 ans"}>5-10 ans</option>
                <option value={"10 à 15 ans"}>10-15 ans</option>
                <option value={"15 à 20 ans"}>15-20 ans</option>
                <option value={"20 ans et plus"}>20 ans et plus</option>
              </select>
            </div>

            {/* New Sort By filter */}
            <div>
              <label className="block text-gray-700 mb-2">Trier par</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Par défaut</option>
                <option value="name">Nom (A-Z)</option>
                <option value="experience">Expérience (Croissant)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {/* Section Vedettes */}
          {loading ? (
            <FeaturedProfilesSkeleton />
          ) : (
            // profiles en vedettes à ouvrir plus tard
            <div></div>
            // profiles en vedettes à ouvrir plus tard


            // <div className="mb-12">
            //   <h2 className="text-2xl font-bold mb-6 text-gray-800">
            //     Profils en vedette
            //   </h2>
            //   {/* Votre contenu des profils vedettes */}
            //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            //     {/* Cette partie sera disponible plus tard */}

            //     {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            //       {featuredProfiles.slice(0, 3).map((profile) => (
            //         <ProfileCardVedette profile={profile} key={profile.id} />
            //       ))}
            //     </div> */}

            //     {/* <!-- Sponsored Profile 1 --> */}
            //     <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
            //       <div className="p-6">
            //         <div className="flex items-center mb-4">
            //           <img
            //             src="https://randomuser.me/api/portraits/women/45.jpg"
            //             alt="Profile"
            //             className="w-16 h-16 rounded-full object-cover mr-4"
            //           />
            //           <div>
            //             <h3 className="font-bold text-lg">
            //               Me Fatoumata Diallo
            //             </h3>
            //             <p className="text-blue-600">Avocate | Burkina Faso</p>
            //             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            //               Sponsorisé
            //             </span>
            //           </div>
            //         </div>
            //         <p className="text-gray-600 mb-4">
            //           Spécialiste en droit des sociétés et fiscalité OHADA avec
            //           10 ans d'expérience.
            //         </p>
            //         <div className="flex space-x-2">
            //           <a href="#" className="text-blue-500 hover:text-blue-700">
            //             <i className="fab fa-linkedin"></i>
            //           </a>
            //           <a href="#" className="text-blue-500 hover:text-blue-700">
            //             <i className="fas fa-envelope"></i>
            //           </a>
            //         </div>
            //         <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
            //           Voir le profil complet
            //         </button>
            //       </div>
            //     </div>

            //     {/* <!-- Sponsored Profile 2 --> */}
            //     <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
            //       <div className="p-6">
            //         <div className="flex items-center mb-4">
            //           <img
            //             src="https://randomuser.me/api/portraits/men/32.jpg"
            //             alt="Profile"
            //             className="w-16 h-16 rounded-full object-cover mr-4"
            //           />
            //           <div>
            //             <h3 className="font-bold text-lg">Dr. Jean Koffi</h3>
            //             <p className="text-blue-600">
            //               Enseignant | Côte d'Ivoire
            //             </p>
            //             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            //               Sponsorisé
            //             </span>
            //           </div>
            //         </div>
            //         <p className="text-gray-600 mb-4">
            //           Professeur de droit OHADA à l'Université Félix
            //           Houphouët-Boigny, expert en droit des contrats.
            //         </p>
            //         <div className="flex space-x-2">
            //           <a href="#" className="text-blue-500 hover:text-blue-700">
            //             <i className="fab fa-linkedin"></i>
            //           </a>
            //           <a href="#" className="text-blue-500 hover:text-blue-700">
            //             <i className="fas fa-envelope"></i>
            //           </a>
            //         </div>
            //         <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
            //           Voir le profil complet
            //         </button>
            //       </div>
            //     </div>

            //     {/* <!-- Sponsored Profile 3 --> */}
            //     <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
            //       <div className="p-6">
            //         <div className="flex items-center mb-4">
            //           <img
            //             src="https://randomuser.me/api/portraits/women/68.jpg"
            //             alt="Profile"
            //             className="w-16 h-16 rounded-full object-cover mr-4"
            //           />
            //           <div>
            //             <h3 className="font-bold text-lg">
            //               Maître Amina Ndiaye
            //             </h3>
            //             <p className="text-blue-600">
            //               Juriste d'entreprise | Sénégal
            //             </p>
            //             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            //               Sponsorisé
            //             </span>
            //           </div>
            //         </div>
            //         <p className="text-gray-600 mb-4">
            //           Juriste senior spécialisée en conformité et gouvernance
            //           d'entreprise en zone OHADA.
            //         </p>
            //         <div className="flex space-x-2">
            //           <a href="#" className="text-blue-500 hover:text-blue-700">
            //             <i className="fab fa-linkedin"></i>
            //           </a>
            //           <a href="#" className="text-blue-500 hover:text-blue-700">
            //             <i className="fas fa-envelope"></i>
            //           </a>
            //         </div>
            //         <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
            //           Voir le profil complet
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          )}

          {/* Section Tous les professionnels */}

          {error ? (
            <div className="text-center text-red-500 py-12">
              <p>{error}</p>
            </div>
          ) : loading ? (
            <AllProfilesSkeleton />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Tous les professionnels
                </h2>
              </div>

              {sortedProfiles.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProfiles.map((profile) => (
                      <ProfileCard profile={profile} key={profile.id} />
                    ))}
                  </div>
                  <PaginationAnnuaireProfile
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p>Aucun professionnel ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* <!-- Pricing Section --> */}
      <PricingSection />
      <PricingTable />
      {/* <QuizOHADA /> */}
    </div>
  );
};

export default ExplorerAnnuaire;
