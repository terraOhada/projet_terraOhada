// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Nécessite react-router-dom

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation(); // Obtient le chemin actuel de l'URL

  useEffect(() => {
    // Fait défiler la fenêtre vers le haut avec une animation douce
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]); // Exécute cet effet à chaque fois que le chemin de l'URL change

  return null; // Ce composant ne rend rien visuellement
};

export default ScrollToTop;
