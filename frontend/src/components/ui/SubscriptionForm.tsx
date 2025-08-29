import axios from "axios";
import React, { useState, useEffect } from "react";
import { PLAN_URL } from "../../api/api";
import toast from "react-hot-toast";
import { usePlans } from "../../query/payment";

// Interface pour typer les données de notre formulaire
interface IFormData {
  name: "Abonnement Mensuel" | "Abonnement Annuel";
  amount: number; // Montant en unité majeure (ex: 9 pour 9 EUR)
  interval: string;
  currency: "XOF" | "XAF" | "USD" | "EUR";
}

// Définition des plans pour éviter la répétition
const plans = {
  "Abonnement Mensuel": { amount: 9, interval: "monthly" },
  "Abonnement Annuel": { amount: 89, interval: "yearly" },
};

const SubscriptionForm: React.FC = () => {
  const { refetch } = usePlans();
  // État du formulaire initialisé avec le plan mensuel
  const [formData, setFormData] = useState<IFormData>({
    name: "Abonnement Mensuel",
    amount: plans["Abonnement Mensuel"].amount,
    interval: plans["Abonnement Mensuel"].interval,
    currency: "EUR",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Effet pour mettre à jour le prix et l'intervalle quand le nom du plan change
  useEffect(() => {
    const selectedPlan = plans[formData.name];
    setFormData((prevData) => ({
      ...prevData,
      amount: selectedPlan.amount,
      interval: selectedPlan.interval,
    }));
  }, [formData.name]);

  // Gestionnaire pour les changements sur les champs select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // NOUVEAU: Gestionnaire pour le changement du montant
  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   // On s'assure que l'état contient un nombre, même si le champ est vide
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     amount: value === "" ? 0 : parseInt(value, 10),
  //   }));
  // };

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construction du payload final avec le montant converti en centimes
    const payload = {
      name: formData.name,
      amount: formData.amount * 100, // Conversion en centimes
      interval: formData.interval,
      currency: formData.currency,
    };

    // console.log("Payload prêt à être envoyé à l'API:", payload);
    // alert(`Payload généré : ${JSON.stringify(payload)}`);

    try {
      setLoading(true);
      const response = await axios.post(`${PLAN_URL}/creer-plan`, payload);
      //   console.log("response", response);

      if (response.data.status === "success") {
        toast.success("Paiment crée 🟢");
        setLoading(false);
        refetch();
      }
    } catch (error) {
      toast.error("Erreur dans la création 🛑");
      console.log(error);
    } finally {
      setLoading(false);
    }
    // C'est ici que vous feriez votre appel API (ex: vers Flutterwave)
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choisir votre abonnement
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ de sélection du Plan */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Plan
          </label>
          <select
            id="name"
            name="name"
            value={formData.name}
            onChange={handleSelectChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Abonnement Mensuel</option>
            <option>Abonnement Annuel</option>
          </select>
        </div>

        {/* Affichage du Montant (non modifiable) */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Montant
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              // onChange={handleAmountChange}
              readOnly // Le champ est en lecture seule pour éviter les erreurs
              className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md shadow-sm sm:text-sm"
            />
            <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md">
              {formData.currency}
            </span>
          </div>
        </div>

        {/* Champ de sélection de la Devise */}
        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Devise
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleSelectChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="XOF">XOF (CFA)</option>
            <option value="XAF">XAF (CFA)</option>
          </select>
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "En cours de création..." : "Creer un plan d'abonnement"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
