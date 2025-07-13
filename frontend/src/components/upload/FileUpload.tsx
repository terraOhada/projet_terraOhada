/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/FileUpload.tsx
import axios from "axios";
import { ArrowUp } from "lucide-react";
import React, {
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import { FILE_URL } from "../../api/api";
// import { FiUploadCloud } from 'react-icons/fi'; // Si vous utilisez react-icons, installez-le: npm install react-icons

// Interfaces pour les types de données (restent les mêmes)
interface DocumentData {
  id: string;
  nomFichier: string;
  urlFichier: string;
  publicId: string;
  taille: number;
  typeMime: string;
  dateUpload: string;
}

interface UploadResponse {
  message: string;
  document: DocumentData;
  cloudinaryInfo: any;
}

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // console.log("formData:", selectedFile);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setMessage(`Fichier sélectionné : ${event.target.files[0].name}`);
      setFileUrl(null);
    } else {
      setSelectedFile(null);
      setMessage("");
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
      setMessage(`Fichier sélectionné : ${event.dataTransfer.files[0].name}`);
      setFileUrl(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Veuillez sélectionner un fichier avant d'uploader.");
      return;
    }

    setIsLoading(true);
    setMessage("Upload en cours...");

    const formData = new FormData();
    formData.append("documentFile", selectedFile);

    console.log(formData);

    try {
      const response = await axios.post(`${FILE_URL}/upload-doc`, formData, {
        // Il est souvent inutile de spécifier 'Content-Type' pour FormData avec Axios,
        // car Axios le détecte et le configure correctement.
        // Cependant, si vous rencontrez des problèmes, vous pouvez l'ajouter :
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Erreur inconnue lors de l'upload"
        );
      }

      const result: UploadResponse = response.data;
      setMessage(`Succès : ${result.message}`);
      setFileUrl(result.document.urlFichier);
      console.log("téléversement reussi:", result);
    } catch (error: any) {
      console.error("Erreur lors de l'upload:", error);
      setMessage(
        `Erreur: ${
          error.response.data.message || "Échec de l'upload du fichier."
        }`
      );
      setFileUrl(null);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("documentFileInput")?.click();
  };

  return (
    <div className="p-8 font-sans max-w-xl mx-auto md:mt-12 mb-10 bg-white rounded-lg shadow-md text-center">
      <h1 className="mb-4 md:mb-8 text-lg font-bold text-gray-800">
        Téléversez votre document
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className={`
            border-2 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors mb-5
            ${
              isDragOver
                ? "border-blue-500 border-solid"
                : "border-gray-300 border-dashed"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Icône d'upload. Remplacez par <FiUploadCloud className="text-gray-600 text-5xl mb-3" /> si vous utilisez react-icons */}
          <span className="text-gray-600 text-5xl mb-3 bg-gray-100 p-3 rounded-full">
            <ArrowUp />
          </span>
          <p className="m-0 text-gray-700 text-lg font-semibold">
            Glisser et déposer votre fichier ici
          </p>
          <p className="my-4 text-gray-500 text-sm">OR</p>
          <input
            type="file"
            id="documentFileInput"
            name="documentFile"
            onChange={handleFileChange}
            accept=".doc,.docx,.pdf,.txt"
            className="hidden" // Cache l'input de fichier par défaut
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-gray-100 text-gray-800 border border-gray-300 py-2 px-5 rounded-md text-base cursor-pointer
                       hover:bg-gray-200 hover:border-gray-400 transition-colors"
          >
            Choisir un fichier
          </button>
        </div>

        {selectedFile && (
          <p className="mt-2 mb-5 text-gray-700 text-base">
            Fichier sélectionné :{" "}
            <strong className="font-semibold">{selectedFile.name}</strong>
          </p>
        )}

        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className={`
            w-full py-3 px-6 rounded-md text-lg font-bold transition-colors
            ${
              selectedFile && !isLoading
                ? "bg-ohada-blue-one text-white hover:bg-ohada-blue-for cursor-pointer"
                : "bg-ohada-blue-three text-white cursor-not-allowed"
            }
          `}
        >
          {isLoading ? "Téléversement en cours..." : "Téléverser le fichier"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-5 p-3 rounded-md font-semibold ${
            message.startsWith("Erreur")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      {fileUrl && (
        <div className="mt-8 pt-5 border-t border-gray-200">
          <p className="text-gray-700 mb-2">Fichier uploadé avec succès !</p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={selectedFile?.name || "document"}
            className="text-blue-600 font-bold hover:underline inline-block mt-2"
          >
            Télécharger le fichier
          </a>
          <p className="text-sm text-gray-500 mt-2">
            Lien direct Cloudinary :{" "}
            <span className="break-all">{fileUrl}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
