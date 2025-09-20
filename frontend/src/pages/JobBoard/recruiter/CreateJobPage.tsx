import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { Job } from "../../../types";
import { JOB_URL } from "../../../api/api";

// --- AJOUTS POUR REACT-MARKDOWN ---
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// La fonction qui envoie les données du formulaire à l'API
const createJobPost = async (newJob: Partial<Job>): Promise<Job> => {
  const { data } = await axios.post(`${JOB_URL}/create-job`, newJob);
  return data.job;
};

const defaultJobDescription = `
### **À propos de notre cabinet**
Basé au cœur du Plateau à Abidjan, le Cabinet Juridique Kouassi & Associés est une firme d'avocats réputée...

### **Missions et Responsabilités**
* **Conseil Juridique :** Apporter une assistance juridique complète...
* **Rédaction d'Actes :** Rédiger, réviser et négocier...

### **Profil Recherché**
* Titulaire du **CAPA** et d'un **Master 2 en Droit des Affaires**.
* Expérience de **3 à 5 ans**.
`;

const CreateJobPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    contractType: "CDI",
    experienceLevel: "1-3 ans",
    description: defaultJobDescription,
  });

  const mutation = useMutation({
    mutationFn: createJobPost,
    onSuccess: () => {
      // 1. Invalider la liste des offres pour qu'elle soit rafraîchie
      queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] });
      // 2. Rediriger le recruteur vers sa liste d'offres
      navigate("/recruiter/jobs");
      // Idéalement, afficher une notification de succès ici (ex: avec react-hot-toast)
    },
    onError: (error) => {
      console.error("Erreur lors de la création de l'offre:", error);
      // Afficher une notification d'erreur
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // On récupère le contenu HTML depuis l'éditeur Markdown
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-xl shadow-sm border space-y-8"
    >
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Créer une nouvelle offre
        </h1>
        <p className="mt-1 text-gray-600">
          Remplissez les détails ci-dessous pour publier votre annonce.
        </p>
      </div>

      {/* --- Section Informations sur le poste --- */}
      <fieldset className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <legend className="text-lg font-bold text-gray-800 mb-4 w-full col-span-1 md:col-span-2">
          Informations sur le poste
        </legend>
        <div>
          <label htmlFor="title" className="font-semibold text-gray-700">
            Titre du poste
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="location" className="font-semibold text-gray-700">
            Lieu
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            value={formData.location}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="contractType" className="font-semibold text-gray-700">
            Type de contrat
          </label>
          <select
            name="contractType"
            id="contractType"
            required
            value={formData.contractType}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md bg-white"
          >
            <option>CDI</option>
            <option>CDD</option>
            <option>Stage</option>
            <option>Freelance</option>
            <option>Alternance</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="experienceLevel"
            className="font-semibold text-gray-700"
          >
            Niveau d'expérience
          </label>
          <select
            name="experienceLevel"
            id="experienceLevel"
            required
            value={formData.experienceLevel}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md bg-white"
          >
            <option>Débutant</option>
            <option>1-3 ans</option>
            <option>3-5 ans</option>
            <option>+5 ans</option>
          </select>
        </div>
      </fieldset>

      {/* --- Section Description de l'offre (AVEC MARKDOWN) --- */}
      <fieldset className="border-t pt-6">
        <legend className="text-lg font-bold text-gray-800 mb-4">
          Description de l'offre
        </legend>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Panneau de gauche : Édition */}
          <div>
            <label
              htmlFor="description"
              className="font-semibold text-gray-700"
            >
              Éditeur Markdown
            </label>
            <textarea
              name="description"
              id="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              rows={15}
              className="w-full mt-1 p-2 border rounded-md font-mono text-sm"
              placeholder="Écrivez en utilisant la syntaxe Markdown..."
            />
          </div>
          {/* Panneau de droite : Aperçu */}
          <div>
            <label className="font-semibold text-gray-700">
              Aperçu en direct
            </label>
            <div className="w-full mt-1 p-4 border rounded-md bg-gray-50 h-[362px] overflow-y-auto">
              <article className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.description}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </fieldset>

      {/* --- Boutons d'action --- */}
      <div className="border-t pt-6 flex justify-end items-center gap-4">
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg"
        >
          Aperçu
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400"
        >
          {mutation.isPending ? "Publication en cours..." : "Publier l'offre"}
        </button>
      </div>
    </form>
  );
};

export default CreateJobPage;
