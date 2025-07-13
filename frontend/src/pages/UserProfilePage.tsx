// src/pages/UserProfilePage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decisions } from "../data/data"; // Your decisions data
// Your decision interface
import { Edit, Save, CheckCircle, XCircle, Trash2 } from "lucide-react"; // Icons
import type { IDecision } from "../types";
import { userStore } from "../store/store";

const UserProfilePage: React.FC = () => {
  const { user } = userStore();
  // Simulated User Info
  const [nom, setNom] = useState<string>(user?.nom || ""); // Inspired by the image)
  const [prenom, setPrenom] = useState<string>(user?.prenom || "");
  const [email, setEmail] = useState<string>(user?.email || ""); // Inspired by the image
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  // Favorites
  const [favoritedDecisions, setFavoritedDecisions] = useState<IDecision[]>([]);

  // Notifications
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("user_favorites") || "{}"
    );
    const favoriteIds = Object.keys(storedFavorites)
      .filter((id) => storedFavorites[id])
      .map(Number);
    const foundFavoritedDecisions = decisions.filter((d) =>
      favoriteIds.includes(Number(d._id))
    );
    setFavoritedDecisions(foundFavoritedDecisions);
  }, []);

  // Handle Profile Info Save (Username, Email, Phone)
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      nom.trim() === "" ||
      prenom.trim() === "" ||
      email.trim() === "" ||
      !email.includes("@") // Basic email validation
    ) {
      setMessage({ type: "error", text: "Please fill in all profile fields." });
      return;
    }

    setMessage({ type: "success", text: "Profile updated successfully!" });
    setIsEditingProfile(false); // Exit edit mode
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle Password Change (SIMULATED)
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmNewPassword === ""
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all password fields.",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "New password must be at least 6 characters.",
      });
      return;
    }

    // This is a simulation. In a real app, you'd send currentPassword
    // and newPassword to your backend for secure authentication and update.
    setMessage({
      type: "success",
      text: "Password updated successfully (simulation)!",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setTimeout(() => setMessage(null), 3000);
  };

  // Remove Favorite Decision
  const handleRemoveFavorite = (idToRemove: number) => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("user_favorites") || "{}"
    );
    delete storedFavorites[idToRemove];
    localStorage.setItem("user_favorites", JSON.stringify(storedFavorites));

    setFavoritedDecisions((prev) => prev.filter((d) => d._id !== idToRemove));
    setMessage({ type: "success", text: "Decision removed from favorites." });
    setTimeout(() => setMessage(null), 2000);
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

      {/* My Profile Card - Inspired by image */}
      <section id="profile-info" className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mes informations
          </h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Edit className="w-4 h-4 mr-1" />
            {isEditingProfile ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://avatar.iran.liara.run/public/17" // Placeholder for user avatar
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
            {/* Simulated */}
            {/* Simulated */}
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

      {/* My Favorites Card - Inspired by image layout */}
      <section
        id="favorite-decisions"
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Favorites
        </h2>
        {favoritedDecisions.length > 0 ? (
          <div className="space-y-4">
            {favoritedDecisions.map((decision) => (
              <div
                key={decision._id}
                className="bg-gray-50 p-4 rounded-md border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {decision.titre}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(decision.date).toLocaleDateString("fr-FR")} -{" "}
                    {decision.juridiction}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/decisions/${decision._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(Number(decision._id))}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            You don't have any favorite decisions yet. Go to the{" "}
            <Link to="/decisions" className="text-blue-600 hover:underline">
              decisions list
            </Link>{" "}
            to add some!
          </p>
        )}
      </section>

      {/* Placeholder for "My Comments" section if implemented later */}
      {/* <section id="my-comments" className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Comments</h2>
        <p className="text-gray-600">This section will display your comments once implemented.</p>
      </section> */}
    </div>
  );
};

export default UserProfilePage;
