// import React from 'react'

import ProfileCard from "../components/annuaire/ProfileCard";
import { useProfiles } from "../hooks/useProfiles";

const ExplorerAnnuaire = () => {
  const { profiles, loading, error } = useProfiles();

  // console.log(profiles);

  if (loading) return <div className="text-center py-8">Chargement...</div>;
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
            <a
              href="#"
              className="bg-white text-blue-800 px-8 py-4 rounded-md font-bold hover:bg-blue-100"
            >
              Créer un profil gratuit
            </a>
            <a
              href="#"
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

        {/* <!-- Featured Profiles (Sponsored) --> */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Profils en vedette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <h3 className="font-bold text-lg">Me Fatoumata Diallo</h3>
                    <p className="text-blue-600">Avocate | Burkina Faso</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Sponsorisé
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Spécialiste en droit des sociétés et fiscalité OHADA avec 10
                  ans d'expérience.
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
                    <p className="text-blue-600">Enseignant | Côte d'Ivoire</p>
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
                    <h3 className="font-bold text-lg">Maître Amina Ndiaye</h3>
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

        {/* <!-- All Profiles --> */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Tous les professionnels
            </h2>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Trier par :</span>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Plus récents</option>
                <option>Plus anciens</option>
                <option>Par popularité</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles &&
              profiles.length > 0 &&
              profiles.map((profile) => (
                <ProfileCard profile={profile} key={profile.notionId} />
              ))}
          </div>

          {/* <!-- Pagination --> */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50"
              >
                <i className="fas fa-chevron-left"></i>
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-blue-600 hover:bg-gray-50"
              >
                1
              </a>
              <a
                href="#"
                className="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50"
              >
                <i className="fas fa-chevron-right"></i>
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* <!-- Pricing Section --> */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Choisissez votre formule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* <!-- Free Plan --> */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-100 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-800">
                Profil Basique
              </h3>
              <p className="text-gray-600">Gratuit</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Fiche profil simplifiée</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Nom et pays d'exercice</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Métier et spécialité</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-times text-red-400 mr-2"></i>
                  <span>Photo de profil</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-times text-red-400 mr-2"></i>
                  <span>Bio détaillée</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-times text-red-400 mr-2"></i>
                  <span>Contacts visibles</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300">
                Sélectionner
              </button>
            </div>
          </div>

          {/* <!-- Premium Plan --> */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-600 transform scale-105">
            <div className="bg-blue-600 px-6 py-4 text-white">
              <h3 className="text-xl font-bold">Profil Premium</h3>
              <p>5,000 FCFA/mois ou 20,000 FCFA/an</p>
              <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full mt-2 inline-block">
                Économisez 4,000 FCFA
              </span>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Tous les avantages du profil basique</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Photo de profil professionnelle</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Bio détaillée et expérience</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Tous vos contacts visibles</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Liens vers vos réseaux sociaux</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Mise en avant dans les résultats</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700">
                Sélectionner
              </button>
            </div>
          </div>

          {/* <!-- Sponsoring Plan --> */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-yellow-100 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-800">Sponsoring</h3>
              <p className="text-gray-600">Sur devis</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Tous les avantages Premium</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Position en tête de liste</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Bannière de profil mise en avant</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Logo visible sur la page d'accueil</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Statistiques de visites</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Option "Nous contacter" directe</span>
                </li>
              </ul>
              <button className="w-full bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorerAnnuaire;
