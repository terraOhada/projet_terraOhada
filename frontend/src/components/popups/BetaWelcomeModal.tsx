import React from "react";
import { Dialog } from "@headlessui/react";
import {
  HiOutlineSparkles,
  HiOutlineUserAdd,
  HiOutlineIdentification,
  HiOutlineBriefcase,
  HiX,
} from "react-icons/hi";

interface BetaWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Un composant interne pour structurer la liste des fonctionnalités
const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-blue-600 mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export const BetaWelcomeModal: React.FC<BetaWelcomeModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      {/* L'arrière-plan assombri */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Conteneur pour centrer le popup */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <HiX size={24} />
          </button>

          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiOutlineSparkles size={32} />
          </div>

          <Dialog.Title
            as="h2"
            className="text-2xl font-bold text-center text-gray-900 mb-2"
          >
            Bienvenue sur la Bêta de TerraOHADA !
          </Dialog.Title>
          <p className="text-center text-gray-600 mb-8">
            Nous sommes heureux de vous présenter nos fonctionnalités clés.
          </p>

          <div className="space-y-5">
            <FeatureItem
              icon={<HiOutlineUserAdd size={24} />}
              title="Inscription et Connexion"
              description="Créez votre compte pour accéder à votre espace personnel et gérer vos activités sur la plateforme."
            />
            <FeatureItem
              icon={<HiOutlineIdentification size={24} />}
              title="Annuaire Professionnel"
              description="Explorez notre annuaire de juristes et d'experts. Des options d'abonnement sont disponibles pour une visibilité accrue."
            />
            <FeatureItem
              icon={<HiOutlineBriefcase size={24} />}
              title="Job Board"
              description="Trouvez des offres d'emploi exclusives ou publiez les vôtres. Découvrez nos formules d'abonnement pour les recruteurs."
            />
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Commencer l'exploration
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
