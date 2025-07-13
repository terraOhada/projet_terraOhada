/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/SignupForm.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Couverture from "../../assets/images/couverture.jpeg";
import Logo from "../../assets/logo TO.png";
import { ArrowLeft } from "lucide-react";
import { AUTH_URL } from "../../api/api";
import toast from "react-hot-toast";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!nom || !prenom || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      setMessage("Veuillez entrer une adresse email valide.");
      return;
    }
    // Simulation d'un appel API pour l'inscription
    // Dans une vraie application, vous feriez un appel API ici.
    // Par exemple:
    try {
      setLoading(true);
      const response = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nom, prenom, email, password }),
      });
      if (response.ok) {
        setMessage("Votre compte a été créé avec succès !");
        toast.success("Un lien de confirmation a été envoyé à votre email.");
        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");
      } else {
        setError(
          "L'inscription a échoué. Cet email est peut-être déjà utilisé."
        );
      }
    } catch (err: any) {
      console.error("Erreur lors de l'inscription:", err);
      setError(
        "Impossible de se connecter au serveur. Veuillez vérifier votre connexion."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen p-5 md:p-10 flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "scroll 60s linear infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-50 shadow-md w-full max-w-md">
        <div
          className="w-5 h-5 bg-ohada-blue-two flex items-center justify-center text-ohada-white rounded-full mb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={10} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex flex-col items-center justify-center">
          <img src={Logo} alt="Logo TerraOhada" width={60} />
          <span className="text-ohada-blue-one mt-3">Créer un compte</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nom
            </label>
            <input
              type="text"
              id="nom"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="Votre Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="Votre Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="Minimum 6 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6} // Exemple de validation simple côté client
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
              {loading ? "En cours de création..." : "Créer un compte"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/connexion"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Déjà un compte ? Connectez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
