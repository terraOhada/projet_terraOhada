// src/pages/UserProfilePage.tsx
import React, { useState } from "react";
import { Edit, Save, CheckCircle, XCircle } from "lucide-react"; // Icons
import { userStore } from "../../store/store";
import { AUTH_URL, USERS_URL } from "../../api/api";
import axios from "axios";
import { userInfo } from "../../hooks/userInfo";
import { ImageUploader } from "../../components/profile/ImageUploader";

const UserProfilePage: React.FC = () => {
  const { user, setUser } = userStore();

  // Simulated User Info
  const [nom, setNom] = useState<string>(user?.nom || ""); // Inspired by the image)
  const [prenom, setPrenom] = useState<string>(user?.prenom || "");
  const [email, setEmail] = useState<string>(user?.email || ""); // Inspired by the image
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  // Notifications
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Handle Profile Info Save (Username, Email, Phone)
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      nom.trim() === "" ||
      prenom.trim() === "" ||
      email.trim() === "" ||
      !email.includes("@") // Basic email validation
    ) {
      setMessage({ type: "error", text: "Tous les champs sont requis" });
      return;
    }
    if (!user && !user?.id) return;
    try {
      const updatedData = {
        nom,
        prenom,
        email,
      };
      const response = await axios.put(`${USERS_URL}/changer-utilisateur`, {
        updatedData,
        userId: user?.id,
      });
      if (!response.data.success) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const responseData = await userInfo(user?.id as string);
      if (!responseData.success) {
        setMessage({
          type: "error",
          text:
            responseData.message || "Erreur lors de la mise à jour du profil",
        });
      } else {
        setUser(responseData.data);
        setMessage({ type: "success", text: "Profil modifié avec succès!" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Erreur lors de la mise à jour du profil",
      });
      return;
    }

    setMessage({ type: "success", text: "Profil mis à jour 🟢" });
    setIsEditingProfile(false); // Exit edit mode
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle Password Change (SIMULATED)
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!user || !user.id) {
      setMessage({
        type: "error",
        text: "Veuillez vous connecter pour changer le mot de passe",
      });
      return;
    }

    if (
      // currentPassword === "" ||
      newPassword === "" ||
      confirmNewPassword === ""
    ) {
      setMessage({
        type: "error",
        text: "Tous les champs sont requis pour changer le mot de passe",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Le mot de passe doit contenir 6 caractères min.",
      });
      return;
    }

    try {
      const response = await axios.put(
        `${AUTH_URL}/changer-mot-de-passe/${user?.id}`,
        {
          newPassword,
        }
      );

      // console.log("response", response);

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "Mot de passe changé avec succès!",
        });
        // setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({
        type: "error",
        text: "Erreur lors du changement de mot de passe",
      });
      return;
    }
  };

  return (
    // The main container for the profile content
    <div className="flex flex-col gap-8">
      {/* Notification Message */}
      {message && (
        <div
          className={`p-4 rounded-md text-center flex items-center justify-center gap-2 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

      {/* <div>
        <p className="text-sm text-gray-500 mt-2">
          Vous pouvez modifier vos informations personnelles ici.
        </p>
        <ImageUploader />
      </div> */}

      {/* My Profile Card - Inspired by image */}
      <section id="profile-info" className="bg-white p-6 rounded-lg shadow-md">
        <ImageUploader
          photoUrl={user?.photo ? user.photo : ""}
          userId={user?.id as string}
          setUser={setUser}
        />

        <div className="flex justify-between items-center mb-4 mt-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Mes informations
          </h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Edit className="w-4 h-4 mr-1" />
            {isEditingProfile ? "Retour" : "Modifier"}
          </button>
        </div>

        <div className="flex flex-col items-start space-x-4 mb-4">
          <div className="mt-5">
            <img
              src={
                user?.photo
                  ? user.photo
                  : "https://avatar.iran.liara.run/public/17"
              } // Placeholder for user avatar
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <p className="text-lg font-bold text-gray-900">{nom}</p>
              <p className="text-sm text-gray-500">
                Dernière connexion :{" "}
                {new Date(user?.updatedAt as Date).toLocaleDateString("fr-FR")}{" "}
                14:04
              </p>{" "}
            </div>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label
              htmlFor="profileUsernom"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom
            </label>
            <input
              type="text"
              id="profileUsernom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              disabled={!isEditingProfile}
              required
            />
          </div>
          <div>
            <label
              htmlFor="profileUserprenom"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              prenoms
            </label>
            <input
              type="text"
              id="profileUserprenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              disabled={!isEditingProfile}
              required
            />
          </div>

          <div>
            <label
              htmlFor="profileEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="profileEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email address"
              disabled={!isEditingProfile}
              required
            />
          </div>

          {isEditingProfile && (
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Save
            </button>
          )}
        </form>

        {/* Password Change Section (aligned with My Profile card) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Changer le mot de passe
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe actuel (Mot de passe caché par mesure de sécurité)
              </label>
              <input
                type="password"
                id="currentPassword"
                disabled
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your current password"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nouveau mot de passe (min. 6 charactères)"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirmer le nouveau mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Changer le mot de passe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
