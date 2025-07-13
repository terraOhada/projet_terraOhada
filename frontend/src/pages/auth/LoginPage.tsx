/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/LoginForm.tsx
import React, { useState } from "react";
import Couverture from "../../assets/images/couverture.jpeg";
import Logo from "../../assets/logo TO.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { AUTH_URL } from "../../api/api";
import axios from "axios";
import { userStore } from "../../store/store";

const LoginPage: React.FC = () => {
  const { setUser } = userStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${AUTH_URL}/login`, {
        email: email,
        password: password,
      });

      // console.log("response", response.data.data);
      // console.log("data", data);
      if (response.data.success) {
        setUser(response.data.data);
        setLoading(false);
        setEmail("");
        setPassword("");
        setMessage(response.data?.message || "Connexion réussie !");
        toast.success(response.data?.message || "Connexion réussie !");

        setTimeout(() => {
          navigate("/"); // Redirige vers la page d'accueil ou une autre page après la connexion
        }, 2000);
      }
    } catch (error: any) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Erreur de connexion");
      console.error(
        "Erreur lors de la connexion :",
        error.response?.data?.message
      );
      return;
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gray-100 p-5 md:p-10"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "scroll 60s linear infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-50">
        <div
          className="w-5 h-5 bg-ohada-blue-two flex items-center justify-center text-ohada-white rounded-full mb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={10} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex flex-col items-center justify-center">
          <img src={Logo} alt="Logo TerraOhada" width={60} />
          <span className="text-ohada-blue-one mt-3">Se connecter</span>
        </h2>
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
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className="text-red-500 text-sm mb-4">{message}</div>
          )}
          <div className="flex items-center justify-between">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/mot-de-passe-oublie"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-4"
            >
              Mot de passe oublié ?
            </Link>
            <Link
              to="/inscription"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
