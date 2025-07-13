/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ForgotPasswordForm.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Couverture from "../../assets/images/couverture.jpeg";
import axios from "axios";
import { AUTH_URL } from "../../api/api";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    // Simuler un appel API pour envoyer le lien de réinitialisation
    // console.log("Demande de réinitialisation pour l'email:", email);
    // Dans une vraie application, vous feriez un appel API ici.
    // Par exemple:
    try {
      setLoading(true);
      const response = await axios.post(`${AUTH_URL}/send-reset-otp`, {
        email,
      });
      if (response.data.success) {
        setLoading(false);
        setEmail(""); // Clear the email input after successful submission
        setMessage("Un lien de réinitialisation a été envoyé à votre email.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de l'envoi du lien de réinitialisation:",
        error
      );
      setError(
        "Impossible de se connecter au serveur. Veuillez vérifier votre connexion."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "scroll 60s linear infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full z-50 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Mot de passe oublié ?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Veuillez entrer votre adresse email pour recevoir un lien de
          réinitialisation de mot de passe.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading
                ? "En cours d'envoi"
                : "Envoyer le lien de réinitialisation"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/connexion"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
