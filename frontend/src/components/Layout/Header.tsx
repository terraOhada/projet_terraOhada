import React, { useEffect, useState } from "react";
import { menuLinks } from "../../data/data";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import Logo from "../../assets/logo TO.png";
import { userStore } from "../../store/store";
// Composant pour l'en-tête (Header) [cite: 1, 2]
const Header: React.FC = () => {
  const { user } = userStore();
  // console.log("user: ", user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation(); // Pour forcer le re-render lors du changement de route

  // console.log(location);
  useEffect(() => {
    const toogleMenu = () => {
      setMenuOpen(false);
    };
    toogleMenu();
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          className="text-xl font-bold text-blue-900 font-ohada-title"
          to={"/"}
        >
          <img src={Logo} alt="logo terreOhada" width={60} />
          <p className="text-[8px] mt-2">
            Comprendre, partager, faire vivre le droit Ohada
          </p>
          {/* TerraOhada */}
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <ul className="flex gap-4 items-center">
            {menuLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-ohada-bl bg-ohada-blue-two/5 font-bold border-b-4 border-b-ohada-blue-one px-4 py-2 rounded"
                      : "text-blue-500 hover:bg-blue-100 px-4 py-2 rounded"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-900 focus:outline-none"
          >
            {menuOpen ? (
              <div className="flex flex-row-reverse items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border border-blue-800 rounded hover:bg-blue-50 transition-colors">
                  <X />
                </div>
                {user && (
                  <div className="md:hidden items-center space-x-4">
                    <Link
                      to={`/profile/${user.nom}-${user.prenom}`}
                      className="text-blue-800 hover:text-blue-600"
                    >
                      <img
                        src={
                          user.photo
                            ? user.photo
                            : "https://avatar.iran.liara.run/public/25"
                        }
                        alt={`profile`}
                        className="w-8 h-8 rounded-full"
                      />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-row-reverse items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border border-blue-800 rounded hover:bg-blue-50 transition-colors">
                  <MenuIcon />
                </div>
                {user && (
                  <div className="flex md:hidden items-center space-x-4">
                    <Link
                      to={`/profile/${user.nom}-${user.prenom}`}
                      className="text-blue-800 hover:text-blue-600"
                    >
                      <img
                        src={
                          user.photo
                            ? user.photo
                            : "https://avatar.iran.liara.run/public/25"
                        }
                        alt={`profile`}
                        className="w-8 h-8 rounded-full"
                      />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </button>
        </div>
        {/* User Profile */}
        {user ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={`/profile/${user.nom}-${user.prenom}`}
              className="text-blue-800 hover:text-blue-600"
            >
              <img
                src={
                  user.photo
                    ? user.photo
                    : "https://avatar.iran.liara.run/public/25"
                }
                alt={`profile`}
                className="w-8 h-8 rounded-full"
              />
            </Link>
            <span className="text-sm text-blue-800">
              {user.prenom} {user.nom}
            </span>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/connexion" className="text-blue-800 hover:text-blue-600">
              Connexion
            </Link>
          </div>
        )}
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white  py-3 animate-slide-down md:py-8 border-t border-blue-200 mt-4">
          <nav className="space-y-2 text-sm font-medium">
            <ul className="flex flex-col gap-5 items-start">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-ohada-bl bg-ohada-blue-two/5 font-bold border-b-4 border-b-ohada-blue-one px-4 py-2 rounded"
                        : "text-blue-500 hover:bg-blue-100 px-4 py-2 rounded"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {user ? (
              <button
                className="mt-2 w-[25%] text-left border border-red-800 px-4 py-1 rounded text-sm text-red-800 hover:bg-blue-50"
                onClick={() => navigate("/connexion")}
              >
                Déconnexion
              </button>
            ) : (
              <button
                className="mt-2 w-[25%] text-left bg-ohada-blue-one border border-blue-800 px-4 py-1 rounded text-sm text-blue-800 hover:bg-blue-50"
                onClick={() => navigate("/connexion")}
              >
                Connexion
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
