// import React from 'react'

import ProfileCard from "../components/annuaire/ProfileCard";
import { useProfiles } from "../hooks/useProfiles";

const AnnuairePage = () => {
  const { profiles, loading, error } = useProfiles();

  console.log(profiles);

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Annuaire des Professionnels du Droit OHADA
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connectez-vous avec les meilleurs juristes, avocats, enseignants et
            consultants spécialisés en droit OHADA
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="#"
              className="bg-white text-blue-800 px-6 py-3 rounded-md font-bold hover:bg-blue-100"
            >
              Rejoindre l'annuaire
            </a>
            <a
              href="#annuaire"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-blue-800"
            >
              Explorer l'annuaire
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
                {/* <!-- Autres pays OHADA --> */}
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
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Spécialité</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md">
                <option>Toutes les spécialités</option>
                <option>Droit des affaires</option>
                <option>Droit fiscal</option>
                <option>Droit des sociétés</option>
                {/* <!-- Autres spécialités --> */}
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

            {/* <!-- Profile 1 --> */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-4">
                    <i className="fas fa-user text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Me Paul Sagna</h3>
                    <p className="text-blue-600">Avocat | Cameroun</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Spécialiste en droit des affaires et arbitrage OHADA.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
                <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                  Voir le profil complet
                </button>
              </div>
            </div> */}

            {/* <!-- Profile 2 --> */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-4">
                    <i className="fas fa-user text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Dr. Adissa Traoré</h3>
                    <p className="text-blue-600">Enseignant | Mali</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Expert en droit fiscal OHADA et harmonisation des
                  législations.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
                <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                  Voir le profil complet
                </button>
              </div>
            </div> */}

            {/* <!-- Profile 3 --> */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">M. Kodjo Mensah</h3>
                    <p className="text-blue-600">Juriste d'entreprise | Togo</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Juriste spécialisé en droit des sociétés et compliance en zone
                  OHADA.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-phone"></i>
                  </a>
                </div>
                <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                  Voir le profil complet
                </button>
              </div>
            </div> */}

            {/* <!-- Profile 4 --> */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-4">
                    <i className="fas fa-user text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Me Aïcha Bello</h3>
                    <p className="text-blue-600">Avocate | Niger</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Spécialiste en droit des contrats et contentieux commerciaux
                  OHADA.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
                <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                  Voir le profil complet
                </button>
              </div>
            </div> */}

            {/* <!-- Profile 5 --> */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/33.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">Mme Léontine Okou</h3>
                    <p className="text-blue-600">Consultante | Bénin</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Consultante experte en réforme du droit des affaires OHADA et
                  intégration régionale.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-globe"></i>
                  </a>
                </div>
                <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                  Voir le profil complet
                </button>
              </div>
            </div> */}

            {/* <!-- Profile 6 --> */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-4">
                    <i className="fas fa-user text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Me Didier Kouamé</h3>
                    <p className="text-blue-600">Avocat | Côte d'Ivoire</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Expert en droit des sociétés et fusions-acquisitions en zone
                  OHADA.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
                <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
                  Voir le profil complet
                </button>
              </div>
            </div> */}
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

      {/* <!-- Testimonials --> */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ce qu'ils disent de notre annuaire
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <!-- Testimonial 1 --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/28.jpg"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Me Awa Diop</h4>
                  <p className="text-blue-600 text-sm">Avocate, Sénégal</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Grâce à Terraohada, j'ai pu développer mon réseau professionnel
                et trouver de nouveaux clients dans toute la région OHADA. La
                visibilité offerte par le profil Premium est vraiment
                avantageuse."
              </p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>

            {/* <!-- Testimonial 2 --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/54.jpg"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Dr. Emmanuel Yeboah</h4>
                  <p className="text-blue-600 text-sm">Enseignant, Ghana</p>
                </div>
              </div>
              <p className="text-gray-600">
                "En tant qu'universitaire spécialisé en droit OHADA, cet
                annuaire m'a permis de connecter avec des praticiens pour des
                collaborations de recherche. Outil indispensable pour notre
                communauté juridique."
              </p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>

            {/* <!-- Testimonial 3 --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/62.jpg"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Mme Chantal Ouedraogo</h4>
                  <p className="text-blue-600 text-sm">
                    Juriste d'entreprise, Burkina Faso
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "Nous avons trouvé plusieurs consultants qualifiés pour notre
                projet grâce à Terraohada. La qualité des profils et la facilité
                de recherche par spécialité nous ont fait gagner un temps
                précieux."
              </p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FAQ --> */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Questions fréquentes
        </h2>

        <div className="max-w-3xl mx-auto">
          {/* <!-- FAQ Item 1 --> */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-600 focus:outline-none">
              <span>Comment créer mon profil sur l'annuaire ?</span>
              <i className="fas fa-chevron-down text-blue-500"></i>
            </button>
            <div className="mt-2 text-gray-600">
              <p>
                Cliquez sur le bouton "Créer un profil gratuit" en haut de page.
                Vous serez guidé à travers un formulaire simple pour renseigner
                vos informations de base. Une fois soumis, notre équipe validera
                votre profil sous 24h.
              </p>
            </div>
          </div>

          {/* <!-- FAQ Item 2 --> */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-600 focus:outline-none">
              <span>
                Quelle est la différence entre les profils Basique et Premium ?
              </span>
              <i className="fas fa-chevron-down text-blue-500"></i>
            </button>
            <div className="mt-2 text-gray-600">
              <p>
                Le profil Basique est gratuit et comprend vos informations
                essentielles (nom, pays, métier, spécialité). Le Premium
                (payant) ajoute photo, bio détaillée, tous vos contacts, liens
                sociaux et une meilleure visibilité dans les résultats de
                recherche.
              </p>
            </div>
          </div>

          {/* <!-- FAQ Item 3 --> */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-600 focus:outline-none">
              <span>Comment fonctionne le sponsoring ?</span>
              <i className="fas fa-chevron-down text-blue-500"></i>
            </button>
            <div className="mt-2 text-gray-600">
              <p>
                Le sponsoring offre une visibilité maximale : position en tête
                des résultats, bannière distinctive, logo sur la page d'accueil.
                Les tarifs varient selon la durée et l'emplacement.
                Contactez-nous pour un devis personnalisé.
              </p>
            </div>
          </div>

          {/* <!-- FAQ Item 4 --> */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-600 focus:outline-none">
              <span>Quels modes de paiement acceptez-vous ?</span>
              <i className="fas fa-chevron-down text-blue-500"></i>
            </button>
            <div className="mt-2 text-gray-600">
              <p>
                Nous acceptons les cartes bancaires (Visa, Mastercard), les
                virements mobiles (Orange Money, MTN Mobile Money) et les
                virements bancaires pour les abonnements Premium et sponsoring.
              </p>
            </div>
          </div>

          {/* <!-- FAQ Item 5 --> */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-600 focus:outline-none">
              <span>Puis-je modifier mon profil après création ?</span>
              <i className="fas fa-chevron-down text-blue-500"></i>
            </button>
            <div className="mt-2 text-gray-600">
              <p>
                Oui, vous pouvez modifier votre profil à tout moment en vous
                connectant à votre compte. Les modifications des profils Premium
                sont immédiates, celles des profils Basique nécessitent une
                revalidation par notre équipe (sous 24h).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Final CTA --> */}
      <section className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à rejoindre l'annuaire des professionnels OHADA ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Inscrivez-vous maintenant et augmentez votre visibilité dans
            l'espace OHADA
          </p>
          <a
            href="#"
            className="inline-block bg-white text-blue-800 px-8 py-4 rounded-md font-bold hover:bg-blue-100"
          >
            Commencer maintenant
          </a>
        </div>
      </section>
    </div>
  );
};

export default AnnuairePage;
