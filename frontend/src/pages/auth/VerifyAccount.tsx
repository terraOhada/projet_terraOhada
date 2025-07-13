// src/pages/VerifyAccount.tsx ou src/components/VerifyAccount.tsx
import React, {
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type FormEvent,
  useEffect,
} from "react";

// Assure-toi que cette importation pointe vers ton chemin correct pour le logo
import TerraOhadaLogo from "../../assets/logo TO.png"; // Exemple: si ton logo est dans src/assets
import Couverture from "../../assets/images/couverture.jpeg"; // Chemin vers l'image de couverture
import { useNavigate, useParams } from "react-router-dom";
import { AUTH_URL } from "../../api/api";
import toast from "react-hot-toast";

interface VerifyAccountProps {
  // Optionnel: si tu veux passer des props comme l'email de l'utilisateur
  userEmail?: string;
  onVerificationSuccess: () => void; // Callback pour quand la vérification est réussie
  onResendCode: () => void; // Callback pour renvoyer le code
}

const VerifyAccount: React.FC<VerifyAccountProps> = ({ userEmail }) => {
  const navigate = useNavigate(); // Pour la navigation après la vérification
  const [otp, setOtp] = useState<string[]>(new Array(6).fill("")); // État pour chaque chiffre de l'OTP
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]); // Pour gérer le focus entre les inputs
  // const [message, setMessage] = useState<string>("");

  const { id } = useParams<string>(); // Si tu veux utiliser des paramètres de route, sinon tu peux l'ignorer

  // console.log("id :", id); // Pour vérifier si tu reçois bien l'ID de la route

  // Gère le changement d'un chiffre dans un input
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // N'autorise que les chiffres

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setError(null); // Réinitialise l'erreur lors de la saisie

    // Déplace le focus vers l'input suivant s'il y a un chiffre
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Gère l'appui sur une touche (pour backspace)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Déplace le focus vers l'input précédent si backspace et l'input est vide
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = ""; // Vide l'input précédent
      setOtp(newOtp);
    }
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullOtp = otp.join(""); // Concatène tous les chiffres
    if (fullOtp.length !== 6) {
      setError("Veuillez entrer un code de vérification à 6 chiffres.");
      setLoading(false);
      return;
    }

    try {
      // --- Appel API pour vérifier l'OTP ---
      const response = await fetch(`${AUTH_URL}/verify-account`, {
        // Adapte cette URL à ton API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, otp: fullOtp }), // Assure-toi d'envoyer l'email si nécessaire
      });

      const data = await response.json();

      console.log("response:", data);

      if (response.ok) {
        // La vérification est réussie
        toast.success("Compte vérifié avec succès !");
        // Redirection ou autre action
        setTimeout(() => {
          navigate("/connexion"); // Redirige vers la page de connexion
        }, 2000);
      } else {
        // La vérification a échoué (code OTP incorrect, expiré, etc.)
        setError(data.message || "Code de vérification invalide ou expiré.");
      }
    } catch (err) {
      console.error("Erreur lors de la vérification:", err);
      setError(
        "Une erreur est survenue lors de la vérification. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sendOtp = async () => {
      if (!id) return; // Assure-toi que l'ID est défini

      try {
        const response = await fetch(
          `${AUTH_URL}/send-verify-otp/${id}`, // Adapte cette URL à ton API
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Pour envoyer les cookies si nécessaire
          }
        );

        if (!response.ok) {
          throw new Error("Échec de l'envoi du code de vérification.");
        }

        const data = await response.json();

        if (data.message === "Votre compte est déjà vérifié") {
          toast.error(data.message || "Votre compte est déjà vérifié");
          setError(data.message || "Votre compte est déjà vérifié.");

          setTimeout(() => {
            navigate("/connexion"); // Redirige vers la page de connexion
          }, 2000);
        } else {
          toast.success("Un code de vérification a été envoyé à votre email.");
        }
        // console.log("Code OTP envoyé:", data);
      } catch (error) {
        toast.error("Erreur lors de l'envoi du code OTP. Veuillez réessayer.");
        console.error("Erreur lors de l'envoi du code OTP:", error);
      }
    };
    sendOtp();
  }, [id]);

  const handleResendCode = async () => {
    if (!id) return; // Assure-toi que l'ID est défini

    try {
      const response = await fetch(
        `${AUTH_URL}/send-verify-otp/${id}`, // Adapte cette URL à ton API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Pour envoyer les cookies si nécessaire
        }
      );

      if (!response.ok) {
        throw new Error("Échec de l'envoi du code de vérification.");
      }

      const data = await response.json();

      if (data.message === "Votre compte est déjà vérifié") {
        toast.error(data.message || "Votre compte est déjà vérifié");
        setError(data.message || "Votre compte est déjà vérifié.");

        setTimeout(() => {
          navigate("/connexion"); // Redirige vers la page de connexion
        }, 2000);
      } else {
        toast.success("Un code de vérification a été envoyé à votre email.");
      }
      // console.log("Code OTP envoyé:", data);
    } catch (error) {
      toast.error("Erreur lors de l'envoi du code OTP. Veuillez réessayer.");
      console.error("Erreur lors de l'envoi du code OTP:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "scroll 60s linear infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg z-50">
        <div>
          <img
            className="mx-auto h-24 w-auto" // h-24 pour une bonne taille sur mobile et desktop
            src={TerraOhadaLogo}
            alt="Logo TerraOhada"
          />
          <h2 className="mt-6 text-center text-3xl text-ohada-blue-one font-extrabold ">
            Vérifiez votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Un code de vérification a été envoyé à l'adresse e-mail :
            <br />
            <strong className="text-blue-600">
              {userEmail || "votre_email@exemple.com"}
            </strong>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 md:space-x-4">
            {" "}
            {/* Ajuste l'espacement pour les écrans */}
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e.target, index)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, index)
                }
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el!;
                }}
                className="w-10 h-10 md:w-12 md:h-12 text-center text-2xl font-bold border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
                style={{ MozAppearance: "textfield", WebkitAppearance: "none" }} // Pour masquer les flèches sur les inputs de type number
              />
            ))}
          </div>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading ? "Vérification en cours..." : "Vérifier le compte"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vous n'avez pas reçu le code ?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading} // Désactiver pendant l'envoi
              className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Renvoyer le code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
