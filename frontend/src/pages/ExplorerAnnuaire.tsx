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
// import QuizOHADA from "../components/ui/QuizOhada";
// import ProfileCardVedette from "../components/ui/ProfileCardVedette";

const ExplorerAnnuaire = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { profiles, loading, error } = useProfiles();

  // Calcul des profils à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfiles = profiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(profiles.length / itemsPerPage);

  // console.log("profiles", profiles);

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
              />
            </div>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800">
              <i className="fas fa-search mr-2"></i> Rechercher
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Pays</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md">
                <option>Tous les pays</option>
                <option>Bénin</option>
                <option>Burkina Faso</option>
                <option>Cameroun</option>
                <option>Côte d'Ivoire</option>
                <option>Gabon</option>
                <option>Guinée</option>
                <option>Guinée-Bissau</option>
                <option>Guinée Équatoriale</option>
                <option>Mali</option>
                <option>Niger</option>
                <option>République Centrafricaine</option>
                <option>République du Congo</option>
                <option>Sénégal</option>
                <option>Tchad</option>
                <option>Togo</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Métier</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md">
                <option>Tous les métiers</option>
                <option>Avocat</option>
                <option>Juriste d'entreprise</option>
                <option>Enseignant</option>
                <option>Consultant</option>
                <option>Notaire</option>
                <option>Huissier de justice</option>
                <option>Magistrat</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Spécialité</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md">
                <option>Toutes les spécialités</option>
                <option>Droit des affaires</option>
                <option>Droit fiscal</option>
                <option>Droit des sociétés</option>
                <option>Droit du travail</option>
                <option>Droit pénal</option>
                <option>Droit de la propriété intellectuelle</option>
                <option>Droit des contrats</option>
                <option>Droit OHADA</option>
                <option>Droit des assurances</option>
                <option>Droit bancaire</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Expérience</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md">
                <option>Tous niveaux</option>
                <option>Moins de 2 ans</option>
                <option>2-5 ans</option>
                <option>5-10 ans</option>
                <option>10-15 ans</option>
                <option>15-20 ans</option>
                <option>20 ans et plus</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {/* Section Vedettes */}
          {loading ? (
            <FeaturedProfilesSkeleton />
          ) : (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Profils en vedette
              </h2>
              {/* Votre contenu des profils vedettes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cette partie sera disponible plus tard */}

                {/* {currentProfiles.slice(0, 3).map((profile) => (
                  <ProfileCardVedette profile={profile} key={profile.id} />
                ))} */}

                {/* <!-- Sponsored Profile 1 --> */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src="https://randomuser.me/api/portraits/women/45.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-lg">
                          Me Fatoumata Diallo
                        </h3>
                        <p className="text-blue-600">Avocate | Burkina Faso</p>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Sponsorisé
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Spécialiste en droit des sociétés et fiscalité OHADA avec
                      10 ans d'expérience.
                    </p>
                    <div className="flex space-x-2">
                      <a href="#" className="text-blue-500 hover:text-blue-700">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                    <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                      Voir le profil complet
                    </button>
                  </div>
                </div>

                {/* <!-- Sponsored Profile 2 --> */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-lg">Dr. Jean Koffi</h3>
                        <p className="text-blue-600">
                          Enseignant | Côte d'Ivoire
                        </p>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Sponsorisé
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Professeur de droit OHADA à l'Université Félix
                      Houphouët-Boigny, expert en droit des contrats.
                    </p>
                    <div className="flex space-x-2">
                      <a href="#" className="text-blue-500 hover:text-blue-700">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                    <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                      Voir le profil complet
                    </button>
                  </div>
                </div>

                {/* <!-- Sponsored Profile 3 --> */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-lg">
                          Maître Amina Ndiaye
                        </h3>
                        <p className="text-blue-600">
                          Juriste d'entreprise | Sénégal
                        </p>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Sponsorisé
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Juriste senior spécialisée en conformité et gouvernance
                      d'entreprise en zone OHADA.
                    </p>
                    <div className="flex space-x-2">
                      <a href="#" className="text-blue-500 hover:text-blue-700">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                    <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                      Voir le profil complet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Tous les professionnels */}
          {loading ? (
            <AllProfilesSkeleton />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Tous les professionnels
                </h2>
                {/* Vos options de tri */}
              </div>

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
