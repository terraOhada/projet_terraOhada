/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { HiPencil, HiCheck } from "react-icons/hi";
import { USERS_URL } from "../../api/api";

// Type pour les données du profil
interface UserProfile {
  nom: string;
  prenom: string;
  email: string;
  headline: string;
  bio: string;
  specialities: string[]; // <-- AJOUT
  skills: string[]; // <-- AJOUT
  // ... ajoutez les autres champs au besoin
}

// Celui-ci représente les données telles qu'elles sont dans notre formulaire
interface ProfileFormData {
  nom: string;
  prenom: string;
  headline: string;
  bio: string;
  specialities: string; // C'est une chaîne de caractères, séparée par des virgules
  skills: string; // C'est une chaîne de caractères, séparée par des virgules
}

// Fonctions API
const fetchProfile = async (userId: string): Promise<UserProfile> => {
  const { data } = await axios.get(`${USERS_URL}/${userId}/profile`);
  return data;
};

const updateProfile = async (updatedData: {
  userId: string;
  profile: Partial<UserProfile>;
}): Promise<any> => {
  const { userId, profile } = updatedData;
  const { data } = await axios.put(`${USERS_URL}/${userId}/profile`, profile);
  return data;
};

const JobProfilePage: React.FC = () => {
  const currentUserId = "user_123";
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileFormData>>({});

  // 1. Récupérer les données initiales du profil
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", currentUserId],
    queryFn: () => fetchProfile(currentUserId),
  });

  useEffect(() => {
    // Quand les données arrivent, on transforme les tableaux en chaînes pour le formulaire
    if (profile) {
      setFormData({
        ...profile,
        skills: profile.skills.join(", "),
        specialities: profile.specialities.join(", "),
      });
    }
  }, [profile]);

  //   // 2. Pré-remplir le formulaire quand les données arrivent
  //   useEffect(() => {
  //     if (profile) {
  //       setFormData(profile);
  //     }
  //   }, [profile]);

  // 3. Gérer la mise à jour avec `useMutation`
  // 3. La mutation est maintenant beaucoup plus simple
  const mutation = useMutation({
    mutationFn: (updatedProfile: Partial<ProfileFormData>) => {
      // On re-transforme les chaînes de caractères en tableaux avant l'envoi
      const profileToSend = {
        ...updatedProfile,
        skills: updatedProfile.skills
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        specialities: updatedProfile.specialities
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      return updateProfile({ userId: currentUserId, profile: profileToSend });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", currentUserId] });
      setIsEditing(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <p>Chargement du profil...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-xl shadow-sm space-y-8"
    >
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Mon Profil</h1>
          <p className="text-gray-500 mt-1">
            Mettez à jour vos informations personnelles et professionnelles.
          </p>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg"
          >
            <HiPencil /> Modifier
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400"
            >
              <HiCheck /> {mutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        )}
      </div>

      {/* --- Section Informations Personnelles --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
        <div>
          <label className="font-semibold text-gray-700">Prénom</label>
          {isEditing ? (
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p className="text-lg text-gray-900">{profile?.prenom}</p>
          )}
        </div>
        <div>
          <label className="font-semibold text-gray-700">Nom</label>
          {isEditing ? (
            <input
              type="text"
              name="nom"
              value={formData.nom || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p className="text-lg text-gray-900">{profile?.nom}</p>
          )}
        </div>
        <div>
          <label className="font-semibold text-gray-700">
            Titre de votre profil
          </label>
          {isEditing ? (
            <input
              type="text"
              name="headline"
              value={formData.headline || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p className="text-lg text-gray-900">{profile?.headline}</p>
          )}
        </div>
      </div>

      {/* --- Section Spécialités (simplifiée) --- */}
      <div className="border-t pt-6">
        <label className="font-semibold text-gray-700 block mb-2">
          Mes Spécialités
        </label>
        {isEditing ? (
          <>
            <input
              type="text"
              name="specialities"
              value={formData.specialities || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Séparez les spécialités par des virgules.
            </p>
          </>
        ) : (
          <div className="flex flex-wrap gap-2 mt-1">
            {profile?.specialities.map((spec) => (
              <span
                key={spec}
                className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* --- Section Compétences (simplifiée) --- */}
      <div className="border-t pt-6">
        <label className="font-semibold text-gray-700 block mb-2">
          Mes Compétences Techniques
        </label>
        {isEditing ? (
          <>
            <textarea
              name="skills"
              value={formData.skills || ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full mt-1 p-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Séparez les compétences par des virgules.
            </p>
          </>
        ) : (
          <div className="flex flex-wrap gap-2 mt-1">
            {profile?.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* --- Section "À Propos" --- */}
      <div className="border-t pt-6">
        <label className="font-semibold text-gray-700">À propos de moi</label>
        {isEditing ? (
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            rows={5}
            className="w-full mt-1 p-2 border rounded-md"
          />
        ) : (
          <p className="text-lg text-gray-900 mt-1 prose">{profile?.bio}</p>
        )}
      </div>
    </form>
  );
};

export default JobProfilePage;
