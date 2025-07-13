// src/components/ModernFooter.tsx
import React from "react";
import Logo from "../../assets/logo TO.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: Logo et Description Courte */}
        <div className="flex flex-col items-start">
          <div>
            <img src={Logo} alt="Logo terraOhada" width={60} />
            <p className="text-[8px] mt-2">
              Comprendre, partager, faire vivre le droit Ohada
            </p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Votre partenaire pour une gestion juridique et financière simplifiée
            et conforme dans l'espace OHADA.
          </p>
        </div>

        {/* Section 2: Liens Rapides */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Liens Rapides
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                À Propos
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Fonctionnalités
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Ressources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Ressources</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/blog"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Politique de Confidentialité
              </a>
            </li>
          </ul>
        </div>

        {/* Section 4: Contact et Réseaux Sociaux */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contactez-nous
          </h4>
          <p className="text-gray-400 text-sm mb-3">
            Email:{" "}
            <a
              href="mailto:gestion@terraohada.com"
              className="hover:text-blue-400"
            >
              gestion@terraohada.com
            </a>
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Téléphone: +225 07 XX XX XX XX
          </p>
          <div className="flex space-x-4">
            {/* Icônes de réseaux sociaux - remplissez les href avec vos liens */}
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              {/* Exemple d'icône (utiliser des librairies comme Font Awesome ou SVG) */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.502 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.77-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.052 11.203a11.137 11.137 0 0 1 23.896 0" />
              </svg>
            </a>
            {/* Ajoutez d'autres icônes pour Twitter, Instagram, etc. */}
          </div>
        </div>
      </div>

      {/* Droits d'auteur et bas de page */}
      <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} TerraOhada. Tous droits réservés.
        </p>
        <p className="mt-2">Conçu avec ❤️ en Côte d'Ivoire</p>
      </div>
    </footer>
  );
};

export default Footer;
