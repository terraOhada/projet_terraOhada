// src/components/ModernFooter.tsx
import React from "react";
import Logo from "../../assets/logo TO.png";
import { FacebookIcon, Instagram, LinkedinIcon } from "lucide-react";
import { menuLinks } from "../../data/data";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-ohada-blue-one text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: Logo et Description Courte */}
        <div className="flex flex-col items-start">
          <div>
            <img src={Logo} alt="Logo terraOhada" width={60} color="white" />
            <p className="text-[8px] mt-2">
              Comprendre, partager, faire vivre le droit Ohada
            </p>
          </div>

          {/* <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Votre partenaire pour une gestion juridique et financière simplifiée
            et conforme dans l'espace OHADA.
          </p> */}
        </div>

        {/* Section 2: Liens Rapides */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Liens Rapides
          </h4>
          <ul className="space-y-2">
            {menuLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Ressources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Ressources</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/faq"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Politique de Confidentialité
              </Link>
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
              target="_blank"
              href="https://www.linkedin.com/company/terraohada/?viewAsMember=true"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              {/* Exemple d'icône (utiliser des librairies comme Font Awesome ou SVG) */}
              <LinkedinIcon />
            </a>
            <a
              target="_blank"
              href="https://web.facebook.com/profile.php?id=61577993836853"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FacebookIcon />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/terraohada/"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <Instagram />
            </a>
            {/* Ajoutez d'autres icônes pour Twitter, Instagram, etc. */}
          </div>
        </div>
      </div>

      {/* Droits d'auteur et bas de page */}
      <div className="border-t border-white mt-10 pt-8 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Les 3 sens du droit. Tous droits
          réservés.
        </p>
        <p className="mt-2">
          {" "}
          <span>Conçu avec ❤️ en Côte d'Ivoire</span>
          {" - "}
          <span>By @ouattara ibrahim yacouba</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
