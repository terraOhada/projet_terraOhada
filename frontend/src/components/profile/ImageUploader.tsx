/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FILE_URL } from "../../api/api";
import toast from "react-hot-toast";
import { userInfo } from "../../hooks/userInfo";

interface CloudinaryResponse {
  public_id: string;
  url: string;
  width: number;
  height: number;
}

interface ImageUploaderProps {
  photoUrl?: string; // URL de la photo à afficher par défaut
  userId: string; // ID de l'utilisateur pour l'upload
  setUser: (user: any) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  photoUrl,
  userId,
  setUser,
}) => {
  // Image par défaut (peut être une URL ou un chemin local)
  const defaultImage = "https://avatar.iran.liara.run/public/17";

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<CloudinaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Nettoyer les URL objets lorsqu'elles ne sont plus nécessaires
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Gestion du dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    handleImageSelection(file);
  }, []);

  // console.log("preview", preview);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    noClick: true, // Désactive le click sur le dropzone
  });

  // Gestion de la sélection d'image
  const handleImageSelection = (file: File) => {
    // Libérer l'ancienne URL objet si elle existe
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setError(null);

    // Créer une URL objet pour la prévisualisation
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  // Déclencheur pour le input file
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Upload vers Cloudinary
  const uploadImage = async () => {
    if (!image) {
      setError("Veuillez sélectionner une image");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        `${FILE_URL}/upload-photo/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setResult(response.data.data as CloudinaryResponse);
        toast.success(
          response.data.message || "Photo téléchargée avec succès !"
        );
        const data = await userInfo(userId);
        // console.log("data", data);
        if (data) {
          // Mettre à jour l'URL de la photo de l'utilisateur
          const updatedUser = {
            ...data.data,
            photo: data.data.photo || response.data.data.url,
          };
          setUser(updatedUser);
        }
      }
    } catch (err: any) {
      setError(err.response.data.message || "Erreur lors de l'upload");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Image à afficher (prévisualisation ou résultat ou image par défaut)
  const displayedImage = preview || result?.url || defaultImage;

  return (
    <div className="flex flex-col rounded-lg items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        {...getRootProps()}
        className="relative w-64 h-64 rounded-full border-4 border-dashed border-gray-300 overflow-hidden"
      >
        {/* Input file caché */}
        <input
          {...getInputProps()}
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleImageSelection(e.target.files[0])
          }
        />

        {/* Image affichée */}
        <img
          src={photoUrl ? photoUrl : displayedImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        {/* Overlay avec bouton */}
        <div className="absolute inset-0 bg-white/0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
          <button
            onClick={triggerFileInput}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            title="Changer la photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bouton d'upload */}
      <button
        onClick={uploadImage}
        disabled={!image || isLoading}
        className={`mt-6 py-2 px-6 rounded-full text-white font-medium shadow-md transition-colors ${
          !image || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Envoi en cours..." : "Enregistrer la photo"}
      </button>

      {/* Affichage des erreurs */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg max-w-md text-center">
          {error}
        </div>
      )}

      {/* Feedback après upload */}
      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg max-w-md text-center">
          <p className="text-green-800 font-medium">
            Photo enregistrée avec succès !
          </p>
          <p className="text-sm mt-1">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Voir l'image sur Cloudinary
            </a>
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 text-center text-gray-600 max-w-md">
        <p className="mb-2">Vous pouvez :</p>
        <ul className="space-y-1">
          <li>• Cliquer sur l'icône photo pour sélectionner une image</li>
          <li>• Glisser-déposer une image directement sur le cercle</li>
          <li>• Les formats JPG/PNG jusqu'à 5MB sont acceptés</li>
        </ul>
      </div>
    </div>
  );
};
