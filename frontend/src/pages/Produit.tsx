// src/components/TerraOhadaPresentation.tsx
import React from "react";
import Video from "../assets/video/terraOhada_video.mp4";
import Illustration from "../assets/images/illustration.jpg";

const Produit: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Section Héro - Titre et Vision */}
      <section className="relative text-white py-16 md:py-24">
        {/* <div className="absolute py-20 bg-ohada-blue-one h-[320px] opacity-30 inset-0 z-50 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInDown">
            Présentation du produit{" "}
            <span className="text-yellow-300">TerraOhada</span>
          </h1>
          <p className="text-xl md:text-2xl  leading-relaxed max-w-3xl mx-auto animate-fadeInUp">
            Notre vision : rendre le droit OHADA accessible, compréhensible et
            exploitable.
          </p>
        </div> */}
        <div className="absolute inset-0 z-20 h-[200px]">
          <video src={Video} muted loop autoPlay></video>
        </div>
      </section>

      {/* Section "Pour qui ?" */}
      <section className="py-16 md:py-20 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700 animate-fadeIn">
            Pour qui est TerraOhada ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeIn delay-100">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Professionnels du droit OHADA
              </h3>
              <p className="text-gray-700">
                La plateforme s’adresse à tous les praticiens du droit en
                Afrique francophone : avocats, juristes d’entreprise, notaires,
                magistrats, greffiers, experts-comptables ou fiscalistes. Elle
                leur permet d’accéder rapidement à des contenus fiables liés au
                droit OHADA, pour renforcer leur veille juridique et faciliter
                leur travail quotidien
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeIn delay-200">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Étudiants en droit et en spécialisation OHADA
              </h3>
              <p className="text-gray-700">
                Pensée comme un outil d’accompagnement, la solution offre aux
                étudiants un accès simplifié aux textes juridiques,
                jurisprudences et ressources essentielles à la compréhension du
                droit des affaires africain. Elle soutient leur apprentissage et
                leurs recherches dès les premières années d’étude.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeIn delay-300">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Enseignants-chercheurs et experts en droit des affaires africain
              </h3>
              <p className="text-gray-700">
                Les universitaires, doctorants et passionnés du droit OHADA
                peuvent s’appuyer sur la plateforme pour enrichir leurs travaux
                de recherche, préparer leurs cours ou partager des références.
                L’outil facilite l’accès aux sources, dans une logique de
                vulgarisation et de diffusion du savoir.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeIn delay-400">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Entreprises, institutions et ONG opérant dans l’espace OHADA
              </h3>
              <p className="text-gray-700">
                Dans un environnement où la sécurité juridique est cruciale,
                notre solution permet aux organisations implantées dans les 17
                États membres de mieux comprendre le cadre légal unifié de
                l’OHADA. Elle constitue un point d’entrée fiable pour appuyer
                les équipes internes ou les partenaires juridiques.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeIn delay-400">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                Cabinets de recrutement et structures RH juridiques
              </h3>
              <p className="text-gray-700">
                À mesure que la plateforme évolue, elle intégrera des
                fonctionnalités à forte valeur ajoutée pour les cabinets
                spécialisés dans le recrutement juridique en Afrique. Bien que
                la mise en relation directe ne soit pas encore disponible, la
                plateforme pose les bases d’un écosystème juridique connecté, à
                suivre de près.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Pourquoi TerraOhada ?" */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700 animate-fadeIn">
            Pourquoi choisir TerraOhada ?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 lg:w-2/3 text-lg leading-relaxed space-y-4 animate-fadeInLeft">
              <p>
                TerraOhada, c’est bien plus qu’une base de données juridiques.
                C’est un véritable écosystème conçu pour faciliter l’accès au
                droit OHADA, connecter les professionnels et accompagner les
                juristes de demain. <br /> <strong>Notre objectif :</strong>{" "}
                centraliser l’information, fluidifier les usages, et créer une
                communauté engagée autour du droit OHADA.
                <br /> <br /> <strong>Ce que TerraOhada vous apporte :</strong>
              </p>
              <ul className="list-none list-inside space-y-2">
                <li>
                  Une interface claire, moderne et adaptée aux usages mobiles
                </li>
                <li>
                  Un gain de temps significatif dans vos recherches juridiques
                </li>
                <li>
                  Un accès à une information fiable, continue et contextualisée
                </li>
                <li>
                  Une plateforme conçue en Afrique, pour les acteurs du droit en
                  Afrique
                </li>
                <li>
                  Une démarche collaborative au service de toute la communauté
                  OHADA
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 lg:w-1/3 flex justify-center md:justify-end animate-fadeInRight">
              {/* Vous pouvez remplacer ceci par une image ou une illustration */}
              <div className=" bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-center text-sm font-semibold p-4">
                <img
                  src={Illustration}
                  alt="illustration"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Quelles fonctionnalités ?" */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700 animate-fadeIn">
            Fonctionnalités Clés de TerraOhada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm animate-fadeIn delay-500">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Recherche simplifiée de jurisprudence
              </h3>
              <p className="text-gray-700">
                tapez un mot-clé, un pays, une juridiction ou un thème pour
                retrouver les décisions pertinentes.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm animate-fadeIn delay-600">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Espace personnel sécurisé
              </h3>
              <p className="text-gray-700">
                l’historique de vos recherches et enregistrer vos contenus
                favoris (fonctionnalité en cours de déploiement).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Produit;
