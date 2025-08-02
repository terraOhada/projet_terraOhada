import {
  BarChart2Icon,
  HomeIcon,
  LogOutIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  UserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { userStore } from "../../../store/store";
import toast from "react-hot-toast";

const SidebarDash: React.FC = () => {
  const { clearUser } = userStore(); // Assuming userStore has a clearUser method
  const { pathname } = useLocation();
  const menuItems = [
    {
      name: "Ajouter une décision",
      icon: PlusCircleIcon,
      url: "",
    },
    {
      name: "Voir les décisions",
      icon: HomeIcon,
      url: "voir-decisions",
    },
    {
      name: "Statistiques",
      icon: BarChart2Icon,
      url: "statistics-decisions",
    },
    {
      name: "Commentaires",
      icon: MessageSquareIcon,
      url: "voir-commentaires",
    },
    {
      name: "Utilisateurs",
      icon: UserIcon,
      url: "utilisateurs",
    },
  ];

  const TerraOhadaLogo =
    "https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png";
  //   const Couverture =
  //     "https://placehold.co/1920x1080/0e4194/ffffff?text=Background";

  const onLogout = () => {
    clearUser(); // Appel de la fonction pour vider l'utilisateur du store
    toast.success("Déconnexion réussie !");
  };

  return (
    <div className="bg-ohada-blue-one/50 text-white flex flex-col h-full rounded-tr-lg rounded-br-lg shadow-lg">
      <Link to={"/"} className="p-6 text-center border-b border-blue-700">
        <img
          src={TerraOhadaLogo}
          alt="TerraOhada Logo"
          className="h-8 w-10 md:h-16 md:w-16 object-contain bg-white md:p-2 mx-auto mb-2 rounded-full border-1 md:border-2 border-white"
        />
        <h2 className="text-[8px] md:text-xl font-bold">Tableau de bord</h2>
      </Link>
      <ul className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          return (
            <li
              key={item.name}
              // onClick={() => setActiveSection(item.url)}
              className={`w-full flex items-center cursor-pointer p-3 text-sm rounded-md text-left font-medium transition-colors duration-200
              ${
                pathname === item.url
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-600"
              }`}
            >
              <Link to={item.url} className="inline-flex items-center">
                <item.icon className="mr-3 h-6 w-6" />
                <span className="hidden lg:block">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="px-2 border-t  border-blue-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center py-3 px-6 gap-2 rounded-md text-left text-lg font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
        >
          <LogOutIcon className="" size={20} />
          <span className="hidden md:block">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};
export default SidebarDash;
