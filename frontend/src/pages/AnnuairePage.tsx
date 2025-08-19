// import React from 'react'

import { Link } from "react-router-dom";
import PricingSection from "../components/ui/PricingSection";
import PricingTable from "../components/ui/PricingTable";

const AnnuairePage = () => {
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
            <Link
              to="/annuaire/rejoindre-annuaire"
              className="bg-white text-blue-800 px-6 py-3 rounded-md font-bold hover:bg-blue-100"
            >
              Rejoindre l'annuaire
            </Link>
            <Link
              to="/annuaire/explorer-annuaire"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-blue-800"
            >
              Explorer l'annuaire
            </Link>
          </div>
        </div>
      </section>

      {/* <!-- Pricing Section --> */}
      <PricingSection />

      {/* tableSection */}
      <PricingTable />

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
